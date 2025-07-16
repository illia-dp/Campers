import { RotateLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.backdrop}>
      <RotateLoader color="var(--button)" height={50} width={50} />
    </div>
  );
};

export default Loader;
