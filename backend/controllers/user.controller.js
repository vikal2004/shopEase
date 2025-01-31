import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"
export const getUserProfile=async(req, res)=>{
    try {
       const userId=req.user._id
        const user=await User.findById(userId).select("-password");
        if(!user){
            return res.status(401).json({message:"user does not exist"})
        }
        return res.status(201).json({
            message:"user details fetched successful",
            user
        })
    } catch (error) {
        console.log("unable to fetch user details");
        return res.status(500).json({message:"Internel server error"})
    }
}
export const updateUserProfile=async(req, res)=>{
    const {name, email , password, role}=req.body;
    if(!name || !email || !password || !role){
        return res.status(401).json({message:"please enter all the fields"});
    }
 try {
    const userId=req.user._id;
    const user=await User.findById(userId);
    if(name) user.name=name;
    if(email) user.email=email;
    if(password) {
      user.password=await bcrypt.hash(password, 10)
    }
    if(role) user.role=role

    //save updated user data
    await user.save();

    return res.status(201).json({message:"User updated successfully", user})

 } catch (error) {
    console.log("Unable to update user profile");
    return res.status(500).json({message:"Internel server error"})
 }
}
export const deleteUserProfile=async(req, res)=>{
 try {
    const id=req.user._id;
    await User.findByIdAndDelete(id);
    return res.status(201).json({message:"User deleted successfully"})
 } catch (error) {
    console.log("Unable to delete user profile")
    return res.status(500).json({message:"Internel server error"})
 }
}
