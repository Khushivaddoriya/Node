const { checkSchema } = require("express-validator")

const planFeatureValidation = () => {

    return checkSchema({

        feature_name: {
            notEmpty: {
                errorMessage: (value, { req }) => {
                    return req.t("PLAN_FEATURE_NAME_REQUIRED")
                }
            }
        }
        
    })
}

module.exports = { planFeatureValidation }