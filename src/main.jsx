import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./main.scss";

import CenterLoading from "./components/centerLoading";
import { routes } from "./data/routes";

const Home = lazy(() => import("./pages/Homepage/home"));

const routesList = routes.map(({ path, Component }) => {
    return (
        <Route
            key={path}
            path={path}
            element={
                <Suspense fallback={<CenterLoading />}>
                    <Component />
                </Suspense>
            }
        />
    );
});

ReactDOM.createRoot(document.getElementById("content")).render(
    <BrowserRouter>
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={<CenterLoading />}>
                        <Home />
                    </Suspense>
                }
            />
            {routesList}
        </Routes>
    </BrowserRouter>
);
