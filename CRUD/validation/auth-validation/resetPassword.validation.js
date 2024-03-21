const { checkSchema } = require("express-validator")

const resetPasswordValidation = () => {

    return checkSchema({
        reset_password_token: {
            notEmpty: {
                errorMessage: (value, { req }) => {
                    return req.t("TOKEN_REQUIRED")
                }
            },
        },
        new_password: {
            errorMessage: (value, { req }) => {
                return req.t("PASSWORD_ERROR_EMPTY")
            }
        }
    })
}

module.exports = { resetPasswordValidation }