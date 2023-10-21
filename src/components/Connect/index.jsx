import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../utils/functions";
import useConnectWallet from "../../hooks/connect-wallet";
import Typography from "../../library/Typography";

const classes = stylesConfig(styles, "connect-wallet");

const ConnectWallet = ({ onClose }) => {
	const walletState = useConnectWallet();

	useEffect(() => {
		if (walletState?.signer) {
			onClose();
		}
	}, [walletState]);

	return (
		<>
			<div className={classes("-popup")}>
				<img src="/images/metamask.svg" alt="metamask" />
				<span className={classes("__loader")} />
				<Typography as="h4" className={classes("__title")}>
					Connecting to Metamask
				</Typography>
			</div>
			<div
				className={classes("-overlay")}
				onClick={() => {
					onClose();
				}}
			></div>
		</>
	);
};

export default ConnectWallet;
