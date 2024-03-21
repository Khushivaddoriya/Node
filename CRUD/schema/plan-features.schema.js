const { default: mongoose } = require("mongoose");

const planFeatureSchema = new mongoose.Schema(
    {
        feature_name: {
            type: String,
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

const PlanFeature = mongoose.model("planfeatures", planFeatureSchema)

module.exports = { PlanFeature }