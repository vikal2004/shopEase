import mongoose, {Schema} from "mongoose";

const productSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    stockQuantity:{
        type:Number,
        required:true,
        default:0
    },
    images:[{
        type:String,
         required:true
    }],
    ratings:{
        type:Number,
        default:0
    }
},{timestamps:true});

export const Product=mongoose.model("Product", productSchema);