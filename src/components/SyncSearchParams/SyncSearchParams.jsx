import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectSearchParams } from "../../redux/campers/selectors";

const SyncSearchParams = () => {
  const { setFieldValue } = useFormikContext();
  const searchParams = useSelector(selectSearchParams);

  useEffect(() => {
    if (searchParams.location === "") {
      setFieldValue("location", "");
    }

    if (searchParams.equipment.length === 0) {
      setFieldValue("equipment", []);
    }

    if (searchParams.form === "") {
      setFieldValue("form", "");
    }
  }, [searchParams, setFieldValue]);

  return null;
};

export default SyncSearchParams;
