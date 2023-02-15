//@ Register a new user
// @route /api/users
// @access public

import asyncHandler from 'express-async-handler';

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = await req.body;

  if (!name || !email || !password) {
    throw new Error('please include all fields', 401);
  }

  return res.status(200).json({
    message: 'registered Successfully!!',
    value: {
      name,
      email,
      password,
    },
  });
});

//@ Login a new user
// @route /api/login
// @access public
export const LoginUser = asyncHandler(async (req, res) => {
  console.log(req.url);
  res.json({ message: 'Login Users' });
});
