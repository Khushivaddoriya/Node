const { AUTH_USER_DETAILS, PERMISSION_AUTHORIZATION_ERROR, AUTHORIZATION_ERROR, STATUS_ERROR } = require("../constant/global.constants");


const authPermissions = function (resource) {
  return async (req, res, next) => {
    try {
      const { permissions } = req[AUTH_USER_DETAILS];

      if (!permissions.some((e) => resource.includes(e.name))) {
        const responsePayload = {
          status: STATUS_ERROR,
          message: null,
          data: null,
          error: PERMISSION_AUTHORIZATION_ERROR,
        };
        return res.status(AUTHORIZATION_ERROR).json(responsePayload);
      }
      return next();
    } catch (err) {
      console.log("auth permission error", err);
      const responsePayload = {
        status: STATUS_ERROR,
        message: null,
        data: null,
        error: PERMISSION_AUTHORIZATION_ERROR,
      };
      return res.status(AUTHORIZATION_ERROR).json(responsePayload);
    }
  };
};

module.exports = { authPermissions }