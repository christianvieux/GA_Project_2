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

// Show edit form (for EJS later)
exports.editUserForm = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (req.user.id !== user.id) return res.status(403).json({ error: "Unauthorized" });

    res.json({ user }); // TODO: render("edit-user", { user })
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update user profile
exports.updateUser = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) return res.status(403).json({ error: "Unauthorized" });

    const { username, profile_pic } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, profile_pic },
      { new: true, runValidators: true }
    ).select("-password_hash");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) return res.status(403).json({ error: "Unauthorized" });

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
