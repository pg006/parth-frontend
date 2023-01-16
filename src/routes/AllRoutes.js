import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";

const AllRoutes = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default AllRoutes;
