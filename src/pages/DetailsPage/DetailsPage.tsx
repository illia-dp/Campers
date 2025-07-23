import { NavLink, Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCamperInfo } from "../../redux/campers/selectors";
import { getCamperInfo } from "../../redux/campers/operations";
import { Camper } from "../../redux/campers/campers.types";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import sprite from "../../assets/sprite.svg";
import clsx from "clsx";
import css from "./DetailsPage.module.css";
import BookingForm from "../../components/BookingForm/BookingForm";

const addActive = ({ isActive }: { isActive: boolean }) => {
  return clsx(css.link, isActive && css.active);
};

const DetailsPage = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const camper = useAppSelector(selectCamperInfo) as Camper | null;

  useEffect(() => {
    if (id) {
      dispatch(getCamperInfo(id));
    }
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

        <div className={css.wrapper}>
          <Outlet />
          <div className={css.form}>
            <BookingForm />
          </div>
        </div>
      </Section>
    </Container>
  );
};

export default DetailsPage;
