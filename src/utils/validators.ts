// import { NextFunction, Request, Response } from "express";
// import { body, ValidationChain, validationResult } from "express-validator";

// export const validate = (validations: ValidationChain[]) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     for (let validation of validations) {
//       const errors = await validation.run(req);
//       if (errors.isEmpty()) {
//         break;
//       }
//     }
//     const errors = validationResult(req);
//     if (errors.isEmpty()) {
//       return next();
//     }
//     return res.status(422).json({ errors });
//   };
// };

// export const signUpValidator = [
//   body("name").notEmpty().withMessage("name is required"),
//   body("email").trim().isEmail().withMessage("Email is required"),
//   body("password")
//     .trim()
//     .isLength({ min: 6 })
//     .withMessage("password should contain min 6 characters"),
// ];

import { NextFunction, Request, Response } from "express";
import { z } from "zod";

// Define loginSchema for request body
const loginSchema = z.object({
  // name: z.string().min(1, "name is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(6, "password should contain min 6 characters"),
});


// Define signUpSchema for request body
const signUpSchema = z.object({
  name: z.string().min(1, "name is required"),
  
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(6, "password should contain min 6 characters"),
},
  );

// Middleware function to validate request body using Zod schema
 const validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request body against schema
    const validatedData = signUpSchema.parse(req.body);
    req.body = validatedData; // Attach validated data to request object
    return next(); // Proceed to next middleware if validation passes
  } catch (error) {
    // Handle validation errors
    return res.status(422).json({ errors: error.errors });
  }
 };


 export const loginValidate = async (req: Request, res: Response, next: NextFunction) => {
   try {
     // Validate request body against schema
     const validatedData = loginSchema.parse(req.body);
     req.body = validatedData; // Attach validated data to request object
     return next(); // Proceed to next middleware if validation passes
   } catch (error) {
     // Handle validation errors
     return res.status(422).json({ errors: error.errors });
   }
 };


export default validate;
