const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY || "YOUR_SECRET";

// Login Token Generate

const generateToken = (data) => {
    return jwt.sign(data, jwtSecretKey, { expiresIn: "720h" });
};

// Forgot Password Token Generate

const generateTokenForgotPassword = (id) => {
    const data = {
        id: id,
        data: crypto.randomBytes(10).toString('hex'),
    }
    return jwt.sign(data, jwtSecretKey, { expiresIn: '15m' });
};

const authService = {
    generateToken,
    generateTokenForgotPassword,
};

module.exports = { authService };
