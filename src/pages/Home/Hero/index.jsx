import React from "react";
import metamaskIcon from "../../../SVGs/metamask.svg";
import Button from "../../../library/Button";
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
			<div className={classes("-header")}>
				<img src="favicon.png" alt="logo" />
				<nav>
					<ul>
						<li>Home</li>
						<li>Marketplace</li>
						<li>Create</li>
						<li>Your Profile</li>
					</ul>
				</nav>
				<Button size="small">Explore</Button>
			</div>
			<div className={classes("-body")}>
				<div className={classes("-content")}>
					<Typography as="h1" className={classes("-title")}>
						Discover and collect extraordinary NFTs
					</Typography>
					<Typography
						as="p"
						className={classes("-subtitle")}
						size="md"
					>
						On NFT Marketplace you can buy, sell, and explore
						digital goods secured with blockchain technology.
					</Typography>
					<Button
						icon={<img src={metamaskIcon} alt="metamask" />}
						className={classes("-button")}
						size="large"
					>
						Connect your wallet
					</Button>
					<span className="empty"></span>
					<span className="empty"></span>
				</div>
				<div className={classes("-graphic")}>
					<img src="/images/cat.png" alt="Robot" />
				</div>
			</div>
		</section>
	);
};

export default HomeHero;
