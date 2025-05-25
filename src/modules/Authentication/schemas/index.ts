import * as Yup from "yup";
import {
  contactNoValidation,
  nameValidation,
  passwordValidation,
} from "../../../common/validation";

export const registerSchema = Yup.object({
  firstname: nameValidation.required("First Name is required"),
  lastname: nameValidation.required("Last Name is required"),
  contact_no: contactNoValidation,
  password: passwordValidation,
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginSchema = Yup.object({
  contact_no: contactNoValidation,
  password: Yup.string().required("Password is required"),
});

export const forgotPasswordSchema = Yup.object({
  contact_no: contactNoValidation,
});

export const resetPasswordSchema = Yup.object({
  password: passwordValidation,
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
