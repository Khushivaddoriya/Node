const { checkSchema } = require("express-validator")
const { checkColumn } = require("../../helpers/common.function")
const { User } = require("../../schema/user.schema")
const { ENUMS } = require("../../constant/enum.constants")

const loginValidation = () => {

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
            },
            // custom: {
            //     options: (value, { req }) => {
            //         return checkColumn(
            //             User,
            //             "email",
            //             value,
            //             "",
            //             req.t("EMAIL_UNIQUE"),
            //             ENUMS.VALIDATION_TYPE.UNIQUE,
            //             true
            //         );
            //     },
            // },
        },
        password: {
            notEmpty: {
                errorMessage: (value, { req }) => {
                    return req.t("PASSWORD_ERROR_EMPTY")
                }
            }
        }
    })
}

module.exports = { loginValidation }