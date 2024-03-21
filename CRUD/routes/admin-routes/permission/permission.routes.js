const express = require("express")
const { addPermission, updatePermission, deletePermission, getPermissionById, getAllPermission } = require("../../../controller/admin/permission/permission.controller")
const { auth } = require("../../../middleware/auth.guard")
const { authPermissions } = require("../../../middleware/auth.permission")
const { ENUMS } = require("../../../constant/enum.constants")
const { permissionValidation } = require("../../../validation/permission-validation/permission.validation")
const { validateApi } = require("../../../middleware/validator")

const permissionRouter = express.Router()

permissionRouter.post('/add', auth, authPermissions(ENUMS.PERMISSION.PERMISSION_ADD), permissionValidation(), validateApi, addPermission)

permissionRouter.put('/update/:id', auth, authPermissions(ENUMS.PERMISSION.PERMISSION_UPDATE), permissionValidation(), validateApi, updatePermission)

permissionRouter.delete('/delete/:id', auth, authPermissions(ENUMS.PERMISSION.PERMISSION_DELETE), deletePermission)

permissionRouter.get('/get/:id', auth, authPermissions(ENUMS.PERMISSION.PERMISSION_VIEW), getPermissionById)

permissionRouter.post('/all', auth, authPermissions(ENUMS.PERMISSION.PERMISSION_VIEW), getAllPermission)

module.exports = { permissionRouter }