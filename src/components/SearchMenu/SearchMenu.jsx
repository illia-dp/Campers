import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { selectIsFiltersMenuOpen } from "../../redux/campers/selectors";
import { closeFiltersMenu } from "../../redux/campers/slice";
import { CgClose } from "react-icons/cg";
import SearchFilters from "../SearchFilters/SearchFilters";
import clsx from "clsx";
import css from "./SearchMenu.module.css";

const SearchModal = ({ setSearchParamsUrl }) => {
  const dispatch = useDispatch();
  const filtersMenuOpen = useSelector(selectIsFiltersMenuOpen);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(closeFiltersMenu());
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    if (filtersMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [dispatch, filtersMenuOpen]);

  return createPortal(
    <div
      className={clsx(css.backdrop, filtersMenuOpen && css.menuIsOpen)}
      onClick={() => dispatch(closeFiltersMenu())}
    >
      <div className={css.menu} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeButton}
          aria-label="Close search menu"
          onClick={() => dispatch(closeFiltersMenu())}
        >
          <CgClose className={css.closeIcon} />
        </button>
        <div className={css.modalContainer}>
          <SearchFilters setSearchParamsUrl={setSearchParamsUrl} />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SearchModal;
