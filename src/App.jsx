import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Layout from "./components/Layout/Layout.jsx";

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
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<DetailsPage />}>
          <Route index element={<Navigate to="features" />} />
          <Route path="features" element={<CamperFeatures />} />
          <Route path="reviews" element={<CamperReviews />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
