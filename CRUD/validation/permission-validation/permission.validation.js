const { checkSchema } = require("express-validator")

const permissionValidation = () => {

    return checkSchema({

        name: {
            notEmpty: {
                errorMessage: (value, { req }) => {
                    return req.t("PERMISSION_NAME_REQUIRED")
                }
            }
        }

    })
}

module.exports = { permissionValidation }