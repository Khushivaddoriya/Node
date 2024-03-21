const { AUTH_USER_DETAILS, STATUS_SUCCESS, STATUS_CODE_OK, STATUS_ERROR, INTERNAL_SERVER_ERROR_MESSAGE, INTERNAL_SERVER_ERROR } = require("../../../constant/global.constants");
const { Plan } = require("../../../schema/plan.schema");
const { default: mongoose } = require("mongoose");
const { getFilter } = require("../../../services/common.service");

// add plan

const addPlan = async (req, res) => {

    try {
        const { _id } = req[AUTH_USER_DETAILS];
        const createPlan = await Plan.create({
            ...req.body,
            user_id: _id,
            created_by: _id,
        });
        if (createPlan) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PLAN_CREATED'),
                data: createPlan,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('PLAN_NOT_CREATED'),
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

// update plan

const updatePlan = async (req, res) => {

    try {
        const { _id } = req[AUTH_USER_DETAILS];
        const { id } = req.params;
        const updatePlan = await Plan.findByIdAndUpdate(
            id,
            { ...req.body, updated_by: _id },
            { new: true },
        );
        if (updatePlan) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PLAN_UPDATED'),
                data: updatePlan,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: null,
                error: req.t('PLAN_NOT_UPDATED'),
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

// delete plan

const deletePlan = async (req, res) => {

    try {
        const { _id } = req[AUTH_USER_DETAILS];
        const { id } = req.params;
        const deletePlan = await Plan.findByIdAndUpdate(
            id,
            { is_deleted: true, deleted_by: _id },
            { new: true },
        );
        if (deletePlan) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PLAN_DELETED'),
                data: {},
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('PLAN_NOT_DELETED'),
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

// disable plan

const disablePlan = async (req, res) => {

    try {
        const { id } = req.params;
        const disablePlan = await Plan.findByIdAndUpdate(
            id,
            { is_disable: true },
            { new: true },
        );
        if (disablePlan) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PLAN_DISABLE'),
                data: disablePlan,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('PLAN_NOT_DISABLE'),
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

// get plan by id

const getPlanById = async (req, res) => {

    try {
        const { id } = req.params;
        const objectId = new mongoose.Types.ObjectId(id);

        const planList = await Plan.findOne({
            _id: objectId,
            is_deleted: false,
            is_disable: false,
        })
            .populate('created_by', ['email', 'first_name', 'last_name'])
            .populate('plan_features', ['feature_name']);
        if (planList) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PLAN_FOUND'),
                data: planList,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('PLAN_NOT_FOUND'),
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

// get all plan with searching,sorting and pagination

const getAllPlan = async (req, res) => {

    try {
        const data = req.body;
        const filterParams = !data.filter
            ? { ...data, filter: { is_deleted: false, is_disable: false } }
            : data;
        const filter = await getFilter(filterParams);
        const findPlan = await Plan
            .find(filter.where)
            .skip(filter.skip)
            .limit(filter.limit)
            .sort(filter.sort)
            .populate('created_by', ['email', 'first_name', 'last_name'])
            .populate('plan_features', ['feature_name']);

        if (findPlan.length > 0) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PLAN_FOUND'),
                data: findPlan,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('PLAN_NOT_FOUND'),
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

// get all plan

const getPlan = async (req, res) => {

    try {

        const findPlan = await Plan
            .find({
                is_deleted: false,
                is_disable: false,
            })
            .populate('created_by', ['email', 'first_name', 'last_name'])
            .populate('plan_features', ['feature_name']);

        if (findPlan.length > 0) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PLAN_FOUND'),
                data: findPlan,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('PLAN_NOT_FOUND'),
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

module.exports = { addPlan, updatePlan, deletePlan, disablePlan, getPlanById, getAllPlan, getPlan }