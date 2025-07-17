import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import "./App.css";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
const DetailsPage = lazy(() => import("./pages/DetailsPage/DetailsPage.jsx"));
const CamperFeatures = lazy(() =>
  import("./components/CamperFeatures/CamperFeatures")
);
const CamperReviews = lazy(() =>
  import("./components/CamperReviews/CamperReviews.jsx")
);

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <div className="page-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<DetailsPage />}>
              <Route path="features" element={<CamperFeatures />} />
              <Route path="reviews" element={<CamperReviews />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Suspense>
    </>
  );
}

export default App;
