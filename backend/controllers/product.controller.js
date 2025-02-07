
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import path from 'path'
export const addProduct=asyncHandler( async(req, res)=>{
  //let's see all the steps
  //get product details from frontend
  //validate details
  //check whether product already exists or not- name
  //check for images 
  //upload them on cloudinary
  //create product object -->create entry in database
  // check for product creation
  //return res


const {name, price , description , category, stockQuantity}=req.body;
if(
    [name, price, description, category, stockQuantity].some((field)=> field?.trim()=== "")
)
{
    throw new ApiError(400, "All fields are required")
}

const existedProduct= await Product.findOne({name});
if(existedProduct){
    throw new ApiError(409, "this product is already exists")
}


//check for images
if(!req.files || req.files.length === 0){
    throw new ApiError(400, "files are required")
}


const result=await uploadOnCloudinary();



// res.status(200).json({ success: true, images: uploadedImages });

})
export const getAllProduct=async()=>{}
export const getProduct=async()=>{}
export const updateProduct=async()=>{}
export const deleteProduct=async()=>{}