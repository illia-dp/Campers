import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  selectError,
  selectIsLoading,
  selectPage,
  selectSearchParams,
} from "../../redux/campers/selectors";
import { setSearchParams } from "../../redux/campers/slice";
import { getCampers } from "../../redux/campers/operations";
import SearchFilters from "../../components/SearchFilters/SearchFilters";
import FiltersButton from "../../components/FiltersButton/FiltersButton";
import CampersList from "../../components/CampersList/CampersList";
import SearchMenu from "../../components/SearchMenu/SearchMenu";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const [searchParamsUrl, setSearchParamsUrl] = useSearchParams();

  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const page = useSelector(selectPage);
  const searchParams = useSelector(selectSearchParams);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const getParam = (key) => {
      const value = searchParamsUrl.get(key);
      return value ? (key === "equipment" ? value.split("-") : value) : "";
    };

    const location = getParam("location");
    const equipment = getParam("equipment", []);
    const form = getParam("form");
    const transmission = getParam("transmission");
    const engine = getParam("engine");

    dispatch(
      setSearchParams({ location, equipment, form, transmission, engine })
    );
    setInitialized(true);
  }, [dispatch, searchParamsUrl]);

  useEffect(() => {
    if (initialized) dispatch(getCampers({ page, limit: 4, searchParams }));
  }, [dispatch, page, searchParams, initialized]);

  return (
    <div>
      <Container>
        <Section>
          {loading && <Loader />}

          <div className={css.contentWrapper}>
            <div className={css.filtes}>
              <SearchFilters setSearchParamsUrl={setSearchParamsUrl} />
            </div>

            {error ? <Error /> : <CampersList />}
            <FiltersButton />
          </div>
        </Section>
      </Container>
      <SearchMenu setSearchParamsUrl={setSearchParamsUrl} />
    </div>
  );
};

export default CatalogPage;
