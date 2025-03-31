const { body, validationResult } = require("express-validator");

// Update-User validation
exports.updateUser = [
  body("username").optional().isLength({ min: 3 }).withMessage("Username too short"),
  body("profile_pic").optional().isURL().withMessage("Invalid profile picture URL"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];


// Signup validation
exports.signup = [
  body("username").isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("profile_pic").optional().isURL().withMessage("Invalid profile picture URL"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

// Login validation
exports.login = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];