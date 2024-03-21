const { checkSchema } = require("express-validator")

const forgotPasswordValidation = () => {
    
    return checkSchema({
        email: {
            notEmpty: {
                errorMessage: (value, { req }) => {
                    return req.t("EMAIL_ERROR_EMPTY")
                }
            },
            isEmail: {
                errorMessage: (value, { req }) => {
                    return req.t("EMAIL_ERROR_INVALID")
                }
            }
        }
    })
}

module.exports = { forgotPasswordValidation }