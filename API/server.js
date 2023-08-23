import express from "express";
import multer from "multer";
import cors from "cors";
import axios from "axios";
import env from "dotenv";
import { setUncaughtExceptionCaptureCallback } from "process";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
env.config();
app.use(cors({
  origin: "*"
}));

const upload = multer({
  limits: {
    fileSize: 100000000000,
  },
});
const starton = axios.create({
  baseURL: "https://api.starton.io/v3",
  headers: {
    "x-api-key": "sk_live_1e4087bb-f51a-420a-a1ed-fa30ff7e2985",
  },
});
// sk_live_1e4087bb-f51a-420a-a1ed-fa30ff7e2985
app.post("/upload", cors(), upload.single("file"), async (req, res) => {
  let data = new FormData();
  const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
  data.append("file", blob, { filename: req.file.originalname });
  data.append("isSync", "true");

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
      name: `A Wonderful NFT`,
      description: `Probably the most awesome NFT ever created !`,
      image: `ipfs://ipfs/${imgCid}`,
    };
    const ipfsMetadata = await starton.post("/ipfs/json", {
      name: "My NFT metadata Json",
      content: metadataJson,
      isSync: true,
    });
    return ipfsMetadata.data;
  }
  const SMART_CONTRACT_NETWORK = process.env.SMART_CONTRACT_NETWORK;
  const SMART_CONTRACT_ADDRESS = process.env.SMART_CONTRACT_ADDRESS;
  const WALLET_IMPORTED_ON_STARTON = process.env.WALLET_IMPORTED_ON_STARTON;
  async function mintNFT(receiverAddress, metadataCid) {
    const nft = await starton.post(
      `/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`,
      {
        functionName: "mint",
        signerWallet: WALLET_IMPORTED_ON_STARTON,
        speed: "low",
        params: [receiverAddress, metadataCid],
      }
    );
    return nft.data;
  }
  const RECEIVER_ADDRESS = process.env.RECEIVER_ADDRESS;
  const ipfsImgData = await uploadImageOnIpfs();
  const ipfsMetadata = await uploadMetadataOnIpfs(ipfsImgData.cid);
  const nft = await mintNFT(RECEIVER_ADDRESS, ipfsMetadata.cid);
  console.log(nft);
  res.status(201).json({
    transactionHash: nft.transactionHash,
    cid: ipfsImgData.cid,
  });
});
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
