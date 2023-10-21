import { Router } from "express";
import { uploadAsset } from "../controllers/upload.mjs";
import { upload } from "../config/files.mjs";

const router = Router();

router.post("/", upload.single("file"), uploadAsset);

export default router;
