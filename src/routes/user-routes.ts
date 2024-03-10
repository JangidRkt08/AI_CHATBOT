// import { Router } from "express";
// import { getAllUsers, userLogin, userSignup } from "../controllers/user-controllers.js";
// import  Validate, {loginValidate } from "../utils/validators.js";

// const userRoutes = Router();

// userRoutes.get("/", getAllUsers);
// userRoutes.post("/signup", Validate, userSignup);
// userRoutes.post("/login", loginValidate, userLogin);

// export default userRoutes;
import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  userSignup,
} from "../controllers/user-controllers.js";
import Validate, { loginValidate } from "../utils/validators.js"; // Corrected import

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", Validate, userSignup); // Using Validate middleware for signup route
userRoutes.post("/login", loginValidate, userLogin); // Using loginValidate middleware for login route

export default userRoutes;
