import React, { useEffect, useState } from "react";
import metamaskIcon from "../../../SVGs/metamask.svg";
import Button from "../../../library/Button";
import Typography from "../../../library/Typography";
import { copy, stylesConfig } from "../../../utils/functions";
import useConnectWallet from "../../../hooks/connect-wallet";
import { IoCheckmark, IoCopyOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import styles from "./styles.module.scss";

const classes = stylesConfig(styles, "home-hero");

const HomeHero = () => {
	const walletState = useConnectWallet();
	const [buttonIcon, setButtonIcon] = useState(
		<img
			src={metamaskIcon}
			alt="metamask"
			style={{
				width: "28px",
				height: "28px",
			}}
		/>
	);

	const handleClick = () => {
		if (!walletState?.signer) {
			walletState.connect();
			setButtonIcon(<IoCopyOutline />);
		} else {
			copy(walletState.signer.address);
			setButtonIcon(<IoCheckmark />);
			setTimeout(() => {
				setButtonIcon(<IoCopyOutline />);
			}, 2500);
		}
	};

	const handleDisconnect = () => {
		walletState.disconnect();
	};

	useEffect(() => {
		if (walletState?.signer) {
			setButtonIcon(<IoCopyOutline />);
		} else {
			setButtonIcon(
				<img
					src={metamaskIcon}
					alt="metamask"
					style={{
						width: "28px",
						height: "28px",
					}}
				/>
			);
		}
	}, [walletState?.signer, walletState?.address]);

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
				{walletState?.signer ? (
					<div className={classes("-header-chip")}>
						<Typography as="span" size="s">
							{walletState.signer.address.slice(0, 5) +
								"..." +
								walletState.signer.address.slice(-3)}
						</Typography>
						<button onClick={handleClick}>{buttonIcon}</button>
						<button onClick={handleDisconnect}>
							<LuLogOut />
						</button>
					</div>
				) : (
					<Button
						icon={buttonIcon}
						iconPosition="left"
						className={classes("-button")}
						size="large"
						onClick={handleClick}
					>
						Connect Wallet
					</Button>
				)}
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
