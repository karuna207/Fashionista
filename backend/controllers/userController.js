import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({email});

    if (!user) {
      res.json({ success: false, message: "user not found" });
    }

    // hashedPassword=bcrypt.
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

//Route for user registration

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checks email exist or not
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "user Already exists" });
    }
    //validating email and password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a Strong Password",
      });
    }

    //hashing user password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    }); //creating a new record in usermodel

    const user = await newUser.save();
    //saving the record in database
    //_id is created in default

    const token = createToken(user._id);
    //token creation

    res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

//route for admin Login
const adminLogin = async (req, res) => {};
export { loginUser, registerUser, adminLogin };
