const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/login");
const admin= require('../Model/addAdmin')
require("dotenv").config();

const signup = async (req, res) => {
  const {
    name,
    email,
    contact,
    password,
    designation,
    } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" }); // Return after response
    }

    const data = await admin.findOne({ email });
    if (!data) {
      return res.status(400).json({ message: "admin not found" }); 
    }

    const hashedPassword = await bcrypt.hash(password, 12);

   

    const newUser = new User({
        name,
        email,
        contact,
        password:hashedPassword,
        designation,
    });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully" }); // Return the success response
  } catch (error) {
    return res.status(500).json({ message: "Server error", error }); // Return after error response
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let token;
      token = jwt.sign(
        { userId: user._id, email: user.email, designation: user.designation },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { signup, login };
