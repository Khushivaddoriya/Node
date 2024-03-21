const { AUTH_USER_DETAILS, STATUS_CODE_OK, STATUS_ERROR, INTERNAL_SERVER_ERROR_MESSAGE, INTERNAL_SERVER_ERROR, STATUS_SUCCESS } = require("../../../constant/global.constants");
const { User } = require("../../../schema/user.schema");
const { getFilter } = require("../../../services/common.service");

// update user profile

const updateUser = async (req, res) => {

    try {
        const { _id } = req[AUTH_USER_DETAILS];
        const user = await User.findByIdAndUpdate(
            { _id },
            { ...req.body, updated_by: _id },
            { new: true },
        );
        if (user) {
            const userObj = user.toJSON();
            delete userObj.password;
            delete userObj.token;
            delete userObj.reset_password_token;
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('USER_UPDATED'),
                data: userObj,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: null,
                error: req.t('USER_NOT_UPDATE'),
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

// delete user

const deleteUser = async (req, res) => {

    try {
        const { _id } = req[AUTH_USER_DETAILS];
        const existingUser = await User.findById(_id);

        if (!existingUser) {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('USERS_NOT_FOUND'),
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        const deletedUser = await User.findByIdAndUpdate(
            { _id },
            {
                $set: {
                    token: null,
                    is_deleted: true,
                    deleted_by: _id,
                },
            },
            { new: true },
        );
        if (deletedUser) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('USER_DELETED'),
                data: {},
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('USER_NOT_DELETE'),
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

// get user by id

const getUserById = async (req, res) => {

    try {
        const { _id } = req[AUTH_USER_DETAILS];
        const userList = await User.findOne({
            _id,
            is_deleted: false,
            is_disable: false,
        }).populate('created_by', ['email', 'first_name', 'last_name']);

        if (userList) {
            const userObj = userList.toJSON();
            delete userObj.password;
            delete userObj.token;
            delete userObj.reset_password_token;
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('USERS_FOUND'),
                data: userObj,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('USERS_NOT_FOUND'),
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

// get all user with searching, sorting and pagination

const getUserWithSearch = async (req, res) => {

    try {
        const params = req.body;
        const filterParams = !params.filter
            ? { ...params, filter: { is_deleted: false, is_disable: false } }
            : params;
        const filter = await getFilter(filterParams);
        const projection = {
            password: 0,
            token: 0,
            reset_password_token: 0,
            reset_password_expiry_time: 0,
            __v: 0,
        };

        const findUser = await User
            .find(filter.where, projection)
            .skip(filter.skip)
            .limit(filter.limit)
            .sort(filter.sort)
            .populate('created_by', ['email', 'first_name', 'last_name']);

        const count = await User.count(filter.where);

        if (findUser.length > 0) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('USERS_FOUND'),
                data: { user: findUser, count: count },
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('USERS_NOT_FOUND'),
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

// get all user

const getAllUser = async (req, res) => {

    try {
        const findUser = await User
            .find()
            .populate('created_by', ['email', 'first_name', 'last_name'])
            .populate('permissions', ['name']);

        if (findUser.length > 0) {

            const userObjects = findUser.map(user => {
                const userObj = user.toJSON();
                delete userObj.password;
                delete userObj.token;
                delete userObj.reset_password_token;
                return userObj;
            });

            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('USERS_FOUND'),
                data: userObjects,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('USERS_NOT_FOUND'),
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
    }
    catch (err) {
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

// upload user profile image

const uploadImage = async (req, res) => {

    try {
        const { _id } = req[AUTH_USER_DETAILS];
        if (
            req.file.mimetype === 'image/jpeg' ||
            req.file.mimetype === 'image/png' ||
            req.file.mimetype === 'image/jpg'
        ) {
            const imageUrl = `images/${req.file.filename}`;

            const savedImage = await User.findByIdAndUpdate(
                _id,
                {
                    profile_image: imageUrl,
                },
                { new: true },
            );

            if (savedImage) {
                const userObj = savedImage.toJSON();
                delete userObj.password;
                delete userObj.token;
                delete userObj.reset_password_token;
                const responsePayload = {
                    status: STATUS_SUCCESS,
                    message: req.t('IMAGE_UPLOAD'),
                    data: userObj,
                    error: null,
                };
                return res.status(STATUS_CODE_OK).json(responsePayload);
            } else {
                const responsePayload = {
                    status: STATUS_ERROR,
                    message: null,
                    data: null,
                    error: req.t('IMAGE_NOT_UPLOAD'),
                };
                return res.status(STATUS_CODE_OK).json(responsePayload);
            }
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: null,
                error: req.t('IMAGE_ALLOWED'),
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

module.exports = { updateUser, deleteUser, getUserById, getUserWithSearch, uploadImage, getAllUser }