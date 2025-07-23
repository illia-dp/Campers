import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { FieldInputProps, FormikProps } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-overrides.css";

interface CustomDatePickerProps
  extends Partial<ReactDatePickerCustomHeaderProps> {
  className?: string;
  field?: FieldInputProps<string>;
  form?: FormikProps<any>;
  selectedDate?: Date | null;
  onChange?: (date: Date | null) => void;
  id?: string;
}

const CustomDatePicker = ({
  className,
  field,
  form,
  selectedDate,
  onChange,
  ...rest
}: CustomDatePickerProps) => {
  const isFormik = !!field && !!form;

  const selected = isFormik
    ? field.value
      ? new Date(`${field.value}T12:00:00`)
      : null
    : selectedDate;

  const handleChange = (date: Date | null) => {
    if (isFormik) {
      form.setFieldValue(
        field.name,
        date ? date.toISOString().split("T")[0] : ""
      );
    } else {
      onChange?.(date);
    }
  };

  return (
    <DatePicker
      className={className}
      selected={selected}
      onChange={handleChange}
      dateFormat="MM-dd-yyyy"
      placeholderText="Booking date*"
      onFocus={(e) => e.target.blur()}
      {...rest}
    />
  );
};
export default CustomDatePicker;
