import mongoose, {Schema} from "mongoose";

const reviewSchema=new Schema({},{timestamps:true});

export const Review=mongoose.model("Review", reviewSchema);