import { Field } from "formik";
import { FaChevronDown } from "react-icons/fa";
import { FilterName } from "../SearchFilters/SearchFilters.types";
import sprite from "../../assets/sprite.svg";
import clsx from "clsx";
import css from "../SearchFilters/SearchFilters.module.css";

interface Option {
  value: string;
  label: string;
  icon: string;
}

interface SearchFilterItemProps {
  label: string;
  options: Option[];
  filterName: FilterName;
  openFilters: Record<FilterName, boolean>;
  toggleFilter: (filterName: FilterName) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  values: Record<string, any>;
  isCheckbox?: boolean;
}

const SearchFilterItem = ({
  label,
  options,
  filterName,
  openFilters,
  toggleFilter,
  setFieldValue,
  values,
  isCheckbox = false,
}: SearchFilterItemProps) => {
  return (
    <>
      <div className={css.label} onClick={() => toggleFilter(filterName)}>
        {label}
        <button type="button" className={css.toggleButton}>
          <FaChevronDown
            className={clsx(css.arrow, {
              [css.open]: openFilters[filterName],
            })}
          />
        </button>
      </div>
      <ul
        className={clsx(css.equipmentList, {
          [css.open]: openFilters[filterName],
        })}
      >
        {options.map((option) => (
          <li key={option.value} className={css.customCheckbox}>
            <Field
              className={css.checkbox}
              type={isCheckbox ? "checkbox" : "radio"}
              name={filterName}
              value={option.value}
              checked={
                isCheckbox
                  ? values[filterName].includes(option.value)
                  : values[filterName] === option.value
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                if (isCheckbox) {
                  if (e.target.checked) {
                    setFieldValue(filterName, [...values[filterName], value]);
                  } else {
                    setFieldValue(
                      filterName,
                      values[filterName].filter(
                        (item: string) => item !== value
                      )
                    );
                  }
                } else {
                  setFieldValue(
                    filterName,
                    value === values[filterName] ? "" : value
                  );
                }
              }}
            />
            <div
              className={css.checkboxBtn}
              onClick={() => {
                const isChecked = isCheckbox
                  ? values[filterName].includes(option.value)
                  : values[filterName] === option.value;
                if (isChecked) {
                  setFieldValue(
                    filterName,
                    isCheckbox
                      ? values[filterName].filter(
                          (item: string) => item !== option.value
                        )
                      : ""
                  );
                } else {
                  setFieldValue(
                    filterName,
                    isCheckbox
                      ? [...values[filterName], option.value]
                      : option.value
                  );
                }
              }}
            >
              <svg width="32" height="32">
                <use xlinkHref={`${sprite}#${option.icon}`} />
              </svg>
              <p className={css.parametrName}>{option.label}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchFilterItem;
