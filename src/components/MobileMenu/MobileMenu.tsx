import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectMobileMenuIsOpen } from "../../redux/campers/selectors";
import { closeMobileMenu } from "../../redux/campers/slice";
import { CgClose } from "react-icons/cg";
import NavList from "../NavList/NavList";
import clsx from "clsx";
import css from "./MobileMenu.module.css";

const MobileMenu = () => {
  const dispatch = useAppDispatch();
  const mobileMenuOpen = useAppSelector(selectMobileMenuIsOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch(closeMobileMenu());
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [dispatch, mobileMenuOpen]);

  return createPortal(
    <div
      className={clsx(css.backdrop, mobileMenuOpen && css.menuIsOpen)}
      onClick={() => dispatch(closeMobileMenu())}
    >
      <div className={css.menu} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeButton}
          aria-label="Close mobile menu"
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
