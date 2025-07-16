import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/campers/slice";
import {
  selectCampers,
  selectPage,
  selectTotalPages,
} from "../../redux/campers/selectors";
import CampersListItem from "../CampersListItem/CampersListItem";
import Button from "../Button/Button";
import css from "./CampersList.module.css";

function CampersList() {
  const dispatch = useDispatch();

  const totalPages = useSelector(selectTotalPages);
  const campers = useSelector(selectCampers);
  const page = useSelector(selectPage);

  const handleLoadMore = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <div className={css.wrapper}>
      <div className={css.list}>
        {campers.length !== 0 &&
          campers.map((camper) => (
            <CampersListItem key={camper.id} camper={camper} />
          ))}
      </div>

      {totalPages > 0 && page !== totalPages && (
        <Button className={css.button} style="more" onClick={handleLoadMore}>
          Load more
        </Button>
      )}
    </div>
  );
}

export default CampersList;
