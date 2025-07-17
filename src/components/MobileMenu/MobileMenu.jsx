import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { selectMobileMenuIsOpen } from "../../redux/campers/selectors";
import { closeMobileMenu } from "../../redux/campers/slice";
import { CgClose } from "react-icons/cg";
import NavList from "../NavList/NavList";
import clsx from "clsx";
import css from "./MobileMenu.module.css";

const MobileMenu = () => {
  const dispatch = useDispatch();
  const MobileMenuOpen = useSelector(selectMobileMenuIsOpen);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(closeMobileMenu());
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    if (MobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [dispatch, MobileMenuOpen]);

  return createPortal(
    <div
      className={clsx(css.backdrop, MobileMenuOpen && css.menuIsOpen)}
      onClick={() => dispatch(closeMobileMenu())}
    >
      <div className={css.menu} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={() => dispatch(closeMobileMenu())}
        >
          <CgClose className={css.closeIcon} />
        </button>
        <div className={css.modalContainer}>
          <NavList />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MobileMenu;
