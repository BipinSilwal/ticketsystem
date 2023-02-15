import express from 'express';
import { LoginUser } from '../controller/userController.js';

const getLogin = express.Router();

getLogin.route('/login').get(LoginUser);

export default getLogin;
