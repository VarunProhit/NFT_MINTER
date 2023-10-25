import { ethers } from "ethers";

export const getAccountBalance = async (provider, signer) => {
	try {
		const balance = await provider.getBalance(signer.getAddress());
		const balanceInEth = ethers.formatEther(balance);
		return balanceInEth;
	} catch (error) {
		console.error(error);
		return null;
	}
};
