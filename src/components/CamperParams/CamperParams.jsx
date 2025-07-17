import sprite from "../../assets/sprite.svg";
import css from "./CamperParams.module.css";

const CamperParams = ({ camper }) => {
  return (
    <div className={css.parameters}>
      <div className={css.parametr}>
        <svg className={css.iconWrapper}>
          <use xlinkHref={`${sprite}#icon-transmission`} />
        </svg>
        <p className={css.parametrName}>
          {camper.transmission.charAt(0).toUpperCase() +
            camper.transmission.slice(1)}
        </p>
      </div>

      <div className={css.parametr}>
        <svg className={css.iconWrapper}>
          <use xlinkHref={`${sprite}#icon-fuel-pump`} />
        </svg>
        <p className={css.parametrName}>
          {camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1)}
        </p>
      </div>

      {camper.kitchen && (
        <div className={css.parametr}>
          <svg className={css.iconWrapper}>
            <use xlinkHref={`${sprite}#kitchen`} />
          </svg>
          <p className={css.parametrName}>Kitchen</p>
        </div>
      )}

      {camper.AC && (
        <div className={css.parametr}>
          <svg className={css.iconWrapper}>
            <use xlinkHref={`${sprite}#icon-wind`} />
          </svg>
          <p className={css.parametrName}>AC</p>
        </div>
      )}

      {camper.bathroom && (
        <div className={css.parametr}>
          <svg className={css.iconWrapper}>
            <use xlinkHref={`${sprite}#icon-ph_shower`} />
          </svg>
          <p className={css.parametrName}>Bathroom</p>
        </div>
      )}

      {camper.TV && (
        <div className={css.parametr}>
          <svg className={css.iconWrapper}>
            <use xlinkHref={`${sprite}#icon-tv`} />
          </svg>
          <p className={css.parametrName}>TV</p>
        </div>
      )}

      {camper.gas && (
        <div className={css.parametr}>
          <svg className={css.iconWrapper}>
            <use xlinkHref={`${sprite}#icon-hugeicons_gas`} />
          </svg>
          <p className={css.parametrName}>Gas</p>
        </div>
      )}

      {camper.radio && (
        <div className={css.parametr}>
          <svg className={css.iconWrapper}>
            <use xlinkHref={`${sprite}#icon-radio`} />
          </svg>
          <p className={css.parametrName}>Radio</p>
        </div>
      )}

      {camper.microwave && (
        <div className={css.parametr}>
          <svg className={css.iconWrapper}>
            <use xlinkHref={`${sprite}#icon-microwave`} />
          </svg>
          <p className={css.parametrName}>Microwave</p>
        </div>
      )}

      {camper.refrigerator && (
        <div className={css.parametr}>
          <svg className={css.iconWrapper}>
            <use xlinkHref={`${sprite}#icon-solar_fridge`} />
          </svg>
          <p className={css.parametrName}>Refrigerator</p>
        </div>
      )}

      {camper.water && (
        <div className={css.parametr}>
          <svg className={css.iconWrapper}>
            <use xlinkHref={`${sprite}#icon-ion_water`} />
          </svg>
          <p className={css.parametrName}>Water</p>
        </div>
      )}
    </div>
  );
};

export default CamperParams;
