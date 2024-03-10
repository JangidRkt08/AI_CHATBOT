import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token.js";
export const getAllUsers = async (req, res, next) => {
    //get all users from database
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log("error");
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//USER SIGNUP
export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).send("user already registered");
        //hashing the password
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        const users = await User.find();
        return res.status(201).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        console.log("error");
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//USER LOGIN
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("user not registered");
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        // SETTING UP JWT TOKEN //
        const token = createToken(user._id.toString(), user.email, "7d");
        //CREATING COOKIE POLICY //
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res
            .status(200)
            .json({ message: "user logged in succesfully", id: user._id.toString() });
    }
    catch (error) {
        console.log("error");
        return res.status(201).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map