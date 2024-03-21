const express = require("express")
const { updateUser, deleteUser, getUserById, uploadImage, getUserWithSearch, getAllUser } = require("../../../controller/users/customer/customer.controller")
const { auth } = require("../../../middleware/auth.guard")
const { authPermissions } = require("../../../middleware/auth.permission")
const { ENUMS } = require("../../../constant/enum.constants")
const { uploadProfileImage } = require("../../../services/fileUpload")
const { userUpdateValidation } = require("../../../validation/user-validation/userUpdate.validatiion")
const { validateApi } = require("../../../middleware/validator")

const customerRouter = express.Router()

customerRouter.put("/update", auth, authPermissions(ENUMS.PERMISSION.USER_UPDATE), userUpdateValidation(), validateApi, updateUser)

customerRouter.delete("/delete", auth, authPermissions(ENUMS.PERMISSION.USER_DELETE), deleteUser)

customerRouter.get("/get-user", auth, authPermissions(ENUMS.PERMISSION.USER_VIEW), getUserById)

customerRouter.post("/all-user", auth, authPermissions(ENUMS.PERMISSION.USER_VIEW), getUserWithSearch)

customerRouter.get("/", auth, authPermissions(ENUMS.PERMISSION.USER_VIEW), getAllUser)

customerRouter.post("/image/upload", auth, uploadProfileImage.single('file'), uploadImage)

module.exports = { customerRouter }