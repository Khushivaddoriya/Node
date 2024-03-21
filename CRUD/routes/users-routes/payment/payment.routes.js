const express = require("express")
const { createIntent, stripeInvoice, paypalPaymentCreate, gpayPaymentCreate, getAllPayment, getPayment, freePlanCreate } = require("../../../controller/users/payment/payment.controller")
const { auth } = require("../../../middleware/auth.guard")

const paymentRouter = express.Router()

paymentRouter.post("/stripe", auth, createIntent)

paymentRouter.post("/stripe/invoice", auth, stripeInvoice)

paymentRouter.post("/paypal", auth, paypalPaymentCreate)

paymentRouter.post("/g-pay", auth, gpayPaymentCreate)

paymentRouter.get('/all', auth, getAllPayment)

paymentRouter.post('/get', auth, getPayment)

paymentRouter.post('/free-plan', auth, freePlanCreate)

module.exports = { paymentRouter }