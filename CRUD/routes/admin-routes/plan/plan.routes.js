const express = require("express")
const { addPlan, updatePlan, deletePlan, disablePlan, getPlanById, getAllPlan, getPlan } = require("../../../controller/admin/plan/plan.controller")
const { auth } = require("../../../middleware/auth.guard")
const { authPermissions } = require("../../../middleware/auth.permission")
const { ENUMS } = require("../../../constant/enum.constants")
const { planValidation } = require("../../../validation/plan-validation/plan.validation")
const { validateApi } = require("../../../middleware/validator")

const planRouter = express.Router()


planRouter.post("/add", auth, authPermissions(ENUMS.PERMISSION.PLAN_ADD), planValidation(), validateApi, addPlan)

planRouter.put("/update/:id", auth, authPermissions(ENUMS.PERMISSION.PLAN_UPDATE), planValidation(), validateApi, updatePlan)

planRouter.delete("/delete/:id", auth, authPermissions(ENUMS.PERMISSION.PLAN_DELETE), deletePlan)

planRouter.put("/disable/:id", auth, authPermissions(ENUMS.PERMISSION.PLAN_DISABLE), disablePlan)

planRouter.get("/get/:id", auth, authPermissions(ENUMS.PERMISSION.PLAN_VIEW), getPlanById)

planRouter.post("/all", auth, authPermissions(ENUMS.PERMISSION.PLAN_VIEW), getAllPlan)

planRouter.get("/", auth, authPermissions(ENUMS.PERMISSION.PLAN_VIEW), getPlan)

module.exports = { planRouter }