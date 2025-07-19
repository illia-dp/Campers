import { NavLink, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectCamperInfo } from "../../redux/campers/selectors";
import { getCamperInfo } from "../../redux/campers/operations";
import Container from "../Container/Container";
import Section from "../Section/Section";
import sprite from "../../assets/sprite.svg";
import clsx from "clsx";
import css from "./CamperDetails.module.css";

const addActive = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const CamperDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const camper = useSelector(selectCamperInfo);

  useEffect(() => {
    dispatch(getCamperInfo(id));
  }, [dispatch, id]);

  if (!camper || !camper.reviews) {
    return null;
  }

  return (
    <Container>
      <Section>
        <div className={css.contentWrapper}>
          <h2 className={css.camperName}>{camper.name}</h2>

          <div className={css.ratingLocation}>
            <div className={css.rating}>
              <svg width="16" height="16">
                <use className={css.icon} xlinkHref={`${sprite}#icon-star`} />
              </svg>
              <div className={css.ratingText}>
                {(() => {
                  const averageRating =
                    camper.reviews.reduce(
                      (sum, review) => sum + review.reviewer_rating,
                      0
                    ) / camper.reviews.length;

                  return averageRating % 1 === 0
                    ? averageRating.toFixed(0)
                    : averageRating.toFixed(1);
                })()}
                {""}({camper.reviews.length} Reviews)
              </div>
            </div>

            <div className={css.location}>
              <svg width="16" height="16">
                <use xlinkHref={`${sprite}#icon-map`} />
              </svg>
              <div className={css.locationText}>{camper.location}</div>
            </div>
          </div>

          <p className={css.priceSum}>€{camper.price.toFixed(2)}</p>

          <ul className={css.photosList}>
            {camper.gallery.map((photo, index) => (
              <li key={index}>
                <div className={css.imageThumb}>
                  <img
                    className={css.image}
                    src={photo.thumb}
                    alt={camper.name}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className={css.description}>{camper.description}</div>
        </div>

        <div className={css.links}>
          <NavLink
            className={addActive}
            to={"features"}
            aria-label="To features page"
          >
            Features
          </NavLink>
          <NavLink
            className={addActive}
            to={"reviews"}
            aria-label="To reviews page"
          >
            Reviews
          </NavLink>
        </div>
        <Outlet />
      </Section>
    </Container>
  );
};

export default CamperDetails;
