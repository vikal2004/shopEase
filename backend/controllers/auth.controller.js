import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
export const registerUser=asyncHandler( async( req, res)=>{
  //write all the steps
  //get user's details from frontend
  //validate details
  //check whether user already exist or not
  //password hashed
  //create entry in database
  //jo user return karega database uski id leke database ko req maro aur user lo bina pass ke
  //return success response
  const {name, email, password, role}=req.body;
  if(
    [name, email, password, role].some((field)=>field?.trim()==="")
  ){
    throw new ApiError(400, "All fields are required");
  }
  
  //check user in the db
  const existedUser=await User.findOne({
    $or: [{name},{email}]
  }) 

  if(existedUser){
    throw new ApiError(409, "user with this email and username already exists")
  }

  const hashedPassword=await bcrypt.hash(password, 10);

  const user=await User.create({
    name,
    email,
    password:hashedPassword,
    role:"customer"
  })
  console.log(user);

  const createdUser=await User.findById(user._id).select("-password")
  if(!createdUser){
    throw new Error(500,"something went wrong while registering the user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "user created successfully")
  )

})

export const loginUser=asyncHandler(async(req, res)=>{
  //get user details from frontend
  //validate the details
  //check whether user exist or not
  //compare password
  //create token
  //make a db call and return the user without pass field
  //send the responses

  const {email, password}=req.body;

  if([email, password].some((field)=>field?.trim()=="")){
    throw new ApiError(400, "all fields required");
  }
  const user=await User.findOne({email});
  
  if(!user){
    throw new ApiError(409, "user does'nt find")
  }

  const isMatch=await bcrypt.compare(password, user.password);
  if(!isMatch){
    throw new ApiError(409, "password does'nt match")
  }

  const token= jwt.sign({
    userId:user._id,
    name:user.name,
    email:user.email,
    role:user.role
  }, process.env.JWT_SECRET_KEY)
   
  const LoggedinUser=await User.findById(user._id).select("-password");
  console.log(LoggedinUser)
  if(!LoggedinUser){
    throw new ApiError(409, "user with existing user_id does not exist")
  }

  res.status(201).json({
    message:"user Loggedin successfully",
    user:LoggedinUser,
    token
  })
  


})

// export const logoutUser=asyncHandler(async(req, res)=>{
//   //clear the localStorage

//   //send the successresponse
// })


