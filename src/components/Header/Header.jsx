import { Link, NavLink } from "react-router-dom";
import Container from "../Container/Container";
import sprite from "../../assets/sprite.svg";
import css from "./Header.module.css";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const addActive = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Header = () => {
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
    <header className={`${css.header} ${isScrollingDown ? css.hidden : ""}`}>
      <Container>
        <div className={css.headerContent}>
          <Link className={css.logoLink} to="/" aria-label="link to home">
            <svg width="136" height="15">
              <use xlinkHref={`${sprite}#icon-Logo`} />
            </svg>
          </Link>
          <div className={css.nav}>
            <NavLink className={addActive} to="/" aria-label="link to home">
              Home
            </NavLink>
            <NavLink
              className={addActive}
              to="/catalog"
              aria-label="link to catalog"
            >
              Catalog
            </NavLink>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
