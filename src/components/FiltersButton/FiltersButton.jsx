import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { openFiltersMenu } from "../../redux/campers/slice";
import Button from "../Button/Button";
import css from "./FiltersButton.module.css";

const FiltersButton = () => {
  const dispatch = useDispatch();

  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const prevScrollY = useRef(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > prevScrollY.current && currentScrollY > 100) {
      setIsScrollingDown(true);
    } else if (currentScrollY < prevScrollY.current) {
      setIsScrollingDown(false);
    }

    prevScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={css.buttonWrapper}>
      <Button
        className={`${css.filterBtn} ${isScrollingDown ? css.hidden : ""}`}
        onClick={() => dispatch(openFiltersMenu())}
      >
        Filters
      </Button>
    </div>
  );
};

export default FiltersButton;
