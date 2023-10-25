import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { copy, stylesConfig } from "../../../utils/functions";
import Typography from "../../../library/Typography";
import useWallet from "../../../hooks/wallet";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCopyOutline } from "react-icons/io5";
import useConnectWallet from "../../../hooks/connect-wallet";
import Button from "../../../library/Button";

const classes = stylesConfig(styles, "home-status");

const HomeStatus = () => {
	const walletState = useWallet();
	const connection = useConnectWallet();
	const [fetching, setFetching] = useState(false);
	const [balance, setBalance] = useState(0);

	const getBalance = async () => {
		try {
			setFetching(true);
			const res = await walletState.balance;
			setBalance(res);
		} catch (error) {
			console.error(error);
		} finally {
			setFetching(false);
		}
	};

	const handleDisconnect = () => {
		connection.disconnect();
	};

	useEffect(() => {
		getBalance();
	}, []);

	return (
		<section className={classes("")}>
			<div className={classes("-container")}>
				<div className={classes("-head")}>
					<Typography size="lg">Your Wallet</Typography>
					<div className={classes("-head-right")}>
						<Button size="medium" onClick={handleDisconnect}>
							Disconnect Wallet
						</Button>
						{fetching ? (
							<AiOutlineLoading3Quarters />
						) : (
							<img src="/vectors/metamask.svg" alt="logo" />
						)}
					</div>
				</div>
				<div className={classes("-body")}>
					<Typography size="md">
						Address: {walletState.address.slice(0, 7)}...
						{walletState.address.slice(-3)}
						<button onClick={() => copy(walletState.address)}>
							<IoCopyOutline />
						</button>
					</Typography>
					<Typography size="md">
						Balance: {+balance.toFixed(2)} ETH
					</Typography>
				</div>
			</div>
		</section>
	);
};

export default HomeStatus;
