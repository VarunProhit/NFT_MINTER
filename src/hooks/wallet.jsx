import useStore from "./store";
import { getAccountBalance } from "../utils/wallet";

const useWallet = () => {
	const { walletState } = useStore();

	return {
		...walletState,
		balance: walletState?.signer
			? getAccountBalance(walletState.provider, walletState.signer)
			: 0,
	};
};

export default useWallet;
