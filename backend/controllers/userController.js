const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register User
exports.registerUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Validation
    if (!email || !username || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    //Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "User with this username already exists" });
    }

    const newUser = await new User({
      email,
      username,
      password,
    });

    const savedResponse = await newUser.save();
    const savedUser = await User.findById(savedResponse._id).select("-password -_id");

    res.status(201).json({ message: "User created successfully", savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    // Validate input
    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ message: "Email/Username and Password are required" });
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [
        { email: emailOrUsername.toLowerCase() },
        { username: emailOrUsername.toLowerCase() },
      ],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create and sign JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Create user
    const loggedUser = {
      username: user.username,
      email: user.email
    };
    
    res.status(200).json({ message: "Login successfully", token, loggedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
