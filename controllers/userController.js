const User = require("../models/User");

// Get user profile
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password_hash");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};