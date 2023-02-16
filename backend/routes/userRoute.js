import express from 'express';
import { registerUser, LoginUser } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.route('/users').post(registerUser);
userRouter.route('/login').post(LoginUser);

export default userRouter;
