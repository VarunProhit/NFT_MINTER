import { createContext } from "react";

const GlobalContext = createContext({
	loggedIn: false,
	setLoggedIn: () => {},
	walletState: null,
	setWalletState: () => {},
});

export default GlobalContext;
