import { User } from "../models/user.model.js"

export const addProduct=async(req, res)=>{
    try {
        const products=await User.find({});
        if(!products){
            return res.status(401).json({message:"No product found"})
        }
        return res.status(201).json({message:"fetch all products"})
    } catch (error) {
        console.log("unable to fetch products");
        return res.status(500).json({message:"Internel server Error"})
    }
}
export const getAllProduct=async()=>{}
export const getProduct=async()=>{}
export const updateProduct=async()=>{}
export const deleteProduct=async()=>{}