import express from 'express';
import {
  registerUser,
  LoginUser,
  getMe,
} from '../controller/userController.js';
import protect from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.route('/users').post(registerUser);
userRouter.route('/login').post(LoginUser);
userRouter.route('/users/me').get(protect, getMe);

export default userRouter;
