import { useSelector } from "react-redux";
import { selectCamperInfo } from "../../redux/campers/selectors";
import css from "./VehicleDetails.module.css";

const VehicleDetails = () => {
  const camper = useSelector(selectCamperInfo);

  return (
    <div className={css.details}>
      <div className={css.title}>Vehicle details</div>
      <ul className={css.detailsList}>
        <li className={css.detailsItem}>
          <p>Form</p>
          <p>{camper.form.charAt(0).toUpperCase() + camper.form.slice(1)}</p>
        </li>
        <li className={css.detailsItem}>
          <p>Length</p>
          <p>{camper.length.slice(0, -1) + " " + camper.length.slice(-1)}</p>
        </li>
        <li className={css.detailsItem}>
          <p>Width</p>
          <p>{camper.width.slice(0, -1) + " " + camper.width.slice(-1)}</p>
        </li>
        <li className={css.detailsItem}>
          <p>Height</p>
          <p>{camper.height.slice(0, -1) + " " + camper.height.slice(-1)}</p>
        </li>
        <li className={css.detailsItem}>
          <p>Tank</p>
          <p>{camper.tank.slice(0, -1) + " " + camper.tank.slice(-1)}</p>
        </li>
        <li className={css.detailsItem}>
          <p>Consumption</p>
          <p>{camper.consumption}</p>
        </li>
      </ul>
    </div>
  );
};

export default VehicleDetails;
