import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./main.scss";
import Home from "./pages/Homepage/home";

import CenterLoading from "./components/centerLoading";
import { pages } from "./data/pages";

const routesList = pages.map((item) => {
	return (
		<Route
			key={item.link}
			path={item.link}
			element={<Suspense fallback={<CenterLoading />}>{item.page}</Suspense>}
		/>
	);
});

ReactDOM.createRoot(document.getElementById("content")).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home />} />
			{routesList}
		</Routes>
	</BrowserRouter>,
);
