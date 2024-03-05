import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./main.scss";
import Home from "./pages/Homepage/home";

import "antd/dist/reset.css";

import { pages } from "./data/pages";

const routesList = pages.map((item) => {
  return <Route key={item.link} path={item.link} element={item.page} />;
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      {routesList}
    </Routes>
  </BrowserRouter>
);
