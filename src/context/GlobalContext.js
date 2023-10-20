import { createContext } from "react";

const GlobalContext = createContext({
	loggedIn: false,
	setLoggedIn: () => {},
});

export default GlobalContext;
