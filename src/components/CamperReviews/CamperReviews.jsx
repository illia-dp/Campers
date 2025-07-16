import { useSelector } from "react-redux";
import { selectCamperInfo } from "../../redux/campers/selectors";
import BookingForm from "../BookingForm/BookingForm";
import sprite from "../../assets/sprite.svg";
import clsx from "clsx";
import css from "./CamperReviews.module.css";

const CamperReviews = () => {
  const camper = useSelector(selectCamperInfo);

  return (
    <div className={css.wrapper}>
      <div className={css.reviews}>
        <ul>
          {camper.reviews.map((review, index) => (
            <li className={css.review} key={index}>
              <div className={css.user}>
                <div className={css.userLogo}>
                  {review.reviewer_name.charAt(0)}
                </div>
                <div className={css.userInfo}>
                  <p className={css.userName}>{review.reviewer_name}</p>

                  <ul className={css.ratingStars}>
                    {Array.from({ length: 5 }, (_, index) => (
                      <li key={index}>
                        <svg width="16" height="16">
                          <use
                            className={clsx(
                              css.star,
                              index < review.reviewer_rating
                                ? css.filled
                                : css.empty
                            )}
                            xlinkHref={`${sprite}#icon-star`}
                          />
                        </svg>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className={css.comment}>{review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={css.form}>
        <BookingForm />
      </div>
    </div>
  );
};

export default CamperReviews;
