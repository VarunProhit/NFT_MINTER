import { http } from "../utils/http";

export const sampleRequest = async () => {
	try {
		const res = await http.get("/");
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
