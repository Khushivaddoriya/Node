
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { AUTH_USER_DETAILS, STATUS_ERROR, AUTHORIZATION_ERROR_MESSAGE, AUTHORIZATION_ERROR, INTERNAL_SERVER_ERROR } = require("../constant/global.constants");
const { User } = require("../schema/user.schema");

// create middleware to check whether the user is valid or not

const auth = async (req, res, next) => {

  try {

    if (req.headers && req.headers.authorization) {
      const authArray = req.headers.authorization.split('Bearer ');
      if (authArray && authArray.length > 0 && authArray[1]) {
        const token = authArray[1];
        const decodedToken = jwt.verify(
          token,
          process.env.JWT_SECRET_KEY,
        );
        const userObj = await User.findOne({
          _id: decodedToken._id,
          email: decodedToken.email,
          token: token,
        }).populate('permissions', ['name']);

        if (userObj) {
          const user = userObj.toJSON();
          req[AUTH_USER_DETAILS] = user;
          return next();
        } else {
          const responsePayload = {
            status: STATUS_ERROR,
            message: null,
            data: null,
            error: AUTHORIZATION_ERROR_MESSAGE,
          };
          return res.status(AUTHORIZATION_ERROR).json(responsePayload);
        }
      } else {
        const responsePayload = {
          status: STATUS_ERROR,
          message: null,
          data: null,
          error: AUTHORIZATION_ERROR_MESSAGE,
        };
        return res.status(AUTHORIZATION_ERROR).json(responsePayload);
      }
    } else {
      const responsePayload = {
        status: STATUS_ERROR,
        message: null,
        data: null,
        error: AUTHORIZATION_ERROR_MESSAGE,
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
};

module.exports = { auth }