import React from "react";
import Typography from "../../../library/Typography";
import { stylesConfig } from "../../../utils/functions";
import styles from "./styles.module.scss";

const classes = stylesConfig(styles, "home-mint");

const HomeMint = () => {
	return (
		<section className={classes("")} id="mint">
			<Typography size="xl" as="h1" className={classes("-title")}>
				Mint your NFT Characters
			</Typography>
			<Typography size="sm" as="p" className={classes("-subtitle")}>
				Minting just became easier. Upload your NFT Character and mint
				it on our marketplace.
			</Typography>
			<div className={classes("-container")}>
				<div className={classes("-image")}>
					<img src="/vectors/illustration.svg" alt="illustration" />
				</div>
				<div className={classes("-content")}></div>
			</div>
		</section>
	);
};

export default HomeMint;
