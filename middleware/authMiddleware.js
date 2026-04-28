import jwt from "jsonwebtoken";

const authmiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json(
            {
                message: "No token provided, Unauthorized"
            });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json(
            {
                message: "Invalid token"
            });
    }
}

export default authmiddleware;