import bcrypt from "bcryptjs";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
    try {
        if (!req.body || !req.body.username || !req.body.password) {
            return res.status(400).json({ message: "username and password are required" });
        }

        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "Username already taken" });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedpassword });

        res.status(201).json({
            message: "User registered successfully",
            user: { _id: user._id, username: user.username },
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        if (!req.body || !req.body.username || !req.body.password) {
            return res.status(400).json({ message: "username and password are required" });
        }

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
            user: { _id: user._id, username: user.username },
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};
