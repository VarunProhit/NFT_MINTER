import React, { useState } from "react";
import Typography from "../../../library/Typography";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
import { FiCopy, FiDownload, FiLogIn, FiUpload } from "react-icons/fi";
import { copy, exportAsJson, stylesConfig } from "../../../utils/functions";
import styles from "./styles.module.scss";

const classes = stylesConfig(styles, "home-mint");

const HomeMint = () => {
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [transactionDetails, setTransactionDetails] = useState({
		cid: "",
		hash: "",
	});

	const handleDrop = (event) => {
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
		event.preventDefault();
	};

	const handleDragStart = (event) => {
		event.dataTransfer.setData("text/plain", event.target.id);
	};

	const handleSubmit = async (event) => {
		event?.preventDefault();
		try {
			setLoading(true);
			if (file) {
				const formData = new FormData();
				formData.append("file", file);
				const response = await fetch(
					`${
						import.meta.env.VITE_BACKEND_URL ??
						"http://localhost:5000"
					}/upload`,
					{
						method: "POST",
						mode: "cors",
						body: formData,
					}
				);
				const data = await response.json();
				setTransactionDetails({
					cid: data.cid,
					hash: data.transactionHash,
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
								>
									<FiUpload />
									Browse File
									<input
										type="file"
										name="file"
										id="file"
										disabled={loading}
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
							<button
								className={classes("-transaction-details-btn")}
								onClick={() => {
									exportAsJson(
										transactionDetails,
										`transaction-${
											transactionDetails.cid
										}-${new Date()
											.toISOString()
											.slice(0, 10)}.json`
									);
								}}
								disabled={loading}
							>
								<FiDownload />
								Export details
							</button>
						</div>
					) : null}
				</div>
			</div>
		</section>
	);
};

export default HomeMint;
