import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }, 
    products:[
        {
            productId:{type:mongoose.Schema.Types.ObjectId, ref:"Object"},
            quantity:{type:Number, required:true}
        }
    ],
    totalAmount:{
        type:Number,
        required:true
    },
    orderStatus:{
        type:String,
        enum:["Pending", "Processing","Shipped", "Delivered", "Cancelled"],
        default:"Pending"
    },
    shippingAddress:{
        type:String,
        required:true
    }
},{timestamps:true});

export const Order=mongoose.model("Order", orderSchema);