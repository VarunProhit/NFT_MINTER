import React, { useEffect, useState } from "react";
import metamaskIcon from "../../../SVGs/metamask.svg";
import Button from "../../../library/Button";
import Typography from "../../../library/Typography";
import { copy, stylesConfig } from "../../../utils/functions";
import useConnectWallet from "../../../hooks/connect-wallet";
import { FiCopy, FiCheck } from "react-icons/fi";
import styles from "./styles.module.scss";

const classes = stylesConfig(styles, "home-hero");

const HomeHero = () => {
	const walletState = useConnectWallet();
	const [buttonIcon, setButtonIcon] = useState(
		<img src={metamaskIcon} alt="metamask" />
	);

	const handleClick = () => {
		if (!walletState?.signer) {
			walletState.connect();
			setButtonIcon(<FiCopy />);
		} else {
			copy(walletState.signer.address);
			setButtonIcon(<FiCheck />);
			setTimeout(() => {
				setButtonIcon(<FiCopy />);
			}, 2500);
		}
	};

	useEffect(() => {
		if (walletState?.signer) {
			setButtonIcon(<FiCopy />);
		} else {
			setButtonIcon(<img src={metamaskIcon} alt="metamask" />);
		}
	}, [walletState?.signer]);

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
						icon={buttonIcon}
						iconPosition={walletState?.signer ? "right" : "left"}
						className={classes("-button")}
						size="large"
						onClick={handleClick}
					>
						{(() => {
							if (walletState && walletState.signer) {
								return `Connected to ${
									walletState.signer.address.slice(0, 5) +
									"..." +
									walletState.signer.address.slice(-3)
								}`;
							} else {
								return "Connect Wallet";
							}
						})()}
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
