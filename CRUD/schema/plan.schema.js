const { default: mongoose } = require("mongoose");

const planSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            default: null,
        },
        amount: {
            type: Number,
        },
        currency: {
            type: String,
        },
        plan_name: {
            type: String,
        },
        plan_type: {
            type: String,
        },
        plan_limit: {
            type: String,
        },
        plan_features: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "planfeatures",
                default: null,
            }
        ],
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

const Plan = mongoose.model("plans", planSchema)

module.exports = { Plan }