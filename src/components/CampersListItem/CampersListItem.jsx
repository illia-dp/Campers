import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectLikedCampers } from "../../redux/campers/selectors";
import { toggleLike } from "../../redux/campers/slice";
import CamperParams from "../CamperParams/CamperParams";
import sprite from "../../assets/sprite.svg";
import Button from "../Button/Button";
import css from "./CampersListItem.module.css";

const CampersListItem = ({ camper }) => {
  const dispatch = useDispatch();
  const likedItems = useSelector(selectLikedCampers);

  const handleLikeToggle = (id) => {
    dispatch(toggleLike({ id }));
  };

  const isLiked = likedItems.includes(camper.id);

  return (
    <li className={css.item} key={camper.id}>
      <div className={css.imageThumb}>
        <img
          className={css.image}
          src={camper.gallery[0].thumb}
          alt={camper.name}
        />
      </div>

      <div className={css.information}>
        <div className={css.namePrice}>
          <h2 className={css.camperName}>{camper.name}</h2>

          <div className={css.price}>
            <p className={css.priceSum}>€{camper.price.toFixed(2)}</p>

            <button
              className={css.likeBtn}
              onClick={() => handleLikeToggle(camper.id)}
              aria-label="add camper to favourite"
            >
              <svg width="26" height="24">
                <use
                  className={`${css.likeIcon} ${isLiked ? css.liked : ""}`}
                  xlinkHref={`${sprite}#icon-heart`}
                />
              </svg>
            </button>
          </div>
        </div>

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

        <div className={css.description}>{camper.description}</div>

        <div className={css.parameters}>
          <CamperParams camper={camper} />
        </div>

        <Link to={`/catalog/${camper.id}/features`}>
          <Button
            className={css.button}
            style="confirm"
            aria-label="Details about selected camper"
          >
            Show more
          </Button>
        </Link>
      </div>
    </li>
  );
};

export default CampersListItem;
