import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import {
  engineOptions,
  equipmentOptions,
  transmissionOptions,
  typeOptions,
} from "../FiltersOptions/FiltersOptions";
import {
  clearSearchParams,
  closeFiltersMenu,
  resetPage,
} from "../../redux/campers/slice";
import { useId, useState } from "react";
import {
  selectIsFiltersMenuOpen,
  selectSearchParams,
} from "../../redux/campers/selectors";
import SearchFilterItem from "../SearchFilterItem/SearchFilterItem";
import SyncSearchParams from "../SyncSearchParams/SyncSearchParams";
import Button from "../Button/Button";
import sprite from "../../assets/sprite.svg";
import css from "./SearchFilters.module.css";
import clsx from "clsx";

const initialState = {
  equipment: false,
  type: false,
  transmission: false,
  engine: false,
};

const SearchFilters = ({ setSearchParamsUrl }) => {
  const [openFilters, setOpenFilters] = useState(initialState);
  const locationId = useId();
  const dispatch = useDispatch();
  const searchParams = useSelector(selectSearchParams);
  const filtersMenuOpen = useSelector(selectIsFiltersMenuOpen);

  const toggleFilter = (filterName) => {
    setOpenFilters((prevState) => ({
      ...prevState,
      [filterName]: !prevState[filterName],
    }));
  };

  const handleSubmit = (values) => {
    const newSearchParams = new URLSearchParams();

    const params = [
      { key: "location", value: values.location },
      {
        key: "equipment",
        value: values.equipment.length > 0 ? values.equipment.join("-") : null,
      },
      { key: "form", value: values.form },
      { key: "transmission", value: values.transmission },
      { key: "engine", value: values.engine },
    ];

    params.forEach(({ key, value }) => {
      if (value) newSearchParams.set(key, value);
    });

    setSearchParamsUrl(newSearchParams);
    dispatch(resetPage());
    if (filtersMenuOpen) dispatch(closeFiltersMenu());
  };

  const handleReset = () => {
    dispatch(clearSearchParams());
    dispatch(resetPage());
    setSearchParamsUrl("");
    if (filtersMenuOpen) dispatch(closeFiltersMenu());
  };

  return (
    <div className={css.wrapper}>
      <Formik initialValues={searchParams} onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => {
          const isFormEmpty = !(
            values.location ||
            values.equipment.length > 0 ||
            values.form ||
            values.transmission ||
            values.engine
          );

          return (
            <Form>
              <SyncSearchParams />
              <div className={css.inputWrapper}>
                <label className={css.locationLabel} htmlFor={locationId}>
                  Location
                </label>
                <Field
                  className={css.input}
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

              <SearchFilterItem
                label="Vehicle equipment"
                filterName="equipment"
                options={equipmentOptions}
                openFilters={openFilters}
                toggleFilter={toggleFilter}
                setFieldValue={setFieldValue}
                values={values}
                isCheckbox={true}
              />

              <SearchFilterItem
                label="Vehicle type"
                filterName="form"
                options={typeOptions}
                openFilters={openFilters}
                toggleFilter={toggleFilter}
                setFieldValue={setFieldValue}
                values={values}
              />

              <SearchFilterItem
                label="Transmission"
                filterName="transmission"
                options={transmissionOptions}
                openFilters={openFilters}
                toggleFilter={toggleFilter}
                setFieldValue={setFieldValue}
                values={values}
              />

              <SearchFilterItem
                label="Engine"
                filterName="engine"
                options={engineOptions}
                openFilters={openFilters}
                toggleFilter={toggleFilter}
                setFieldValue={setFieldValue}
                values={values}
              />

              <div className={css.buttons}>
                <Button
                  className={clsx(css.button, {
                    [css.disabled]: isFormEmpty,
                  })}
                  type="button"
                  onClick={() => {
                    if (!isFormEmpty) handleReset();
                  }}
                  aria-label="Clear filters"
                >
                  Reset
                </Button>

                <Button
                  className={clsx(css.button, {
                    [css.disabled]: isFormEmpty,
                  })}
                  type="submit"
                  aria-label="Search with selected filters"
                  disabled={isFormEmpty}
                >
                  Search
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SearchFilters;
