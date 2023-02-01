import { Schema, model } from "mongoose";

const cartSchema = new  Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
    },

    isCheckout: {
        type: Boolean,
        default: false,
    },

    productId: {
        type: [Schema.Types.ObjectId],
        required: true,
    },

    amount: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },

    createdAt: Number,
    updatedAt: Number,

},
    { timestamps: true, versionKey: false });

    export const cartModel = model("cart", cartSchema);