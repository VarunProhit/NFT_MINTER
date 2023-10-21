import axios from "axios";
import { startonApiKey } from "./index.mjs";

export const starton = axios.create({
	baseURL: "https://api.starton.io/v3",
	headers: {
		"x-api-key": startonApiKey,
	},
});
