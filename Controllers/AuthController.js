const { UsersModel } = require("../model/UsersModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    if (!email || !password || !username || !createdAt) {
      return res.json({ message: "All fields are required" });
    }
    const existingUser = await UsersModel.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await UsersModel.create({
      email,
      password,
      username,
      createdAt,
    });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      // withCredentials: true,
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

//login
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await UsersModel.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password" });
    }
    const token = createSecretToken(user._id);
    // res.cookie("token", token, {
    //   // withCredentials: true,
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "None",
    //   maxAge: 1000 * 60 * 60 * 24,
    // });
    // res
    //   .status(201)
    //   .json({ message: "User logged in successfully", success: true });
    res.status(200).json({
      message: "Logged in successfully",
      token: createSecretToken(user._id),
      success: true
    });
    next();
  } catch (error) {
    console.error(error);
  }
};
