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
			<div className={classes("-content")}>
				<Typography as="h1" className={classes("-title")}>
					Discover and collect extraordinary NFTs
				</Typography>
				<Typography as="p" className={classes("-subtitle")} size="md">
					On NFT Marketplace you can buy, sell, and explore digital
					goods secured with blockchain technology.
				</Typography>
			</div>
			<div className={classes("-graphic")}>
				<img src="/images/cat.png" alt="Robot" />
			</div>
		</section>
	);
};

export default HomeHero;
