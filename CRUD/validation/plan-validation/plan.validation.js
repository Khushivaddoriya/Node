const { checkSchema } = require("express-validator")

const planValidation = () => {

    return checkSchema({

        amount: {
            notEmpty: {
                errorMessage: (value, { req }) => {
                    return req.t("PLAN_AMOUNT_REQUIRED")
                }
            },
            custom: {
                options: (value, { req }) => {
                    if (parseFloat(value) < 0 || parseFloat(value) > 10000000) {
                        throw new Error(req.t("PLAN_AMOUNT_REQUIRED"));
                    }
                    return true;
                },
            },
        },
        currency: {
            notEmpty: {
                errorMessage: (value, { req }) => {
                    return req.t("PLAN_CURRENCY_REQUIRED")
                }
            }
        },
        plan_name: {
            notEmpty: {
                errorMessage: (value, { req }) => {
                    return req.t("PLAN_NAME_REQUIRED")
                }
            }
        },
        plan_type: {
            notEmpty: {
                errorMessage: (value, { req }) => {
                    return req.t("PLAN_TYPE_REQUIRED")
                }
            }
        },
        plan_limit: {
            notEmpty: {
                errorMessage: (value, { req }) => {
                    return req.t("PLAN_LIMIT_REQUIRED")
                }
            }
        }

    })
}

module.exports = { planValidation }

