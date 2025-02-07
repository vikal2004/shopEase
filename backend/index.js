import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from "./db/index.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import orderRouter from "./routes/order.route.js";
import cartRouter from "./routes/cart.route.js";
import wishlistRouter from "./routes/wishlist.route.js";
import productRouter from "./routes/product.route.js";
import reviewRouter from "./routes/review.route.js";
const app=express();
import 'dotenv/config'
const PORT=process.env.PORT

app.use(cors());
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.use('/api/auth',authRouter);
app.use('/api/users',userRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/wishlist', wishlistRouter)
connectDB();

app.get("/",(req, res)=>{
 res.send("hi there")
})

app.listen(PORT, ()=>{
    console.log(`Your app is listening to PORT no ${PORT}`)
})