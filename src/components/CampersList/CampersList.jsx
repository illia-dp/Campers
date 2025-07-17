import { useDispatch, useSelector } from "react-redux";
import { openFiltersMenu, setPage } from "../../redux/campers/slice";
import {
  selectCampers,
  selectPage,
  selectTotalPages,
} from "../../redux/campers/selectors";
import CampersListItem from "../CampersListItem/CampersListItem";
import Button from "../Button/Button";
import SearchMenu from "../SearchMenu/SearchMenu";
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
        <Button
          className={css.filterBtn}
          style="more"
          onClick={() => dispatch(openFiltersMenu())}
        >
          Filters
        </Button>
        {campers.length !== 0 &&
          campers.map((camper) => (
            <CampersListItem key={camper.id} camper={camper} />
          ))}
      </div>

      {totalPages > 0 && page !== totalPages && (
        <Button className={css.loadMore} style="more" onClick={handleLoadMore}>
          Load more
        </Button>
      )}

      <SearchMenu />
    </div>
  );
}

export default CampersList;
