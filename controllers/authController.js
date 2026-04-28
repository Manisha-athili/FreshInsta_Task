import bcrypt from "bcryptjs";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js"

export const register = async (req, res) => {
    const { username, password } = req.body;

    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedpassword });

    res.status(201).json({
        message: "User registered successfully",
        user: user,
        token: generateToken(user._id)
    });
}


export const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
        message: "Login successful",
        user: user,
        token: generateToken(user._id)
    });
}

