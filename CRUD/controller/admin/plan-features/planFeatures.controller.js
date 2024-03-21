const { default: mongoose } = require("mongoose");
const { AUTH_USER_DETAILS, STATUS_SUCCESS, STATUS_CODE_OK, STATUS_ERROR, INTERNAL_SERVER_ERROR_MESSAGE, INTERNAL_SERVER_ERROR } = require("../../../constant/global.constants");
const { PlanFeature } = require("../../../schema/plan-features.schema");

// add plan feature

const addPlanFeatures = async (req, res) => {

    try {
        const { _id } = req[AUTH_USER_DETAILS];
        const addFeatures = await PlanFeature.create({
            ...req.body,
            created_by: _id,
        });
        if (addFeatures) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PLAN_FEATURE_CREATED'),
                data: addFeatures,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('PLAN_FEATURE_NOT_CREATED'),
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

// update plan feature

const updatePlanFeature = async (req, res) => {

    try {
        const { id } = req.params;
        const { _id } = req[AUTH_USER_DETAILS];
        const updatePlanFeature = await PlanFeature.findByIdAndUpdate(
            id,
            { ...req.body, updated_by: _id },
            { new: true },
        );
        if (updatePlanFeature) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PLAN_FEATURE_UPDATED'),
                data: updatePlanFeature,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: null,
                error: req.t('PLAN_FEATURE_NOT_UPDATED'),
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

// delete plan feature(soft-delete)

const deletePlanFeature = async (req, res) => {

    try {
        const { id } = req.params;
        const { _id } = req[AUTH_USER_DETAILS];
        const deletePlanFeature = await PlanFeature.findByIdAndUpdate(
            id,
            { is_deleted: true, deleted_by: _id },
            { new: true },
        );
        if (deletePlanFeature) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PLAN_FEATURE_DELETED'),
                data: {},
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('PLAN_FEATURE_NOT_DELETED'),
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

// disable plan feature

const disablePlanFeature = async (req, res) => {

    try {
        const { id } = req.params;
        const disablePlanFeature = await PlanFeature.findByIdAndUpdate(
            id,
            { is_disable: true },
            { new: true },
        );
        if (disablePlanFeature) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PLAN_FEATURE_DISABLE'),
                data: disablePlanFeature,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('PLAN_FEATURE_NOT_DISABLE'),
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

// get feature by id

const getFeatureById = async (req, res) => {

    try {
        const { id } = req.params;
        const objectId = new mongoose.Types.ObjectId(id);
        const planFeatureList = await PlanFeature
            .findOne({
                _id: objectId,
                is_deleted: false,
                is_disable: false,
            })
            .populate('created_by', ['email', 'first_name', 'last_name']);
        if (planFeatureList) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PLAN_FEATURE_FOUND'),
                data: planFeatureList,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('PLAN_FEATURE_NOT_FOUND'),
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

// get all plan feature

const getAllPlanFeature = async (req, res) => {

    try {
        const findPlanFeature = await PlanFeature.find({
            is_deleted: false,
            is_disable: false,
        }).populate('created_by', ['email', 'first_name', 'last_name']);

        if (findPlanFeature.length > 0) {
            const responsePayload = {
                status: STATUS_SUCCESS,
                message: req.t('PLAN_FEATURE_FOUND'),
                data: findPlanFeature,
                error: null,
            };
            return res.status(STATUS_CODE_OK).json(responsePayload);
        } else {
            const responsePayload = {
                status: STATUS_ERROR,
                message: null,
                data: {},
                error: req.t('PLAN_FEATURE_NOT_FOUND'),
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


module.exports = { addPlanFeatures, updatePlanFeature, deletePlanFeature, disablePlanFeature, getFeatureById, getAllPlanFeature }