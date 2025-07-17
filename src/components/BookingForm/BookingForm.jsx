import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import { validationBookingSchema } from "../../validation/validation";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import Button from "../Button/Button";
import toast from "react-hot-toast";
import clsx from "clsx";
import css from "./BookingForm.module.css";

const BookingForm = () => {
  const dateId = useId();

  const handleSubmit = (values, { resetForm }) => {
    try {
      toast.success(`Camper bookeg on ${values.date}!`);
      resetForm();
    } catch {
      toast.error("Something went wrong, try again later...");
    }
  };
  return (
    <div>
      <h2 className={css.title}>Book your campervan now</h2>
      <p className={css.subtitile}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={{
          name: "",
          email: "",
          date: "",
          comment: "",
        }}
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
            />
            <ErrorMessage className={css.error} name="email" component="div" />
          </div>
          <div className={css.inputWrapper}>
            <Field className={`${css.input} ${css.date}`} name="date">
              {({ field, form }) => (
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

          <Button className={css.button} type="submit" style="confirm">
            Send
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default BookingForm;
