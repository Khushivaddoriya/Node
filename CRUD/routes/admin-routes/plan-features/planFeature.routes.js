const express = require("express")
const { addPlanFeatures, updatePlanFeature, deletePlanFeature, disablePlanFeature, getFeatureById, getAllPlanFeature } = require("../../../controller/admin/plan-features/planFeatures.controller")
const { authPermissions } = require("../../../middleware/auth.permission")
const { ENUMS } = require("../../../constant/enum.constants")
const { auth } = require("../../../middleware/auth.guard")
const { planFeatureValidation } = require("../../../validation/planFeature-validation/planFeature.validation")
const { validateApi } = require("../../../middleware/validator")


const planFeatureRouter = express.Router()

planFeatureRouter.post("/add", auth, authPermissions(ENUMS.PERMISSION.PLAN_FEATURES_ADD), planFeatureValidation(), validateApi, addPlanFeatures)

planFeatureRouter.put("/update/:id", auth, authPermissions(ENUMS.PERMISSION.PLAN_FEATURES_UPDATE), planFeatureValidation(), validateApi, updatePlanFeature)

planFeatureRouter.delete("/delete/:id", auth, authPermissions(ENUMS.PERMISSION.PLAN_FEATURES_DELETE), deletePlanFeature)

planFeatureRouter.put("/disable/:id", auth, authPermissions(ENUMS.PERMISSION.PLAN_FEATURES_DISABLE), disablePlanFeature)

planFeatureRouter.get("/get/:id", auth, authPermissions(ENUMS.PERMISSION.PLAN_FEATURES_VIEW), getFeatureById)

planFeatureRouter.get("/", auth, authPermissions(ENUMS.PERMISSION.PLAN_FEATURES_VIEW), getAllPlanFeature)

module.exports = { planFeatureRouter }