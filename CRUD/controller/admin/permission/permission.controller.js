const { default: mongoose } = require("mongoose");
const { AUTH_USER_DETAILS, STATUS_CODE_OK, STATUS_SUCCESS, INTERNAL_SERVER_ERROR_MESSAGE, STATUS_ERROR, INTERNAL_SERVER_ERROR } = require("../../../constant/global.constants");
const { Permission } = require("../../../schema/permission.schema");
const { getFilter } = require("../../../services/common.service");

// add permission

const addPermission = async (req, res) => {

    try {
        const { name } = req.body;
        const { _id } = req[AUTH_USER_DETAILS];

        const checkExists = await Permission.find({ name: name })

        if (checkExists.length > 0) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PERMISSION_ALREADY_EXISTS'),
                data: {},
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }

        const addPermission = await Permission.create({
            name: name,
            created_by: _id,
        });

        if (addPermission) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PERMISSION_ADD_SUCCESS'),
                data: addPermission,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PERMISSION_ADD_ERROR'),
                data: {},
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

// update permission

const updatePermission = async (req, res) => {
    try {
        const { _id } = req[AUTH_USER_DETAILS];
        const { id } = req.params;
        const updatedData = await Permission.findByIdAndUpdate(
            id,
            { ...req.body, updated_by: _id },
            { new: true },
        );
        if (updatedData) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PERMISSION_UPDATE_SUCCESS'),
                data: updatedData,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: null,
                error: req.t('PERMISSION_UPDATE_ERROR'),
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

// delete permission

const deletePermission = async (req, res) => {
    try {
        const { _id } = req[AUTH_USER_DETAILS];
        const { id } = req.params;
        const deleteData = await Permission.findByIdAndUpdate(
            id,
            { is_deleted: true, deleted_by: _id },
            { new: true },
        );
        if (deleteData) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PERMISSION_DELETE_SUCCESS'),
                data: {},
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('PERMISSION_DELETE_ERROR'),
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

// get permission by id

const getPermissionById = async (req, res) => {

    try {
        const { id } = req.params;
        const objectId = new mongoose.Types.ObjectId(id);
        const permissionList = await Permission.findOne({
            _id: objectId,
            is_deleted: false,
            is_disable: false,
        }).populate('created_by', ['email', 'first_name', 'last_name']);

        if (permissionList) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PERMISSION_FOUND_SUCCESS'),
                data: permissionList,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('PERMISSION_FOUND_ERROR'),
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

// get all permission

const getAllPermission = async (req, res) => {
    try {
        const data = req.body;
        const filterData = !data.filter
            ? { ...data, filter: { is_deleted: false, is_disable: false } }
            : data;
        const filter = await getFilter(filterData);
        const findPermission = await Permission
            .find(filter.where)
            .skip(filter.skip)
            .limit(filter.limit)
            .sort(filter.sort)
            .populate('created_by', ['email', 'first_name', 'last_name']);
        const count = await Permission.count(filter.where);

        if (findPermission.length > 0) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PERMISSION_FOUND_SUCCESS'),
                data: { permission: findPermission, count: count },
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('PERMISSION_FOUND_ERROR'),
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

module.exports = { addPermission, updatePermission, deletePermission, getPermissionById, getAllPermission }