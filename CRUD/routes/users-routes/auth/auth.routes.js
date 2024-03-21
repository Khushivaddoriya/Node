const express = require("express")
const { userRegister, userLogin, forgotPassword, resetPassword, checkResetPasswordToken, changePassword, logout, socialGoogleLogin, socialFacebookLogin, socialInstagramLogin } = require("../../../controller/users/auth/auth.controller")
const { auth } = require("../../../middleware/auth.guard")
const { loginValidation } = require("../../../validation/auth-validation/login.validation")
const { validateApi } = require("../../../middleware/validator")
const { forgotPasswordValidation } = require("../../../validation/auth-validation/forgotPassword.validation")
const { resetPasswordValidation } = require("../../../validation/auth-validation/resetPassword.validation")
const { changePasswordValidation } = require("../../../validation/auth-validation/changePassword.validation")
const { userRegisterValidation } = require("../../../validation/user-validation/userRegister.validation")

const userAuthRouter = express.Router()

userAuthRouter.post('/user/register', userRegisterValidation(), validateApi, userRegister)

userAuthRouter.post('/login', loginValidation(), validateApi, userLogin)

userAuthRouter.post('/forgotPassword', forgotPasswordValidation(), validateApi, forgotPassword)

userAuthRouter.post('/resetPassword', resetPasswordValidation(), validateApi, resetPassword)

userAuthRouter.get('/check-reset-password', checkResetPasswordToken)

userAuthRouter.post('/change-password', auth, changePasswordValidation(), validateApi, changePassword)

userAuthRouter.get('/logout', auth, logout)

userAuthRouter.post('/google/callback', socialGoogleLogin)

userAuthRouter.post('/facebook/callback', socialFacebookLogin)

userAuthRouter.post('/instagram/callback', socialInstagramLogin)


module.exports = { userAuthRouter }