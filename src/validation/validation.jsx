import * as Yup from "yup";

export const validationBookingSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .min(4, "Too short")
    .required("Email is required")
    .max(30, "Too long")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid Email"),
  date: Yup.string().required("Date is required"),
  comment: Yup.string().max(90, "Maximum 90 characters!"),
});
