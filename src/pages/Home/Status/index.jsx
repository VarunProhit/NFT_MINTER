import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { stylesConfig } from "../../../utils/functions";
import Typography from "../../../library/Typography";
import useWallet from "../../../hooks/wallet";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const classes = stylesConfig(styles, "home-status");

const HomeStatus = () => {
	const walletState = useWallet();
	const [fetching, setFetching] = useState(false);
	const [balance, setBalance] = useState(0);

	const getBalance = async () => {
		try {
			setFetching(true);
			const res = await walletState.balance;
			console.log(res, typeof res);
			setBalance(res);
		} catch (error) {
			console.error(error);
		} finally {
			setFetching(false);
		}
	};

	useEffect(() => {
		getBalance();
	}, []);

	return (
		<section className={classes("")}>
			<div className={classes("-container")}>
				<div className={classes("-head")}>
					<Typography size="lg">Your Wallet</Typography>
					{fetching ? (
						<AiOutlineLoading3Quarters />
					) : (
						<img src="/vectors/metamask.svg" alt="logo" />
					)}
				</div>
				<div className={classes("-body")}>
					<Typography size="md">Balance: {balance} ETH</Typography>
				</div>
			</div>
		</section>
	);
};

export default HomeStatus;
