const { checkSchema } = require("express-validator")

const userUpdateValidation = () => {

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

    })
}

module.exports = { userUpdateValidation }