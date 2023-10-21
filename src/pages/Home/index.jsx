import React from "react";
import Hero from "./Hero";
import { stylesConfig } from "../../utils/functions";
import styles from "./styles.module.scss";
import Mint from "./Mint";

const classes = stylesConfig(styles, "home");

const HomePage = () => {
	return (
		<main className={classes("")}>
			<Hero />
			<Mint />
		</main>
	);
};

export default HomePage;
