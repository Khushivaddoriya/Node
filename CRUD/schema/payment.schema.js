const { default: mongoose } = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            default: null,
        },
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "orders",
            default: null,
        },
        amount: {
            type: Number,
        },
        currency: {
            type: String,
        },
        payment_method: {
            type: String,
        },
        payer_id: {
            type: String,
        },
        payment_id: {
            type: String,
        },
        payment_intent_id: {
            type: String,
        },
        status: {
            type: String,
        },
        client_secret: {
            type: String,
        },
        card_details: {
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

const Payment = mongoose.model("payments", paymentSchema)

module.exports = { Payment }