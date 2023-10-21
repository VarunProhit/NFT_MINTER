import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 5000; // PORT to run backend server
export const dbUri = process.env.MONGO_CONNECTION_URL; // MongoDB connection string

export const smartContractNetwork = process.env.SMART_CONTRACT_NETWORK; // Smart contract network
export const smartContractAddress = process.env.SMART_CONTRACT_ADDRESS; // Smart contract address
export const walletImportedOnStarton = process.env.WALLET_IMPORTED_ON_STARTON; // Wallet imported on Starton
export const receiverAddress = process.env.RECEIVER_ADDRESS; // Receiver address
export const startonApiKey = process.env.STARTON_API_KEY; // Starton API key
