const express = require("express")
const { adminRegister, adminLogin } = require("../../../controller/admin/auth/auth.controller")
const { loginValidation } = require("../../../validation/auth-validation/login.validation")
const { validateApi } = require("../../../middleware/validator")

const adminAuthRouter = express.Router()

adminAuthRouter.post('/register', adminRegister)

adminAuthRouter.post('/login', loginValidation(), validateApi, adminLogin)

module.exports = { adminAuthRouter }