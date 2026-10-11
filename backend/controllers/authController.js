const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const userResponse = (user) => ({ id: user._id, name: user.name, email: user.email });

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.findOne({ email: (email || '').toLowerCase() })) {
    throw new AppError('An account with this email already exists', 409);
  }
  const user = await User.create({ name, email, password });
  res.status(201).json({ token: signToken(user._id), user: userResponse(user) });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new AppError('Email and password are required', 400);

  const user = await User.findOne({ email: email.toLowerCase() });
  // Same message for both failures so attackers can't tell which part was wrong
  if (!user || !(await user.matchPassword(password))) throw new AppError('Invalid email or password', 401);

  res.json({ token: signToken(user._id), user: userResponse(user) });
});

const getMe = asyncHandler(async (req, res) => {
  res.json({ user: userResponse(req.user) });
});

module.exports = { register, login, getMe };
