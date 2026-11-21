import * as yup from "yup";
import { HandleERROR } from "vanta-api";

const registerSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required("username is required")
    .max(50, "username cannot exceed 50 characters"),

  email: yup
    .string()
    .trim()
    .required("email is required")
    .email("invalid email format"),

  password: yup
    .string()
    .required("password is required")
    .min(8, "password must be at least 8 characters long")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  role: yup
    .string()
    .oneOf(["user", "admin"], "role must be user or admin")
    .default("user"),
});

const loginSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required("username or email is required"),

  password: yup
    .string()
    .required("password is required"),
});

export const validateRegister = async (req, res, next) => {
  try {
    req.body = await registerSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    next();
  } catch (error) {
    return next(new HandleERROR(error.errors.join(" | "), 400));
  }
};

export const validateLogin = async (req, res, next) => {
  try {
    req.body = await loginSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    next();
  } catch (error) {
    return next(new HandleERROR(error.errors.join(" | "), 400));
  }
};