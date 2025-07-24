import * as Yup from "yup";
import {
  contactNoValidation,
  nameValidation,
} from "../../../../../common/validation";

export const editProfileSchema = Yup.object({
  firstname: nameValidation.required("First Name is required"),
  lastname: nameValidation.required("Last Name is required"),
  contact_no: contactNoValidation,
});

export const addAddressSchema = Yup.object({
  address_line_1: Yup.string().required("Address Line 1 is required"),
  address_line_2: Yup.string().required("Address Line 2 is required"),
  pincode: Yup.number().required("Pincode is required"),
  landmark: Yup.string()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .required("Landmark is required"),
  address_type: Yup.string().required("Address Type is required"),
});
