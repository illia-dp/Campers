import { useDispatch, useSelector } from "react-redux";
import { openFiltersMenu, setPage } from "../../redux/campers/slice";
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
      <ul className={css.list}>
        <Button
          className={css.filterBtn}
          style="more"
          onClick={() => dispatch(openFiltersMenu())}
          aria-label="button to open filter menu"
        >
          Filters
        </Button>
        {campers.length !== 0 &&
          campers.map((camper) => (
            <CampersListItem key={camper.id} camper={camper} />
          ))}
      </ul>

      {totalPages > 0 && page !== totalPages && (
        <Button
          className={css.loadMore}
          style="more"
          onClick={handleLoadMore}
          aria-label="Load more campers"
        >
          Load more
        </Button>
      )}
    </div>
  );
}

export default CampersList;
