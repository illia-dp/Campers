import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectIsLoading, selectPage } from "../../redux/campers/selectors";
import { getCampers } from "../../redux/campers/operations";
import SearchFilters from "../../components/SearchFilters/SearchFilters";
import CampersList from "../../components/CampersList/CampersList";
import Container from "../../components/Container/Container";
import Section from "../../components/Section/Section";
import Loader from "../../components/Loader/Loader";
import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectIsLoading);
  const page = useSelector(selectPage);

  useEffect(() => {
    dispatch(getCampers({ page, limit: 4 }));
  }, [dispatch, page]);

  return (
    <Container>
      <Section>
        {loading && <Loader />}
        <div className={css.contentWrapper}>
          <SearchFilters />
          <CampersList />
        </div>
      </Section>
    </Container>
  );
};

export default CatalogPage;
