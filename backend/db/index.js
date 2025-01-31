import mongoose from 'mongoose'

 export const connectDB=async()=>{
    try {
        await mongoose.connect('mongodb+srv://vikalsingh:7706906396@cluster0.uvkv8.mongodb.net/ShopEase');
        console.log("DB connected successfully")
    } catch (error) {
        console.log("db not connected", error)
    }
}