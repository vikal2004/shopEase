import mongoose , {Schema} from "mongoose";

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    }, 
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["customer", "admin"],
        default:"customer"
    },
    wishlist:[
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:"Product"
        }
    ]
},{timestamps:true});

export const User=mongoose.model("User", userSchema);