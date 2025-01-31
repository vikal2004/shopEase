import mongoose from 'mongoose'

 export const connectDB=async()=>{
    try {
        await mongoose.connect('mongodb+srv://vikal999pro:vikal2004@cluster0.lhrbt.mongodb.net/ShopEase');
        console.log("DB connected successfully")
    } catch (error) {
        console.log("db not connected", error)
    }
}