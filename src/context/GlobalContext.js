import { createContext } from "react";

const GlobalContext = createContext({
	loggedIn: false,
	setLoggedIn: () => {},
	walletState: {
		provider: null,
		signer: null,
		address: null,
	},
	setWalletState: () => {},
});

export default GlobalContext;
