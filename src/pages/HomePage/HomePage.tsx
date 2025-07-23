import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
      <div className={css.hero}>
        <Container>
          <div className={css.heroContent}>
            <h1 className={css.title}>Campers of your dreams</h1>
            <p className={css.text}>
              You can find everything you want in our catalog
            </p>

            <div className={css.link}>
              <Link to="/catalog">
                <Button className={css.button} style="confirm">
                  View Now
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
