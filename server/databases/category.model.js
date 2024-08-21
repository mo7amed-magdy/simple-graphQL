import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:String
})

export const categoryModel = mongoose.model("category", schema);