import React from "react";
import Hero from "./Hero";
import Status from "./Status";
import Mint from "./Mint";
import { stylesConfig } from "../../utils/functions";
import styles from "./styles.module.scss";
import useWallet from "../../hooks/wallet";

const classes = stylesConfig(styles, "home");

const HomePage = () => {
	const walletState = useWallet();

	return (
		<main className={classes("")}>
			<Hero />
			{walletState.signer ? <Status /> : null}
			<Mint />
		</main>
	);
};

export default HomePage;
