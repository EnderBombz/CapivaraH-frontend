import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainList from "../pages/MainList";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainList />} />
      </Routes>
    </BrowserRouter>
  );
}
