import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchParams,
  resetPage,
  setSearchParams,
} from "../../redux/campers/slice";
import { useId } from "react";
import { selectSearchParams } from "../../redux/campers/selectors";
import SyncSearchParams from "../SyncSearchParams/SyncSearchParams";
import Button from "../Button/Button";
import sprite from "../../assets/sprite.svg";
import css from "./SearchFilters.module.css";

const SearchFilters = () => {
  const locationId = useId();
  const dispatch = useDispatch();
  const searchParams = useSelector(selectSearchParams);

  const handleSubmit = (values) => {
    dispatch(setSearchParams(values));
  };

  const handleReset = () => {
    dispatch(resetPage());
    dispatch(clearSearchParams());
  };

  const equipmentOptions = [
    { value: "kitchen", label: "Kitchen", icon: "kitchen" },
    { value: "AC", label: "AC", icon: "icon-wind" },
    { value: "bathroom", label: "Bathroom", icon: "icon-ph_shower" },
    { value: "TV", label: "TV", icon: "icon-tv" },
    { value: "gas", label: "Gas", icon: "icon-hugeicons_gas" },
    { value: "radio", label: "Radio", icon: "icon-radio" },
    { value: "microwave", label: "Microwave", icon: "icon-microwave" },
    { value: "refrigerator", label: "Refrigerator", icon: "icon-solar_fridge" },
    { value: "water", label: "Water", icon: "icon-ion_water" },
  ];

  const typeOptions = [
    { value: "panelTruck", label: "Van", icon: "icon-bi_grid" },
    {
      value: "fullyIntegrated",
      label: "Fully Integrated",
      icon: "icon-bi_grid-1x2",
    },
    { value: "alcove", label: "Alcove", icon: "icon-bi_grid-3x3-gap" },
  ];

  return (
    <div className={css.wrapper}>
      <Formik initialValues={searchParams} onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => (
          <Form>
            <SyncSearchParams />
            <div className={css.inputWrapper}>
              <label className={css.locationLabel} htmlFor={locationId}>
                Location
              </label>
              <Field
                className={css.intut}
                type="text"
                name="location"
                id={locationId}
                value={
                  values.location.charAt(0).toUpperCase() +
                  values.location.slice(1)
                }
                placeholder="Enter location"
              />
              <svg className={css.icon} width="20" height="20">
                <use xlinkHref={`${sprite}#icon-map`} />
              </svg>
            </div>

            <div className={css.title}>Filters</div>

            <div className={css.label}>Vehicle equipment</div>
            <div className={css.equipmentList}>
              {equipmentOptions.map((option) => (
                <div key={option.value} className={css.customCheckbox}>
                  <Field
                    className={css.checkbox}
                    type="checkbox"
                    name="equipment"
                    value={option.value}
                    checked={values.equipment.includes(option.value)}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        setFieldValue("equipment", [
                          ...values.equipment,
                          value,
                        ]);
                      } else {
                        setFieldValue(
                          "equipment",
                          values.equipment.filter((item) => item !== value)
                        );
                      }
                    }}
                  />
                  <div
                    className={css.checkboxBtn}
                    onClick={() => {
                      const isChecked = values.equipment.includes(option.value);
                      if (isChecked) {
                        setFieldValue(
                          "equipment",
                          values.equipment.filter(
                            (item) => item !== option.value
                          )
                        );
                      } else {
                        setFieldValue("equipment", [
                          ...values.equipment,
                          option.value,
                        ]);
                      }
                    }}
                  >
                    <svg width="32" height="32">
                      <use xlinkHref={`${sprite}#${option.icon}`} />
                    </svg>
                    <p className={css.parametrName}>{option.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={css.label}>Vehicle type</div>
            <div className={css.equipmentList}>
              {typeOptions.map((option) => (
                <div key={option.value} className={css.customCheckbox}>
                  <Field
                    className={css.checkbox}
                    type="radio"
                    name="form"
                    value={option.value}
                    checked={values.form === option.value}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFieldValue("form", values.form === value ? "" : value);
                    }}
                  />
                  <div
                    className={css.checkboxBtn}
                    onClick={() => {
                      const isChecked = values.form === option.value;
                      if (isChecked) {
                        setFieldValue("form", "");
                      } else {
                        setFieldValue("form", option.value);
                      }
                    }}
                  >
                    <svg width="32" height="32">
                      <use xlinkHref={`${sprite}#${option.icon}`} />
                    </svg>
                    <p className={css.parametrName}>{option.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={css.buttons}>
              <Button className={css.button} type="submit">
                Search
              </Button>

              <Button
                className={css.button}
                type="button"
                onClick={() => handleReset()}
              >
                Reset
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchFilters;
