const { checkSchema } = require("express-validator")
const { checkColumn } = require("../../helpers/common.function")
const { User } = require("../../schema/user.schema")
const { ENUMS } = require("../../constant/enum.constants")

const userRegisterValidation = () => {

    return checkSchema({

        first_name: {
            notEmpty: {
                errorMessage: (value, { req }) => {
                    return req.t("FIRST_NAME_REQUIRED")
                }
            }
        },

        last_name: {
            notEmpty: {
                errorMessage: (value, { req }) => {
                    return req.t("LAST_NAME_REQUIRED")
                }
            }
        },

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
            custom: {
                options: (value, { req }) => {
                    return checkColumn(
                        User,
                        "email",
                        value,
                        "",
                        req.t("EMAIL_UNIQUE"),
                        ENUMS.VALIDATION_TYPE.UNIQUE,
                        true
                    );
                }
            }
        },

        phone_number: {
            notEmpty: {
                errorMessage: (value, { req }) => {
                    return req.t("PHONE_NUMBER_REQUIRED")
                }
            },
            isLength: {
                options: ({ min: 10 }),
                errorMessage: (value, { req }) => {
                    return req.t("PHONE_NUMBER_INVALID_LENGTH");
                }
            }
        },

        password: {
            notEmpty: {
                errorMessage: (value, { req }) => {
                    return req.t("PASSWORD_REQUIRED")
                }
            }
        }
    })
}

module.exports = { userRegisterValidation }