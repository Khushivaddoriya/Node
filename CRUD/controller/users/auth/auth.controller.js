const { STATUS_ERROR, STATUS_CODE_OK, STATUS_SUCCESS, INTERNAL_SERVER_ERROR_MESSAGE, INTERNAL_SERVER_ERROR, AUTH_USER_DETAILS } = require("../../../constant/global.constants");
const { passwordHash, comparePasswordHash, addResetPasswordToken, addLogInToken } = require("../../../helpers/common.function");
const { User } = require("../../../schema/user.schema");
const { authService } = require("../../../services/auth.service");
const axios = require("axios")
const dotenv = require("dotenv");
dotenv.config();

// user register

const userRegister = async (req, res) => {

    try {
        const { email, phone_number, password } = req.body;

        const existingUser = await User.find({
            $or: [{ email: email }, { phone_number: phone_number }],
        });
        if (existingUser.length > 0) {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: null,
                error: req.t('USER_ALREADY_EXISTS'),
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        const newPassword = await passwordHash(password);
        const createdUser = await User.create({
            ...req.body,
            password: newPassword,
        });
        if (createdUser) {
            const updateUser = await User.findByIdAndUpdate(
                createdUser._id,
                { created_by: createdUser.id },
                { new: true },
            );
            const userObj = updateUser.toJSON();
            delete userObj.password;
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('USERS_ADDED'),
                data: userObj ? userObj : createdUser,
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

// user login

const userLogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email,
        }).populate('permissions', ['name']);

        if (user) {

            const isValidPassword = await comparePasswordHash(
                password,
                user.password,
            );

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

// forgot password

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const userObj = await User.findOne({ email: email }).exec();
        if (userObj) {
            const user = userObj.toJSON();
            const token = authService.generateTokenForgotPassword(user.id);
            await addResetPasswordToken(token, email);
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('EMAIL_SENT'),
                data: null,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('USER_NOT_FOUND'),
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

// reset password

const resetPassword = async (req, res) => {

    try {
        const { reset_password_token, new_password } = req.body;
        const currentTime = new Date();
        const userDetails = await User.findOne({
            reset_password_token: reset_password_token
        });
        if (userDetails && userDetails.reset_password_expiry_time >= currentTime) {

            const encryptedPassword = await passwordHash(
                new_password,
            );

            const user = await User.findOneAndUpdate(
                {
                    reset_password_token: reset_password_token,
                },
                {
                    password: encryptedPassword,
                    reset_password_token: null,
                    reset_password_expiry_time: null,
                },
            );
            if (user) {
                const responsePayload = {
                    status: STATUS_SUCCESS,
                    message: req.t('PASSWORD_RESET_SUCCESSFULLY'),
                    data: null,
                    error: null,
                };
                return res.status(STATUS_CODE_OK).json(responsePayload);
            } else {
                const responsePayload = {
                    status: STATUS_ERROR,
                    message: null,
                    data: {},
                    error: req.t('PASSWORD_RESET_UN_SUCCESSFULLY'),
                };
                return res.status(STATUS_CODE_OK).json(responsePayload);
            }
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('TOKEN_INVALID'),
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

// check reset password token

const checkResetPasswordToken = async (req, res) => {
    try {
        const { resetToken } = req.body;
        const currentTime = new Date();
        const user = await User.findOne({
            reset_password_token: resetToken,
        });
        if (user && user.reset_password_expiry_time >= currentTime) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('URL_CORRECT'),
                data: null,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('URL_EXPIRED'),
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

// change password

const changePassword = async (req, res) => {

    try {
        const { _id } = req[AUTH_USER_DETAILS];
        const { old_password, new_password } = req.body;

        const user = await User.findOne({ _id: _id });
        if (user) {
            const isValidPassword = await comparePasswordHash(
                old_password,
                user.password,
            );
            if (isValidPassword) {
                const encryptedPassword = await passwordHash(
                    new_password,
                );
                const changePassword = await User.findByIdAndUpdate(
                    { _id },
                    {
                        password: encryptedPassword,
                        token: null,
                    },
                    { new: true },
                );
                if (changePassword) {
                    const responsePayload = {
                        status: STATUS_SUCCESS,
                        message: req.t('PASSWORD_CHANGE_SUCCESSFULLY'),
                        data: changePassword,
                        error: null,
                    };
                    return res.status(STATUS_CODE_OK).json(responsePayload);
                } else {
                    const responsePayload = {
                        status: STATUS_ERROR,
                        message: null,
                        data: {},
                        error: req.t('PASSWORD_CHANGE_UN_SUCCESSFULLY'),
                    };
                    return res.status(STATUS_CODE_OK).json(responsePayload);
                }
            } else {
                const responsePayload = {
                    status: STATUS_ERROR,
                    message: null,
                    data: {},
                    error: req.t('CURRENT_PASSWORD_INVALID'),
                };
                return res.status(STATUS_CODE_OK).json(responsePayload);
            }
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('USER_NOT_FOUND'),
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

// logout

const logout = async (req, res) => {

    try {
        const userDetails = req[AUTH_USER_DETAILS];
        if (!userDetails || !userDetails.email) {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('LOGOUT_FAILED'),
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }

        const { email } = userDetails;
        const loggedOut = await User.findOneAndUpdate(
            { email: email },
            { token: null },
            { new: true },
        );

        if (loggedOut) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('LOGOUT_SUCCESSFUL'),
                data: null,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('LOGOUT_FAILED'),
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

// social google login and signup

const socialGoogleLogin = async (req, res) => {

    try {
        const { accessToken } = req.body;
        // Use the access token to fetch user information
        const userInfoUrl = process.env.GOOGLE_API_URL;
        const headers = { Authorization: `Bearer ${accessToken}` };

        const userInfoResponse = await axios.get(userInfoUrl, { headers });
        const user = userInfoResponse.data;

        const existingUser = await User.findOne({ auth_id: user?.sub });

        // login ------ if already user exists

        if (existingUser) {
            const tokenObj = {
                _id: existingUser._id,
                email: existingUser.email,
            };
            const token = authService.generateToken(tokenObj);
            await addLogInToken(token, existingUser._id);
            await User.findOneAndUpdate(
                { _id: existingUser._id },
                {
                    $set: {
                        token: token,
                        last_login: new Date(),
                    },
                },
            );

            existingUser.token = token;

            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('LOGIN_SUCCESSFUL'),
                data: existingUser,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {

            // register ------- if user is not exists new user create

            const userObj = {
                auth_id: user.sub,
                first_name: user.given_name,
                last_name: user.family_name,
                email: user.email,
            };
            const userCreate = await User.create(userObj);
            const tokenObj = {
                _id: userCreate._id,
                email: userCreate.email,
            };

            const token = authService.generateToken(tokenObj);
            await addLogInToken(token, userCreate._id);
            await User.findOneAndUpdate(
                { email: userCreate.email },
                { created_by: userCreate.id },
                { last_login: new Date() },
            );

            userCreate.token = token;

            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('LOGIN_SUCCESSFUL'),
                data: userCreate,
                error: null,
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

// social facebook login and signup

const socialFacebookLogin = async (req, res) => {

    try {
        const { accessToken } = req.body;
        const userInfoUrl = `${process.env.FACEBOOK_GRAPH_API_URL}?access_token=${accessToken}&fields=id,name,email`;
        console.log("userInfoUrl", userInfoUrl);
        const fields = 'id,name,email';
        const userInfoResponse = await axios.get(userInfoUrl, {
            headers: {
                Accept: 'text/plain',
            },
            params: {
                fields: fields,
                access_token: accessToken,
            },
        });
        const user = userInfoResponse.data;
        const existingUser = await User.findOne({ auth_id: user?.id });
        // login ------ if already user exists
        if (existingUser) {
            const tokenObj = {
                _id: existingUser._id,
                email: existingUser.email,
            };
            const token = authService.generateToken(tokenObj);
            await addLogInToken(token, existingUser._id);
            await User.findOneAndUpdate(
                { _id: existingUser._id },
                { $set: { token, last_login: new Date() } },
            );

            existingUser.token = token;

            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('LOGIN_SUCCESSFUL'),
                data: existingUser,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {

            // register ------- if user is not exists new user create

            let firstName = '';
            let lastName = '';

            if (user.name.includes(' ')) {
                [firstName, lastName] = user.name.split(' ');
            } else {
                firstName = user.name;
            }

            const userObj = {
                auth_id: user.id,
                first_name: firstName,
                last_name: lastName || '',
                email: user.email || '',
            };

            const userCreate = await User.create(userObj);

            const tokenObj = {
                _id: userCreate._id,
                email: userCreate.email,
            };

            const token = authService.generateToken(tokenObj);
            await addLogInToken(token, userCreate._id);
            await User.findOneAndUpdate(
                { email: userCreate.email },
                { last_login: new Date() },
            );

            userCreate.token = token;

            const updateUser = await User.findByIdAndUpdate(
                userCreate._id,
                { created_by: userCreate.id },
                { new: true },
            );

            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('LOGIN_SUCCESSFUL'),
                data: updateUser,
                error: null,
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

// social instagram login and signup

const socialInstagramLogin = async (req, res) => {

    try {
        const { accessToken } = req.body;
        const userInfoUrl = `${process.env.INSTAGRAM_GRAPH_API_URL}?fields=id,username&access_token=${accessToken}`;

        const fields = 'id,username';
        const userInfoResponse = await axios.get(userInfoUrl, {
            headers: {
                Accept: 'text/plain',
            },
            params: {
                fields,
                access_token: accessToken,
            },
        });
        const user = userInfoResponse.data;

        const existingUser = await User.findOne({ auth_id: user?.id });

        // login ------ if already user exists

        if (existingUser) {
            const tokenObj = {
                _id: existingUser._id,
                email: existingUser.email,
            };
            const token = authService.generateToken(tokenObj);
            await addLogInToken(token, existingUser._id);
            await User.findOneAndUpdate(
                { _id: existingUser._id },
                { $set: { token, last_login: new Date() } },
            );

            existingUser.token = token;

            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('LOGIN_SUCCESSFUL'),
                data: existingUser,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } 
        else {

            // register ------- if user is not exists new user create

            const userObj = {
                auth_id: user.id,
                user_name: user.username,
            };

            const userCreate = await User.create(userObj);

            const tokenObj = {
                _id: userCreate._id,
                email: userCreate.email,
            };

            const token = authService.generateToken(tokenObj);
            await addLogInToken(token, userCreate._id);
            await User.findOneAndUpdate(
                { email: userCreate.email },
                { last_login: new Date() },
            );

            userCreate.token = token;
            const updateUser = await User.findByIdAndUpdate(
                userCreate._id,
                { created_by: userCreate.id },
                { new: true },
            );
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('LOGIN_SUCCESSFUL'),
                data: updateUser,
                error: null,
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

module.exports = {
    userRegister,
    userLogin,
    forgotPassword,
    resetPassword,
    checkResetPasswordToken,
    changePassword,
    logout,
    socialGoogleLogin,
    socialFacebookLogin,
    socialInstagramLogin
}