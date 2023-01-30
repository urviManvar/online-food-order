import mongoose from "mongoose";
var Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    quantity:{
      type:Number,
      require:true,
    },
    price: {
      type: String,
      required: true,
    },
    stoke: {
      type: String,
      required: true,
    },
    image: {
      type: String
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const productModel = mongoose.model("product", productSchema);
export default productModel;
