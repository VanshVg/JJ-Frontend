import * as Yup from "yup";

const contactRegex = /^[6-9]\d{9}$/;

export const passwordValidation = Yup.string()
  .required("Password is required")
  .min(6, "Minimum 6-digit password needed")
  .matches(
    /(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
    "Include at least one uppercase letter, special character, and digit in your password"
  );

export const contactNoValidation = Yup.string()
  .matches(contactRegex, "Phone number is not valid")
  .required("Phone number is required");

export const nameValidation = Yup.string().matches(
  /^[a-zA-Z0-9]+$/,
  "Must be alphanumeric"
);
