//@ Register a new user
// @route /api/users
// @access public

import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = await req.body;

  if (!name || !email || !password) {
    throw new Error('please include all fields', 401);
  }

  // if already user exist with email ID.
  const userExits = await User.findOne({
    email,
  });

  if (userExits) {
    res.status(400);
    throw new Error('User already Exist!!');
  }

  // Hash the password

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    return res.status(200).json({
      message: 'registered Successfully!!',
      value: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//@ Login a new user
// @route /api/login
// @access public
export const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = await req.body;

  const user = await User.findOne({ email });

  const isMatchedPassword = await bcrypt.compare(password, user.password);

  if (user && isMatchedPassword) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid Credentials!!');
  }
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'this is me',
  });
});
