import jwt from "jsonwebtoken";
import { hashSync, compareSync } from "bcrypt";
import userModel from "../model/userModel.js";

const getAllUsers = async (req, res) => {
  try {
    const userDetails = await userModel.find();
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error Fetching User:", error);
    res.status(500).json({ error: error.message });
  }
};

const signUp = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ emailId: req.body.emailId });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const newUser = new userModel(req.body);
    const token = jwt.sign(
      { email: req.body.emailId, username: req.body.username },
      process.env.SECRET,
      {
        expiresIn: "2h",
      }
    );
    const hash = hashSync(req.body.password, 10);
    newUser.token = token;
    newUser.password = hash;
    const data = await newUser.save();
    res.status(201).json({ message: "Signup Successful", token, data });
    // 201 means creation successfull
  } catch (err) {
    console.error("Error Creating User:", err);
    res.status(500).json({ error: err.message });
    // 500 means there's an unexpected issue on the server side preventing the user creation process from completing successfully
  }
};

const logIn = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await userModel.findOne({ emailId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.emailId, username: user.username },
      process.env.SECRET,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;
    const data = await user.save();
    res.status(200).json({ message: "Login Successful", token, data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export { signUp, logIn, getAllUsers };
