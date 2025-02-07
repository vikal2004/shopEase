import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
const authMiddleware=async(req, res, next)=>{
 try {
  const token= req.header("Authorization").replace("Bearer ", "");
  if(!token){
   throw new ApiError(401, "unauthorized request");
  }
 
  const decodedToken=jwt.verify(token, process.env.JWT_SECRET_KEY);
 
  const user=await User.findById(decodedToken.userId).select("-password");
 
  req.user=user;
 
  next();
 } catch (error) {
  throw new ApiError(401, error?.message || "Invalid access token")
 }
}
export default authMiddleware;