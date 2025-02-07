import express from 'express'
import { registerUser } from '../controllers/auth.controller.js';
import { loginUser } from '../controllers/auth.controller.js';
const authRouter=express.Router();

authRouter.post('/register',registerUser)
authRouter.post('/login',loginUser)

export default authRouter;