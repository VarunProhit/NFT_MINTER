import { useState } from "react";

export const useContextData = () => {
	// Global Authentication State
	const [loggedIn, setLoggedIn] = useState(false);

	return {
		loggedIn,
		setLoggedIn,
	};
};
