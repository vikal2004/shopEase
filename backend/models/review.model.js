import mongoose, {Schema} from "mongoose";

const reviewSchema=new Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    product:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    rating:{
       type:Number,
       required:true,
       min:1,
       max:5
    },
    comment:{
        type:String,
        required:true,
        minlength:10,
        maxlength:100
    }
},{timestamps:true});

export const Review=mongoose.model("Review", reviewSchema);