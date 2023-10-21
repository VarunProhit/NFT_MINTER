import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const useStore = () => {
	const context = useContext(GlobalContext);
	return context;
};

export default useStore;
