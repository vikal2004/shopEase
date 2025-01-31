import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
const authMiddleware=async(req, res, next)=>{
  try {
  const authHeader=req.headers.authorization;
  if( !authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({
      message:"Authorization failed no token access"
    })
  }
    //checking if token is null 
    const token=authHeader.split(" ")[1];
    
    //verify if the token is verify or not
    const decodedToken=jwt.verify(token, process.env.JWT_SECRET_KEY)
    
    const id=decodedToken.userId;

    //find user and exclude password field
    const user=await User.findOne(id).select("-password")
    
    req.user=user;
   
   next();

  } catch (error) {
    console.error("Unauthorized user", error);
    return res.status(500).json({message:"Internel server Error"})
  }
}
export default authMiddleware;