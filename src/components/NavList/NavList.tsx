import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectMobileMenuIsOpen } from "../../redux/campers/selectors";
import { closeMobileMenu } from "../../redux/campers/slice";
import clsx from "clsx";
import css from "./NavList.module.css";

const addActive = ({ isActive }: { isActive: boolean }) => {
  return clsx(css.link, isActive && css.active);
};

const NavList = () => {
  const dispatch = useAppDispatch();
  const MobileMenuIsOpen = useAppSelector(selectMobileMenuIsOpen);

  const handleClick = () => {
    if (MobileMenuIsOpen) dispatch(closeMobileMenu());
  };

  return (
    <div className={css.nav}>
      <NavLink
        className={addActive}
        to="/"
        aria-label="Link to home"
        onClick={handleClick}
      >
        Home
      </NavLink>
      <NavLink
        className={addActive}
        to="/catalog"
        aria-label="Link to catalog"
        onClick={handleClick}
      >
        Catalog
      </NavLink>
    </div>
  );
};

export default NavList;
