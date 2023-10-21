import {
	receiverAddress,
	smartContractAddress,
	smartContractNetwork,
	walletImportedOnStarton,
} from "../config/index.mjs";
import { starton } from "../config/requests.mjs";

export const uploadAsset = async (req, res) => {
	let data = new FormData();

	if (!req.file)
		return res
			.status(400)
			.json({ error: "Please provide a file to upload" });

	async function uploadImageOnIpfs() {
		const ipfsImg = await starton.post("/ipfs/file", data, {
			headers: {
				"Content-Type": `multipart/form-data; boundary=${data._boundary}`,
			},
		});
		return ipfsImg.data;
	}

	async function uploadMetadataOnIpfs(imgCid) {
		const metadataJson = {
			name: "A Wonderful NFT",
			description: "Probably the most awesome NFT ever created !",
			image: `ipfs://ipfs/${imgCid}`,
		};
		const ipfsMetadata = await starton.post("/ipfs/json", {
			name: "My NFT metadata Json",
			content: metadataJson,
			isSync: true,
		});
		return ipfsMetadata.data;
	}

	async function mintNFT(receiverAddress, metadataCid) {
		const nft = await starton.post(
			`/smart-contract/${smartContractNetwork}/${smartContractAddress}/call`,
			{
				functionName: "mint",
				signerWallet: walletImportedOnStarton,
				speed: "low",
				params: [receiverAddress, metadataCid],
			}
		);
		return nft.data;
	}
	try {
		const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
		data.append("file", blob, { filename: req.file.originalname });
		data.append("isSync", "true");

		const ipfsImgData = await uploadImageOnIpfs();
		const ipfsMetadata = await uploadMetadataOnIpfs(ipfsImgData.cid);
		const nft = await mintNFT(receiverAddress, ipfsMetadata.cid);

		return res.status(201).json({
			transactionHash: nft.transactionHash,
			cid: ipfsImgData.cid,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: error.message });
	}
};
