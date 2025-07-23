import { RotateLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={css.backdrop}>
      <RotateLoader color="var(--button)" />
    </div>
  );
};

export default Loader;
