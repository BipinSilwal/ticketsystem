export const registerUser = (req, res) => {
  console.log(req.url);
  res.json({ message: 'Register Users' });
};

export const LoginUser = (req, res) => {
  console.log(req.url);
  res.json({ message: 'Login Users' });
};
