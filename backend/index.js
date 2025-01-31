import express from "express"
import { connectDB } from "./db/index.js";
const app=express();
import 'dotenv/config'
const PORT=process.env.PORT

app.use(express.json());

connectDB();

app.get("/",(req, res)=>{
 res.send("hi there")
})

app.listen(PORT, ()=>{
    console.log(`Your app is listening to PORT no ${PORT}`)
})