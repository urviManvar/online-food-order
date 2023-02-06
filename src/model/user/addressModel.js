import { Schema, model } from "mongoose";

const addressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  City: {
    type: String,
    require: true,
  },
  District: {
    type: String,
    require: true,
  },
  Pincode: {
    type: String,
    require: true,
  },
  Address: {
    type: String,
    require: true,
  },
});
export const addressModel = model("address", addressSchema);
