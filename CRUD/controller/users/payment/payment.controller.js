const { AUTH_USER_DETAILS, INTERNAL_SERVER_ERROR_MESSAGE, INTERNAL_SERVER_ERROR, STATUS_ERROR, STATUS_SUCCESS, STATUS_CODE_OK } = require("../../../constant/global.constants");
const { CURRENCY, PAYMENT_METHOD, PLAN_LIMIT, PAYMENT_STATUS, PLAN_NAME } = require("../../../constant/model.constants");
const { generateOrderNumber, generateInvoiceNumber } = require("../../../helpers/common.function");
const { generateInvoiceInfo, generateOrderDetails } = require("../../../helpers/generateOrderAndInvoice");
const { Order } = require("../../../schema/order.schema");
const { Payment } = require("../../../schema/payment.schema");
const { User } = require("../../../schema/user.schema");
const { sendInvoiceEmail } = require("../../../services/mailer/sendInvoice.mailer");
const fs = require("fs")
const path = require("path");
const { sendPaymentCompletedSMS, schedulePlanExpirySMS } = require("../../../services/sendSms");
const { generateInvoiceContent } = require("../../../services/generateInvoice");
const { getFilter } = require("../../../services/common.service");
const { PLAN_MESSAGES } = require("../../../messages/plan.messages");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// create stripe intent

const createIntent = async (req, res) => {

    try {
        const { _id } = req[AUTH_USER_DETAILS];
        const { amount, currency, plan_name, plan_type, plan_limit } = req.body;

        const convertedAmount = currency === CURRENCY.INR ? amount * 100 : amount;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: convertedAmount,
            currency: currency,
        });

        const newOrder = await Order.create({
            user_id: _id,
            order_number: generateOrderNumber(),
            plan_name: plan_name,
            plan_type: plan_type,
            plan_limit: plan_limit,
            amount: amount,
            currency: currency,
            created_by: _id,
        });

        const payment = await Payment.create({
            user_id: _id,
            order_id: newOrder._id,
            amount: newOrder.amount,
            currency: currency,
            payment_intent_id: paymentIntent.id,
            payment_method: PAYMENT_METHOD.STRIPE_PAYMENT,
            status: paymentIntent.status,
            client_secret: paymentIntent.client_secret,
            created_by: _id,
        });

        const paymentData = await Payment
            .findById(payment._id)
            .populate('order_id', 'order_number');

        if (paymentData) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PAYMENT_INTENT_CREATED'),
                data: paymentData,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('PAYMENT_INTENT_NOT_CREATED'),
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
    } catch (err) {
        console.log('err', err);
        const responsePayload = {
            status: STATUS_ERROR,
            message: null,
            data: null,
            error: INTERNAL_SERVER_ERROR_MESSAGE,
        };
        return res.status(INTERNAL_SERVER_ERROR).json(responsePayload);
    }
}

//  generate stripe invoice

const stripeInvoice = async (req, res) => {

    try {

        const { _id } = req[AUTH_USER_DETAILS];
        const { order_number } = req.body;

        const currentDate = new Date();

        const orderFind = await Order.findOneAndUpdate(
            { order_number: order_number },
            {
                $set: {
                    invoice_number: generateInvoiceNumber(),
                    plan_purchase_date: currentDate,
                },
            },
            { new: true },
        );

        const planExpireDate = new Date(currentDate);

        if (orderFind.plan_limit === PLAN_LIMIT.PER_MONTH) {
            planExpireDate.setMonth(planExpireDate.getMonth() + 1);
        } else if (orderFind.plan_limit === PLAN_LIMIT.PER_YEAR) {
            planExpireDate.setFullYear(planExpireDate.getFullYear() + 1);
        } else {
            throw new Error(req.t("PLAN_LIMIT"));
        }

        orderFind.plan_expire_date = planExpireDate;
        await orderFind.save();

        const userDetails = await User.findById(_id);
        const userInfo = generateInvoiceInfo(userDetails, orderFind.invoice_number);
        const payment = await Payment.findOne({
            order_id: orderFind.id,
        });
        const invoiceContent = generateInvoiceContent(orderFind, payment, userInfo);

        const emailSent = await sendInvoiceEmail(
            userDetails.email,
            invoiceContent,
            orderFind.invoice_number,
        );

        if (emailSent) {

            const pdfFilePath = path.join(__dirname, '../../../public/invoice/', `${orderFind.invoice_number}_invoice.pdf`);

            const pdfDataBase64 = fs.readFileSync(pdfFilePath).toString('base64');

            await sendPaymentCompletedSMS(orderFind.order_number, userDetails);
            await schedulePlanExpirySMS(_id, planExpireDate);

            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('STRIPE_PAYMENT_CREATED'),
                data: pdfDataBase64,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('STRIPE_PAYMENT_NOT_CREATED'),
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
    } catch (err) {
        console.log('err', err);
        const responsePayload = {
            status: STATUS_ERROR,
            message: null,
            data: null,
            error: INTERNAL_SERVER_ERROR_MESSAGE,
        };
        return res.status(INTERNAL_SERVER_ERROR).json(responsePayload);
    }
}

// paypal payment execute

const paypalPaymentCreate = async (req, res) => {

    try {

        const { _id } = req[AUTH_USER_DETAILS];
        const { productDetails, paymentData } = req.body;

        const currentDate = new Date();
        const invoiceNumber = generateInvoiceNumber();
        const userDetails = await User.findById(_id);
        const userInfo = generateInvoiceInfo(userDetails, invoiceNumber);

        const orderDetails = generateOrderDetails(
            _id,
            productDetails,
            currentDate,
            _id,
            invoiceNumber
        );

        orderDetails.invoice_number = invoiceNumber;

        const newOrder = await Order.create(orderDetails);
        const data = await Payment.create({
            user_id: _id,
            order_id: newOrder._id,
            payment_method: PAYMENT_METHOD.PAYPAL_PAYMENT,
            payment_id: paymentData.id,
            amount: paymentData.purchase_units[0].amount.value,
            status: PAYMENT_STATUS.COMPLETED,
            currency: paymentData.purchase_units[0].amount.currency_code,
            payer_id: paymentData.payer.payer_id,
            created_by: _id,
        });

        if (data.status === PAYMENT_STATUS.COMPLETED) {
            const invoiceContent = generateInvoiceContent(newOrder, data, userInfo);
            const emailSent = await sendInvoiceEmail(
                userDetails.email,
                invoiceContent,
                invoiceNumber,
            );

            if (emailSent) {

                const pdfFilePath = path.join(__dirname, "../../../public/invoice", `${invoiceNumber}_invoice.pdf`);

                const pdfDataBase64 = fs.readFileSync(pdfFilePath).toString("base64");
                await sendPaymentCompletedSMS(newOrder.order_number, userDetails);
                await schedulePlanExpirySMS(_id, newOrder.plan_expire_date);

                const responsePayload = {
                    status: STATUS_SUCCESS,
                    message: req.t("PAYMENT_EXECUTE"),
                    data: pdfDataBase64,
                    error: null,
                };
                return res.status(STATUS_CODE_OK).json(responsePayload);
            }
            else {
                const responsePayload = {
                    status: STATUS_ERROR,
                    message: null,
                    data: {},
                    error: req.t('PAYMENT_NOT_EXECUTE'),
                };
                return res.status(STATUS_CODE_OK).json(responsePayload);
            }

        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('PAYMENT_NOT_EXECUTE'),
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
    } catch (err) {
        console.log('err', err);
        const responsePayload = {
            status: STATUS_ERROR,
            message: null,
            data: null,
            error: INTERNAL_SERVER_ERROR_MESSAGE,
        };
        return res.status(INTERNAL_SERVER_ERROR).json(responsePayload);
    }
}

// G-pay payment create

const gpayPaymentCreate = async (req, res) => {

    try {
        const { _id } = req[AUTH_USER_DETAILS];
        const { productDetails, paymentData } = req.body;

        const currentDate = new Date();
        const invoiceNumber = generateInvoiceNumber();
        const userDetails = await User.findById(_id);
        const userInfo = generateInvoiceInfo(userDetails, invoiceNumber);

        const orderDetails = generateOrderDetails(
            _id,
            productDetails,
            currentDate,
            _id,
            invoiceNumber
        );

        orderDetails.invoice_number = invoiceNumber;

        const newOrder = await Order.create(orderDetails);
        const createPaymentData = await Payment.create({
            user_id: _id,
            order_id: newOrder._id,
            payment_method: PAYMENT_METHOD.GPAY_PAYMENT,
            payment_id: paymentData.paymentMethodData.tokenizationData.token,
            card_details: paymentData.paymentMethodData.info.cardDetails,
            amount: productDetails.totalPrice,
            currency: productDetails.currencyCode,
            status: PAYMENT_STATUS.COMPLETED,
            created_by: _id,
        });

        if (createPaymentData.status === PAYMENT_STATUS.COMPLETED) {

            const invoiceContent = generateInvoiceContent(newOrder, createPaymentData, userInfo);

            const emailSent = await sendInvoiceEmail(
                userDetails.email,
                invoiceContent,
                invoiceNumber,
            );

            if (emailSent) {

                const pdfFilePath = path.join(__dirname, "../../../public/invoice", `${invoiceNumber}_invoice.pdf`);
                const pdfDataBase64 = fs.readFileSync(pdfFilePath).toString('base64');

                await sendPaymentCompletedSMS(newOrder.order_number, userDetails);
                await schedulePlanExpirySMS(_id, newOrder.plan_expire_date);

                const responsePayload = {
                    status: STATUS_SUCCESS,
                    message: req.t("GPAY_PAYMENT_CREATED"),
                    data: pdfDataBase64,
                    error: null,
                };
                return res.status(STATUS_CODE_OK).json(responsePayload);
            }
            else {
                const responsePayload = {
                    status: STATUS_ERROR,
                    message: null,
                    data: {},
                    error: req.t('GPAY_PAYMENT_NOT_CREATED'),
                };
                return res.status(STATUS_CODE_OK).json(responsePayload);
            }
        }
        else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('GPAY_PAYMENT_NOT_CREATED'),
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }

    } catch (err) {
        console.log('err', err);
        const responsePayload = {
            status: STATUS_ERROR,
            message: null,
            data: null,
            error: INTERNAL_SERVER_ERROR_MESSAGE,
        };
        return res.status(INTERNAL_SERVER_ERROR).json(responsePayload);
    }
}

// get payment history of one user

const getAllPayment = async (req, res) => {

    try {
        const { _id } = req[AUTH_USER_DETAILS];
        const user = await Payment
            .find({ user_id: _id })
            .populate('created_by', ['email', 'first_name', 'last_name'])
            .populate('order_id', ['plan_name', 'order_number']);

        let total = 0;
        user.forEach((amo) => {
            if (!amo.amount) {
                return total += 0;
            } else {
                return total += amo.amount;
            }
        });

        if (user.length > 0) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PAYMENT_HISTORY_FOUND'),
                data: { data: user, totalAmount: total },
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('PAYMENT_HISTORY_NOT_FOUND'),
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
    } catch (err) {
        console.log("err", err);
        const responsePayload = {
            status: STATUS_ERROR,
            message: null,
            data: null,
            error: INTERNAL_SERVER_ERROR_MESSAGE,
        };
        return res.status(INTERNAL_SERVER_ERROR).json(responsePayload);
    }
}

// get all payment

const getPayment = async (req, res) => {

    try {
        const data = req.body;
        const filterData = !data.filter
            ? { ...data, filter: { is_deleted: false, is_disable: false } }
            : data;

        const filter = await getFilter(filterData);

        const paymentDetails = await Payment
            .find(filter.where)
            .skip(filter.skip)
            .limit(filter.limit)
            .sort(filter.sort)
            .populate('created_by', ['email', 'first_name', 'last_name'])
            .populate('order_id', ['plan_name']);

        const count = await Payment.count(filter.where);

        let total = 0;
        paymentDetails.forEach((amo) => {
            total += amo.amount;
        });

        if (paymentDetails.length > 0) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t("PAYMENT_FOUND"),
                data: { data: paymentDetails, count: count, totalAmount: total },
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t("PAYMENT_NOT_FOUND"),
            }
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
    } catch (err) {
        console.log("err", err);
        const responsePayload = {
            status: STATUS_ERROR,
            message: null,
            data: null,
            error: INTERNAL_SERVER_ERROR_MESSAGE,
        };
        return res.status(INTERNAL_SERVER_ERROR).json(responsePayload);
    }
}

// when user choose(purchase) free plan

const freePlanCreate = async (req, res) => {

    try {

        const { _id } = req[AUTH_USER_DETAILS];
        const { plan_name, plan_limit, plan_type } = req.body;

        const currentDate = new Date();

        const planExpireDate = new Date(currentDate);
        if (plan_limit === PLAN_LIMIT.PER_MONTH) {
            planExpireDate.setMonth(planExpireDate.getMonth() + 1);
        } else if (plan_limit === PLAN_LIMIT.PER_YEAR) {
            planExpireDate.setFullYear(planExpireDate.getFullYear() + 1);
        } else {
            throw new Error(PLAN_MESSAGES.PLAN_LIMIT);
        }

        if (plan_name === PLAN_NAME.FREE) {
            const newOrder = await Order.create({
                user_id: _id,
                plan_name: plan_name,
                plan_limit: plan_limit,
                plan_type: plan_type,
                plan_purchase_date: currentDate,
                plan_expire_date: planExpireDate,
                created_by: _id,
            });

            await Payment.create({
                order_id: newOrder.id,
                user_id: _id,
                created_by: _id,
            });

            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t("FREE_PLAN_PURCHASE"),
                data: newOrder,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: null,
                error: req.t("FREE_PLAN_NOT_PURCHASE"),
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
    } catch (err) {
        console.log("err", err);
        const responsePayload = {
            status: STATUS_ERROR,
            message: null,
            data: null,
            error: INTERNAL_SERVER_ERROR_MESSAGE,
        };
        return res.status(INTERNAL_SERVER_ERROR).json(responsePayload)
    }
}



module.exports = { createIntent, stripeInvoice, paypalPaymentCreate, gpayPaymentCreate, getAllPayment, getPayment, freePlanCreate }