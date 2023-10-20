import mongoose from "mongoose";
import { USER_ROLES } from "../constants/enums.mjs";

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: Object.values(USER_ROLES),
			default: USER_ROLES.USER,
		},
		avatar: {
			type: String,
			default:
				"https://raw.githubusercontent.com/akshatmittal61/mern-template/master/images/user.svg",
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("user", UserSchema);
export default User;
