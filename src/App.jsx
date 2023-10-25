import React from "react";
import { Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useContextData } from "./context/useContext";
import GlobalContext from "./context/GlobalContext";
import routes from "./routes";
import Footer from "./components/Footer";
import "./style.scss";

const Wrapper = () => {
	AOS.init();
	return (
		<>
			<Routes>
				{routes.map((route, index) => {
					return (
						<Route
							key={index}
							path={route.path}
							element={route.component}
						/>
					);
				})}
			</Routes>
			<Footer />
		</>
	);
};

const App = () => {
	const context = useContextData();
	return (
		<GlobalContext.Provider value={context}>
			<Wrapper />
		</GlobalContext.Provider>
	);
};

export default App;
