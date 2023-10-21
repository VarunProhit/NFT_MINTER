import multer from "multer";

export const upload = multer({
	limits: {
		fileSize: 100000000000,
	},
});
