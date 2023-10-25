import { useState } from "react";

export const useContextData = () => {
	// Global Authentication State
	const [loggedIn, setLoggedIn] = useState(false);
	const [walletState, setWalletState] = useState({
		contract: null,
		provider: null,
		signer: null,
		address: null,
	});

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
