import React from "react";
import Typography from "../../../library/Typography";
import { stylesConfig } from "../../../utils/functions";
import styles from "./styles.module.scss";

const classes = stylesConfig(styles, "home-hero");

const HomeHero = () => {
	return (
		<section
			className={classes("")}
			style={{
				backgroundImage: "url(/images/bg.gif)",
			}}
		>
			<Typography as="h1" className={classes("-title")}>
				NFT Marketplace
			</Typography>
			<button
				className={classes("-btn")}
				type="button"
				onClick={() => {
					window.scroll(0, window.innerHeight);
				}}
			>
				<span className={classes("-btn-arrow")} />
			</button>
		</section>
	);
};

export default HomeHero;
