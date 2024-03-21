const express = require('express');
const { adminAuthRouter } = require('./admin-routes/auth/auth.routes');
const { permissionRouter } = require('./admin-routes/permission/permission.routes');
const { userAuthRouter } = require('./users-routes/auth/auth.routes');
const { customerRouter } = require('./users-routes/customer/customer.routes');
const { planFeatureRouter } = require('./admin-routes/plan-features/planFeature.routes');
const { planRouter } = require('./admin-routes/plan/plan.routes');
const { paymentRouter } = require('./users-routes/payment/payment.routes');
const { orderRouter } = require('./admin-routes/order/order.routes');

const indexRouter = express.Router();

indexRouter.use("/admin", adminAuthRouter)

indexRouter.use("/auth", userAuthRouter)

indexRouter.use("/user", customerRouter)

indexRouter.use("/permission", permissionRouter)

indexRouter.use("/feature", planFeatureRouter)

indexRouter.use("/plan", planRouter)

indexRouter.use("/payment", paymentRouter)

indexRouter.use("/order", orderRouter)

// Default routes
indexRouter.get("/", (req, res) => {
    res.status(200).json({ message: "API's are running..." })
})

module.exports = { indexRouter };
