import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectError,
  selectIsLoading,
  selectPage,
  selectSearchParams,
} from "../../redux/campers/selectors";
import { getCampers } from "../../redux/campers/operations";
import SearchFilters from "../../components/SearchFilters/SearchFilters";
import CampersList from "../../components/CampersList/CampersList";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import css from "./CatalogPage.module.css";
import FiltersButton from "../../components/FiltersButton/FiltersButton";

const CatalogPage = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const page = useSelector(selectPage);
  const searchParams = useSelector(selectSearchParams);

  useEffect(() => {
    dispatch(getCampers({ page, limit: 4, searchParams }));
  }, [dispatch, page, searchParams]);

  return (
    <Container>
      <Section>
        {loading && <Loader />}

        <div className={css.contentWrapper}>
          <div className={css.filtes}>
            <SearchFilters />
          </div>

          {error ? <Error /> : <CampersList />}
          <FiltersButton />
        </div>
      </Section>
    </Container>
  );
};

export default CatalogPage;
