const { default: mongoose } = require("mongoose");
const { ENUMS } = require("../constant/enum.constants");

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        user_name: {
            type: String,
        },
        email: {
            type: String,
        },
        phone_number: {
            type: String
        },
        password: {
            type: String,
        },
        profile_image: {
            type: String,
            default: null,
        },
        user_type: {
            type: String,
            default: ENUMS.USER_TYPE.USER,
            enum: [
                ENUMS.USER_TYPE.ADMIN,
                ENUMS.USER_TYPE.USER,
            ],
        },
        auth_id: {
            type: String,
            required: false
        },
        token: {
            type: String,
            default: null,
            required: false
        },
        permissions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "permissions"
            }
        ],
        reset_password_token: {
            type: String,
            default: null,
            required: false,
        },
        reset_password_expiry_time: {
            type: Date,
            required: false,
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            default: null,
        },
        updated_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            default: null,
        },
        deleted_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            default: null,
        },
        is_disable: {
            type: Boolean,
            required: false,
            default: false
        },
        is_deleted: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("users", userSchema)

module.exports = { User }