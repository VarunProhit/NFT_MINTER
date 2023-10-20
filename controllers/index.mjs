import { RESPONSE_MESSAGES } from "../constants/enums.mjs";

const index = async (req, res) => {
	try {
		const result = await fetch(
			"https://jsonplaceholder.typicode.com/users"
		).then((resp) => resp.json());
		return res.status(200).json({
			message: RESPONSE_MESSAGES.SUCCESS,
			data: result,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: RESPONSE_MESSAGES.SERVER_ERROR,
			error: error.message,
		});
	}
};

export { index };
