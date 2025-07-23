import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import css from "./Layout.module.css";

const Layout = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loader />}>
        <main className={css.pageWrapper}>
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
};

export default Layout;
