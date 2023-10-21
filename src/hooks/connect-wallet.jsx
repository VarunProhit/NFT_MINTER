import { useEffect } from "react";
import { Contract, ethers } from "ethers";
import useStore from "./store";
import instance from "../assets/MyNft.sol/MyNFT.json";
import { marketPlaceContractAddress } from "../constants/variables";

const useConnectWallet = () => {
	const { walletState, setWalletState } = useStore();
	const createInstance = async () => {
		try {
			if (!window.ethereum) {
				throw new Error("Please install MetaMask.");
			}
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new Contract(
				marketPlaceContractAddress,
				instance.abi,
				signer
			);
			setWalletState({
				contract,
				signer,
			});
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
	};

	useEffect(() => {
		createInstance();
	}, []);

	return walletState;
};

export default useConnectWallet;
