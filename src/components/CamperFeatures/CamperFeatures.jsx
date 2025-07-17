import { useSelector } from "react-redux";
import { selectCamperInfo } from "../../redux/campers/selectors";
import VehicleDetails from "../VehicleDetails/VehicleDetails";
import CamperParams from "../CamperParams/CamperParams";
import BookingForm from "../BookingForm/BookingForm";
import css from "./CamperFeatures.module.css";

const CamperFeatures = () => {
  const camper = useSelector(selectCamperInfo);

  return (
    <div className={css.wrapper}>
      <div className={css.features}>
        <div className={css.paramsWrapper}>
          <CamperParams camper={camper} />
        </div>

        <VehicleDetails />
      </div>
      <div className={css.form}>
        <BookingForm />
      </div>
    </div>
  );
};

export default CamperFeatures;
