const bcrypt = require("bcrypt");
const User = require("../models/User");

// creating a new user
exports.signup = async (req, res) => {
  try {
    const { username, password, profile_pic } = req.body;

    // if username already exists, then error :P
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render("layout.ejs", {
        currentPage: "pages/signup.ejs",
        error: "Username already taken",
      });
    }

    // Hash(encrypt) the password for security
    const password_hash = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password_hash, profile_pic });
    await newUser.save();

    req.session.user = { id: newUser._id, email: newUser.email }; // Save user in session
    res.redirect("/"); // Redirect to home after signup
    
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
    if (!user) {
      return res.render("layout.ejs", {
        currentPage: "pages/login.ejs",
        error: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.render("layout.ejs", {
        currentPage: "pages/login.ejs",
        error: "Invalid credentials",
      });
    }

    req.session.user = { id: user._id, email: user.email }; // Save user in session
    res.redirect("/"); // Redirect to home after login
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// destroy the session (logging out)
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
