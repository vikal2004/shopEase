
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import  uploadOnCloudinary  from "../utils/cloudinary.js";
export const addProduct=asyncHandler(async(req, res)=>{
 //get user details from frontend;
 //validate details
 //check if another product with same name exist or not
 //extract images from localfilePath
 //check if images were upload
 //and upload it to cloudinary
 //create a new product entry in database
 //return success response
const {name, price, description, category, stockQuantity}=req.body;

if([name, price, description, category, stockQuantity].some((field)=>field?.trim()==="")){
    throw new ApiError(401, "All fileds are required");
}

const existedProduct=await Product.findOne({name});
if(existedProduct){
    throw new ApiError(400, "product with this name is already exist")
}

if(!req.files || req.files.length==0){
    return res.status(400).json({
        message:"At least one image is required"
    })
}

//upload to cloudinary

   const imageUrls= await Promise.all(
     req.files.map(async(file)=>await uploadOnCloudinary(file.path))
   )
  
const newProduct=new Product({
    name,
    price,
    description,
    category,
    stockQuantity,
    images: imageUrls, // Store Cloudinary URLs in DB
})

await newProduct.save();

res.status(201).json({ message: "Product created successfully", product:newProduct});

})
 
export const getAllProduct=asyncHandler(async(req, res)=>{
    //just make a db call 
    //check if you get the product or not
    //return a response
    const products=await Product.find({});
    if(!products){
        throw new ApiError(401, "no products available")
    }

    return res.status(201).json({
        message:"Products fetch successfully",
        products:products
    })
})

export const getProduct=asyncHandler(async(req, res)=>{
 //get id from req.param
 //validate id
 //make a db call
 //return user

 const {id}=req.params;
 console.log(id);
 if(!id){
    throw new ApiError(400, "productId is required")
 }

 const product=await Product.findById(id);
 if(!product){
    throw new ApiError(401, "product does'nt exist")
 }

return res.status(201).json({message:"Product details fetched successfully", product:product})
})

export const updateProduct=asyncHandler(async(req, res)=>{
    //get user details from frontend
    //validate user
    const{id}=req.params;
    const {name, price, description, category, stockQuantity}=req.body;
    if([name,price, description, category, stockQuantity].some((field)=>field.split()=="")){
        throw new ApiError(401, "All fields required");
    }
    if(!req.files || req.files.length==0){
        throw new ApiError(401, "at one image is required")
    }
    const imageUrls=await Promise.all(
        req.files.map(async(file)=>await uploadOnCloudinary(file.path))
    );

    await Product.findByIdAndUpdate(id, {
     name,
     price,
     description,
     category,
     stockQuantity,
     images:imageUrls
   }, {new:true})
    const updatedUser=await Product.findById(id);
   
   return res.status(201).json({message:"Product updated successfully",user:updatedUser})
})
export const deleteProduct=asyncHandler(async(req, res)=>{
    const {id}=req.params;
    
    await Product.findByIdAndDelete(id);

    return res.status(201).json({message:"Product deleted successfully"})
})