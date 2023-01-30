import { Schema, model } from "mongoose";
const userSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  userMobile: {
    type: Number,
    require: true,
  },
  userEmail: {
    type: String,
    require: true,
  },
  userPassword: {
    type: Number,
    require: true,
  },
  userFeedback: {
    type: String,
    require: true,
  },
});
export const userModel = model("user", userSchema);
