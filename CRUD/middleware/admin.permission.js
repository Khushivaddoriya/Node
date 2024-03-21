const { ENUMS } = require("../constant/enum.constants");
const { AUTH_USER_DETAILS, STATUS_ERROR, INTERNAL_SERVER_ERROR, AUTHORIZATION_ERROR } = require("../constant/global.constants");

const adminPermission = async (req, res, next) => {
    try {
        const { user_type } = req[AUTH_USER_DETAILS];

        if (user_type === ENUMS.USER_TYPE.ADMIN) {
            return next();
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: null,
                error: req.t('ADMIN_PERMISSION'),
            };
            return res.status(AUTHORIZATION_ERROR).json(responsePayload);
        }
    } catch (err) {
        const responsePayload = {
            status: STATUS_ERROR,
            message: null,
            data: null,
            error: err.message,
        };
        return res.status(INTERNAL_SERVER_ERROR).json(responsePayload);
    }
}

module.exports = { adminPermission }