import jwt from "jsonwebtoken";

export const generateToken = async(id) => {
    const token = jwt.sign({ id }, "process.env.JWT_SECRET,", { expiresIn: "30d" });
    res.cookie("jwt", token, {
        httpOnly: true,
        
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
};