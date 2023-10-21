import { useState } from "react";

export const useContextData = () => {
	// Global Authentication State
	const [loggedIn, setLoggedIn] = useState(false);
	const [walletState, setWalletState] = useState(null);

	const handleWalletState = (wallet) => {
		setWalletState(wallet);
	};

	return {
		loggedIn,
		setLoggedIn,
		walletState,
		setWalletState: handleWalletState,
	};
};
