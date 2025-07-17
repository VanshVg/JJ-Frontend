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
