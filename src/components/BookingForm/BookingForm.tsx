import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { useId } from "react";
import { validationBookingSchema } from "../../validation/validation";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import Button from "../Button/Button";
import toast from "react-hot-toast";
import clsx from "clsx";
import css from "./BookingForm.module.css";

interface BookingFormValues {
  name: string;
  email: string;
  date: string;
  comment: string;
}

const BookingForm: React.FC = () => {
  const dateId = useId();

  const initialValues: BookingFormValues = {
    name: "",
    email: "",
    date: "",
    comment: "",
  };

  const handleSubmit = (
    values: BookingFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      toast.success(`Camper booked on ${values.date}!`);
      resetForm();
    } catch {
      toast.error("Something went wrong, try again later...");
    }
  };
  return (
    <>
      <h2 className={css.title}>Book your campervan now</h2>
      <p className={css.subtitile}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik<BookingFormValues>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationBookingSchema}
      >
        <Form className={css.form}>
          <div className={css.inputWrapper}>
            <Field
              className={css.input}
              type="text"
              name="name"
              placeholder="Name *"
              autoComplete="name"
            />
            <ErrorMessage className={css.error} name="name" component="div" />
          </div>
          <div className={css.inputWrapper}>
            <Field
              className={css.input}
              type="text"
              name="email"
              placeholder="Email *"
              autoComplete="email"
            ></Field>
            <ErrorMessage className={css.error} name="email" component="div" />
          </div>
          <div className={css.inputWrapper}>
            <Field className={`${css.input} ${css.date}`} name="date">
              {({ field, form }: FieldProps) => (
                <CustomDatePicker
                  className={clsx(css.input)}
                  field={field}
                  form={form}
                  id={dateId}
                />
              )}
            </Field>
            <ErrorMessage className={css.error} name="date" component="div" />
          </div>

          <div className={css.inputWrapper}>
            <Field
              className={`${css.textarea} ${css.input} `}
              as="textarea"
              cols="20"
              rows="5"
              name="comment"
              placeholder="Comment"
            />
            <ErrorMessage
              className={css.error}
              name="comment"
              component="div"
            />
          </div>

          <Button
            className={css.button}
            type="submit"
            style="confirm"
            aria-label="submit booking form"
          >
            Send
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default BookingForm;
