const { validationResult } = require("express-validator");
const { STATUS_ERROR, VALIDATION_ERROR } = require("../constant/global.constants");

// validation result

const validateApi = (req, res, next) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
        return next();
    }
    const extractedErrors = {};
    error
        .array({ onlyFirstError: true })
        .map((err) => (extractedErrors[err.path] = err.msg));
    const responsePayload = {
        status: STATUS_ERROR,
        message: null,
        data: null,
        error: extractedErrors,
    };
    return res
        .status(VALIDATION_ERROR)
        .json(responsePayload);
};

module.exports = { validateApi };
