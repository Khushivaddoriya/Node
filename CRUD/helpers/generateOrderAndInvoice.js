const { PLAN_LIMIT } = require("../constant/model.constants");
const { PLAN_MESSAGES } = require("../messages/plan.messages");
const { generateOrderNumber, getCurrentDateFormatted } = require("./common.function");

function generateOrderDetails(
    user_id,
    productDetails,
    currentDate,
    created_by,
    invoiceNumber,
) {
    const planExpireDate = new Date(currentDate);

    if (productDetails.plan_limit === PLAN_LIMIT.PER_MONTH) {
        planExpireDate.setMonth(planExpireDate.getMonth() + 1);
    } else if (productDetails.plan_limit === PLAN_LIMIT.PER_YEAR) {
        planExpireDate.setFullYear(planExpireDate.getFullYear() + 1);
    } else {
        throw new Error(PLAN_MESSAGES.PLAN_LIMIT);
    }

    return {
        user_id,
        order_number: generateOrderNumber(),
        plan_name: productDetails.plan_name,
        plan_type: productDetails.plan_type,
        plan_limit: productDetails.plan_limit,
        amount: productDetails.totalPrice,
        currency: productDetails.currencyCode,
        plan_purchase_date: currentDate,
        plan_expire_date: planExpireDate,
        invoice_number: invoiceNumber,
        created_by,
    };
}

function generateInvoiceInfo(userDetails, invoiceNumber) {
    return {
        invoice_number: invoiceNumber,
        invoice_date: getCurrentDateFormatted(),
        user_name: `${userDetails.first_name} ${userDetails.last_name}`,
        phone_number: userDetails.phone_number,
        email: userDetails.email,
    };
}


module.exports = { generateOrderDetails, generateInvoiceInfo }