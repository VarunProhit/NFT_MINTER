import React from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils/functions";
import Typography from "../../library/Typography";

const classes = stylesConfig(styles, "home");

const HomePage = () => {
	return (
		<main className={classes("")}>
			<section className={classes("-hero")}>
				<Typography size="lg">
					Hello, <span className="text--primary">world</span>!
				</Typography>
			</section>
		</main>
	);
};

export default HomePage;
