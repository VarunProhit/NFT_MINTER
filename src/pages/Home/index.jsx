import React from "react";
import Hero from "./Hero";
import { stylesConfig } from "../../utils/functions";
import styles from "./styles.module.scss";

const classes = stylesConfig(styles, "home");

const HomePage = () => {
	return (
		<main className={classes("")}>
			<Hero />
		</main>
	);
};

export default HomePage;
