 import {User} from "../models/user.model.js"
 import bcrypt from "bcrypt"
 import jwt from "jsonwebtoken"
 
 export const registerUser=async (req, res)=>{
   const {name, email , password, role}=req.body;
     console.log(name);
   if (!name || !email || !password || !role ){
      return res.status(422).json({
        message:"please enter all fields"
      })
   }
 try {
   //check if the user is already exists
   const existingUser=await User.findOne({email});
   
   if(existingUser){
     return res.status(409).json({message:"User already exists"})
   }

   //hash the password
   const hashedPassword=await bcrypt.hash(password, 10);

   //create new User
   const newUser=new User({
    name,
    email,
    password:hashedPassword,
    role:"customer"
   })

   await newUser.save();

   //success response
   return res.status(201).json({message:"User registered successfully"})

 } catch (error) {
    console.error("Registration Error", error);
    return res.status(500).json({message:"Internal server Error"})
 }
}

export const loginUser=async(req, res)=>{

  const {email, password}=req.body;
  if(!email || !password ){
     return res.status(422).json({message:"Please Enter all fields"});
  }

 try {

  const user=await User.findOne({email});
  if(!user){
    return res.status(401).json({message:"User does'nt exists"});
  }

  //compare password to already exist password
  const isMatch=await bcrypt.compare(password, user.password);
  if(!isMatch){
    return res.status(401).json({message:"wrong password"})
  }
  
  //generate jwt token 
  const token=jwt.sign({
   userId:user._id,
   role:user.role
  }, process.env.JWT_SECRET_KEY, {expiresIn:"7d"});
  
  //fetch user again without password
  const userwithoutPass=await User.findById(user._id).select("-password")
  
  return res.status(201).json({
    message:"Login successfully",
    user:userwithoutPass,
    token:token
  })

 } catch (error) {
   console.error("user can't login", error);
   return res.status(500).json({message:"Internel server error"})
 }
}