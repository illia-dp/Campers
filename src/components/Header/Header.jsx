import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { openMobileMenu } from "../../redux/campers/slice";
import MobileMenu from "../MobileMenu/MobileMenu";
import Container from "../Container/Container";
import NavList from "../NavList/NavList";
import sprite from "../../assets/sprite.svg";
import css from "./Header.module.css";

const Header = () => {
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
    <header className={`${css.header} ${isScrollingDown ? css.hidden : ""}`}>
      <Container>
        <div className={css.headerContent}>
          <Link className={css.logoLink} to="/" aria-label="Link to home">
            <svg width="136" height="15">
              <use xlinkHref={`${sprite}#icon-Logo`} />
            </svg>
          </Link>
          <div className={css.nav}>
            <NavList />
          </div>

          <button
            className={css.mobileMenuBtn}
            onClick={() => dispatch(openMobileMenu())}
            aria-label="Open mobile menu"
          >
            <GiHamburgerMenu className={css.icon} />
          </button>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
};

export default Header;
