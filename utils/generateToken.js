import jwt from "jsonwebtoken";

const genarateToken = (userId) => {
    return jwt.sign(
        {
            userId
        },
        process.env.JWT_SECRET,{
            expiresIn: '1D'
        }

    )
}

export default genarateToken;