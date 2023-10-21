import React, { useState } from "react";
import Typography from "../../../library/Typography";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
import {
	FiCopy,
	FiDownload,
	FiExternalLink,
	FiLogIn,
	FiUpload,
} from "react-icons/fi";
import {
	copy,
	exportAsJson,
	openLink,
	stylesConfig,
} from "../../../utils/functions";
import styles from "./styles.module.scss";
import { http } from "../../../utils/http";
import useConnectWallet from "../../../hooks/connect-wallet";

const classes = stylesConfig(styles, "home-mint");

const HomeMint = () => {
	const walletState = useConnectWallet();
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [transactionDetails, setTransactionDetails] = useState({
		cid: "",
		hash: "",
	});

	const handleDrop = (event) => {
		if (!walletState || !walletState.signer)
			return alert("Please connect your wallet first");
		event.preventDefault();
		const { files } = event.dataTransfer;
		if (files.length === 0) {
			alert("No files found");
			return;
		} else if (files.length > 1) {
			alert("Please upload one file at a time");
		} else {
			setFile(files[0]);
		}
	};

	const handleDragOver = (event) => {
		if (!walletState || !walletState.signer)
			return alert("Please connect your wallet first");
		event.preventDefault();
	};

	const handleDragStart = (event) => {
		if (!walletState || !walletState.signer)
			return alert("Please connect your wallet first");
		event.dataTransfer.setData("text/plain", event.target.id);
	};

	const handleSubmit = async (event) => {
		event?.preventDefault();
		if (!walletState || !walletState.signer)
			return alert("Please connect your wallet first");
		try {
			setLoading(true);
			if (file) {
				const formData = new FormData();
				formData.append("file", file);
				const data = await http.post("/upload", formData);
				setTransactionDetails({
					cid: data.data.cid,
					hash: data.data.transactionHash,
				});
			}
		} catch (error) {
			alert(error.toString());
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className={classes("")} id="mint">
			<Typography size="xl" as="h1" className={classes("-title")}>
				Mint your NFT Characters
			</Typography>
			<Typography size="sm" as="p" className={classes("-subtitle")}>
				Minting just became easier. Upload your NFT Character and mint
				it on our marketplace.
			</Typography>
			<div className={classes("-container")}>
				<div className={classes("-image")}>
					<img src="/vectors/illustration.svg" alt="illustration" />
				</div>
				<div className={classes("-content")}>
					<div
						className={classes("-file-upload-area")}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
					>
						<div
							className={classes("-inputfile-container")}
							draggable="true"
							onDragStart={handleDragStart}
						>
							<Typography
								size="sm"
								as="h3"
								className={classes("-inputfile-title")}
							>
								Drag and Drop your file here
							</Typography>
							<Typography
								size="xs"
								as="p"
								className={classes("-inputfile-subtitle")}
							>
								or
							</Typography>
							<form className={classes("-inputfile-form")}>
								<label
									htmlFor="file"
									className={classes("-inputfile-label")}
									title={
										walletState && walletState.signer
											? loading
												? "Please wait while we upload your file"
												: "Upload your file"
											: "Please connect your wallet first"
									}
								>
									<FiUpload />
									Browse File
									<input
										type="file"
										name="file"
										id="file"
										disabled={
											loading ||
											!walletState ||
											!walletState.signer
										}
										title={
											walletState && walletState.signer
												? loading
													? "Please wait while we upload your file"
													: "Upload your file"
												: "Please connect your wallet first"
										}
										className={classes("-inputfile")}
										onChange={(e) =>
											setFile(e.target.files[0])
										}
									/>
								</label>
							</form>
						</div>
					</div>
					{file ? (
						<>
							<div className={classes("-file-details")}>
								<FaRegFileAlt />
								<div className={classes("-file-details-main")}>
									<Typography
										size="sm"
										as="p"
										className={classes("-file-name")}
									>
										{file.name}
									</Typography>
									<Typography
										size="sm"
										as="p"
										className={classes("-file-size")}
									>
										{file.size > 1000000
											? `${file.size / 1000000} MB`
											: `${file.size / 1000} KB`}
									</Typography>
								</div>
								<button
									type="reset"
									className={classes("-file-details-reset")}
									onClick={() => setFile(null)}
								>
									<AiOutlineDelete />
								</button>
							</div>
							<button
								className={classes("-file-upload-btn")}
								type="submit"
								onClick={handleSubmit}
								disabled={loading}
							>
								{loading ? (
									<>
										<span
											className={classes(
												"-file-upload-btn--loading"
											)}
										/>
										Uploading your character...
									</>
								) : (
									<>
										<FiLogIn />
										Mint
									</>
								)}
							</button>
						</>
					) : (
						<div className={classes("-file-details")}>
							<Typography
								size="sm"
								as="p"
								className={classes("-file-name")}
							>
								No File Selected
							</Typography>
						</div>
					)}
					{transactionDetails.cid && transactionDetails.hash ? (
						<div className={classes("-transaction-details")}>
							<Typography
								size="xs"
								as="span"
								className={classes("-transaction-details-cid")}
							>
								CID: {transactionDetails.cid}{" "}
								<FiCopy
									onClick={() => {
										copy(transactionDetails.cid);
									}}
								/>
							</Typography>
							<Typography
								size="xs"
								as="span"
								className={classes("-transaction-details-hash")}
							>
								Transaction Hash: {transactionDetails.hash}{" "}
								<FiCopy
									onClick={() => {
										copy(transactionDetails.hash);
									}}
								/>
							</Typography>
							<div
								className={classes("-transaction-details-btns")}
							>
								<button
									className={classes(
										"-transaction-details-btn"
									)}
									onClick={() => {
										openLink(
											`https://${transactionDetails.cid}.ipfs.dweb.link`
										);
									}}
									disabled={loading}
								>
									<FiExternalLink />
									View Character
								</button>
								<button
									className={classes(
										"-transaction-details-btn"
									)}
									onClick={() => {
										openLink(
											`https://mumbai.polygonscan.com/tx/${transactionDetails.hash}`
										);
									}}
									disabled={loading}
								>
									<FiExternalLink />
									View Transaction
								</button>
								<button
									className={classes(
										"-transaction-details-btn"
									)}
									onClick={() => {
										exportAsJson(
											{
												...transactionDetails,
												resource: `https://${transactionDetails.cid}.ipfs.dweb.link`,
												transactionDetails: `https://mumbai.polygonscan.com/tx/${transactionDetails.hash}`,
											},
											`transaction-${
												transactionDetails.cid
											}-${new Date().getTime()}.json`
										);
									}}
									disabled={loading}
								>
									<FiDownload />
									Export details
								</button>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</section>
	);
};

export default HomeMint;
