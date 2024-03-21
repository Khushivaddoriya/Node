const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema(
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
        order_number: {
            type: Number,
        },
        invoice_number: {
            type: String,
            default: null,
        },
        plan_purchase_date: {
            type: Date,
            default: null,
        },
        plan_expire_date: {
            type: Date,
            default: null,
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

const Order = mongoose.model("orders", orderSchema)

module.exports = { Order }