import React from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils/functions";

const classes = stylesConfig(styles, "home");

const HomePage = () => {
	return (
		<main className={classes("")}>
			<section className={classes("-hero")}></section>
		</main>
	);
};

export default HomePage;
