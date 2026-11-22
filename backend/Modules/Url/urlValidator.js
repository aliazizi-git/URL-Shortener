import * as yup from "yup";
import { HandleERROR } from "vanta-api";

const createUrlSchema = yup.object({
  originalUrl: yup
    .string()
    .trim()
    .required("originalUrl is required")
    .url("invalid URL format (must be a valid link like https://example.com)"),

  shortCode: yup
    .string()
    .trim()
    .nullable()
    .notRequired()
    .min(3, "custom short code must be at least 3 characters")
    .max(30, "custom short code cannot exceed 30 characters")
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      "custom short code can only contain letters, numbers, dashes, and underscores"
    ),
});

const updateUrlSchema = yup.object({
  originalUrl: yup
    .string()
    .trim()
    .required("originalUrl is required")
    .url("invalid URL format (must be a valid link like https://example.com)"),
});

export const validateCreateUrl = async (req, res, next) => {
  try {
    req.body = await createUrlSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    next();
  } catch (error) {
    return next(new HandleERROR(error.errors.join(" | "), 400));
  }
};

export const validateUpdateUrl = async (req, res, next) => {
  try {
    req.body = await updateUrlSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    next();
  } catch (error) {
    return next(new HandleERROR(error.errors.join(" | "), 400));
  }
};