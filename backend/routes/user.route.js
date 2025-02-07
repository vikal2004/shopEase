import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { deleteUserProfile, getUserProfile, updateUserProfile } from '../controllers/user.controller.js';

const userRouter=express.Router();
// userRouter.get('/profile',authMiddleware, getUserProfile);
// userRouter.put('/update',authMiddleware, updateUserProfile);
userRouter.delete('/delete',authMiddleware, deleteUserProfile);
export default userRouter;