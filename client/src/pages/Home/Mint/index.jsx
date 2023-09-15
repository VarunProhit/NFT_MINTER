import React, { useState } from "react";
import Typography from "../../../library/Typography";
import { stylesConfig } from "../../../utils/functions";
import styles from "./styles.module.scss";

const classes = stylesConfig(styles, "home-mint");

const HomeMint = () => {
	const [file, setFile] = useState(null);

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

	console.log(file);

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
							className={classes("-card-body")}
							draggable="true"
							onDragStart={handleDragStart}
						>
							<form>
								<input
									type="file"
									name="file"
									id="file"
									className={classes("-inputfile")}
									onChange={(e) => setFile(e.target.files[0])}
								/>
							</form>
						</div>
					</div>
					{file ? (
						<div className={classes("-file-details")}>
							<Typography
								size="sm"
								as="p"
								className={classes("-file-name")}
							>
								File Name: {file.name}
							</Typography>
							<Typography
								size="sm"
								as="p"
								className={classes("-file-size")}
							>
								File Size: {file.size}
							</Typography>
						</div>
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
				</div>
			</div>
		</section>
	);
};

export default HomeMint;
