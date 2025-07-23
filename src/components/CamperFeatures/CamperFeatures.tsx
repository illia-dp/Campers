import { selectCamperInfo } from "../../redux/campers/selectors";
import { useAppSelector } from "../../redux/hooks";
import VehicleDetails from "../VehicleDetails/VehicleDetails";
import CamperParams from "../CamperParams/CamperParams";
import BookingForm from "../BookingForm/BookingForm";
import css from "./CamperFeatures.module.css";

const CamperFeatures = () => {
  const camper = useAppSelector(selectCamperInfo);

  return (
    <div className={css.features}>
      <div className={css.paramsWrapper}>
        <CamperParams camper={camper} />
      </div>

      <VehicleDetails />
    </div>
  );
};

export default CamperFeatures;
