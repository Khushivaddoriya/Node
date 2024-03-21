const express = require("express")
const { getAllOrder } = require("../../../controller/admin/order/order.controller")
const { auth } = require("../../../middleware/auth.guard")
const { authPermissions } = require("../../../middleware/auth.permission")
const { ENUMS } = require("../../../constant/enum.constants")


const orderRouter = express.Router()

orderRouter.post("/all", auth, authPermissions(ENUMS.PERMISSION.ORDER_VIEW), getAllOrder)

module.exports = { orderRouter }