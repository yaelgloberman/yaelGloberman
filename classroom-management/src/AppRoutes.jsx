import React from "react";

// Constant
import { ROUTES } from "./constants";

// React router
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => (
  <Routes>
    {Object.keys(ROUTES).map((key) => {
      const [path, Component] = ROUTES[key];
      return <Route key={key} path={path} element={<Component />} />;
    })}
  </Routes>
);

export default AppRoutes;
