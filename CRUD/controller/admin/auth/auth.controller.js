const { ENUMS } = require("../../../constant/enum.constants");
const { STATUS_ERROR, STATUS_CODE_OK, STATUS_SUCCESS, INTERNAL_SERVER_ERROR_MESSAGE, INTERNAL_SERVER_ERROR } = require("../../../constant/global.constants");
const { passwordHash, comparePasswordHash } = require("../../../helpers/common.function");
const { User } = require("../../../schema/user.schema");
const { authService } = require("../../../services/auth.service");


// admin register

const adminRegister = async (req, res) => {

    try {
        const { email, phone_number, password } = req.body;
        const existingAdmin = await User.find({
            $or: [{ email: email }, { phone_number: phone_number }],
        });
        if (existingAdmin.length > 0) {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: null,
                error: req.t('USER_ALREADY_EXISTS'),
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        const newPassword = await passwordHash(password);
        const createAdmin = await User.create({
            ...req.body,
            password: newPassword,
            user_type: ENUMS.USER_TYPE.ADMIN,
        });
        if (createAdmin) {
            const updateAdmin = await User.findByIdAndUpdate(
                createAdmin._id,
                { created_by: createAdmin.id },
                { new: true },
            );
            const userObj = updateAdmin.toJSON();
            delete userObj.password;
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('USERS_ADDED'),
                data: userObj ? userObj : createAdmin,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('USERS_NOT_ADDED'),
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
    } catch (err) {
        console.log('err', err);
        const responsePayload = {
            status: STATUS_ERROR,
            message: null,
            data: null,
            error: INTERNAL_SERVER_ERROR_MESSAGE,
        };
        return res.status(INTERNAL_SERVER_ERROR).json(responsePayload);
    }
}

// admin login

const adminLogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email,
            user_type: ENUMS.USER_TYPE.ADMIN,
        }).populate('permissions', ['name']);

        if (user) {
            const isValidPassword = await comparePasswordHash(password, user.password);

            if (isValidPassword) {
                const userObj = user.toJSON();
                delete userObj.password;
                const tokenObj = {
                    _id: userObj._id,
                    email: userObj.email,
                    first_name: userObj.first_name,
                };

                const token = authService.generateToken(tokenObj);
                userObj.token = token;
                await User.findOneAndUpdate(
                    { _id: user._id },
                    { $set: { token: token } },
                );
                const responsePayload = {
                    status: STATUS_SUCCESS,
                    message: req.t('LOGIN_SUCCESSFUL'),
                    data: { token, userObj },
                    error: null,
                };
                return res.status(STATUS_CODE_OK).json(responsePayload);
            } else {
                const responsePayload = {
                    status: STATUS_ERROR,
                    message: null,
                    data: {},
                    error: req.t('INVALID_CREDENTIAL'),
                };
                return res.status(STATUS_CODE_OK).json(responsePayload);
            }
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('INVALID_EMAIL'),
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
    } catch (err) {
        console.log('err', err);
        const responsePayload = {
            status: STATUS_ERROR,
            message: null,
            data: null,
            error: INTERNAL_SERVER_ERROR_MESSAGE,
        };
        return res.status(INTERNAL_SERVER_ERROR).json(responsePayload);
    }
}

module.exports = { adminRegister, adminLogin }