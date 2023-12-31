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
				provider,
				signer,
				address: await signer.getAddress(),
			});
		} catch (error) {
			console.error(error);
			alert(error.message);
		}
	};

	const disconnectWallet = () => {
		setWalletState({
			contract: null,
			provider: null,
			signer: null,
			address: null,
		});
	};

	return {
		signer: walletState?.signer,
		contract: walletState?.contract,
		connect: createInstance,
		disconnect: disconnectWallet,
	};
};

export default useConnectWallet;
