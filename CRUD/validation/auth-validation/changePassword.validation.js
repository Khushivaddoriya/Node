const { checkSchema } = require("express-validator")

const changePasswordValidation = () => {

    return checkSchema({
        old_password: {
            errorMessage: (value, { req }) => {
                return req.t("OLD_PASSWORD_REQUIRED")
            }
        },
        new_password: {
            errorMessage: (value, { req }) => {
                return req.t("NEW_PASSWORD_REQUIRED")
            }
        },
        confirm_password: {
            custom: {
                options: (value, { req }) => {
                    if (value !== req.body.new_password) {
                        return req.t("IN_VALID_CONFIRM_PASSWORD")
                    }
                    return true;
                }
            }
        }
    })
}

module.exports = { changePasswordValidation }