import {Schema , model} from "mongoose";
const categorySchema = new Schema({

    categoryName:{
        type: String,
        required: true
    }
});

export const categoryModel = model("category", categorySchema);

