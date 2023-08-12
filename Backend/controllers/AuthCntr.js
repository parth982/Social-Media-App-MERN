import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateJwt from "../config/generateJwt.js";

// Register User
const register = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      picPath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const HashedPswd = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: HashedPswd,
      picPath,
      friends,
      location,
      occupation,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Loggin User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const pswdMatch = await bcrypt.compare(password, user.password);
    if (!pswdMatch)
      return res.status(400).json({ msg: "Invalid credentials. " });

    const token = generateJwt(user._id);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { register, login };
