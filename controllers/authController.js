const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// creating a new user
exports.signup = async (req, res) => {
  try {
    const { username, password, profile_pic } = req.body;

    // if username already exists, then error :P
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "Username already taken" });

    // Hash(encrypt) the password for security
    const password_hash = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password_hash, profile_pic });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// authenticating a user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // If no user, then error.
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Create a JWT token (store user's ID)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set token in cookie/ make a session
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    res.json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// destroy the session (logging out)
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
