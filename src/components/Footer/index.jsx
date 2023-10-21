import React, { useState } from "react";
import Typography from "../../library/Typography";
import { stylesConfig } from "../../utils/functions";
import styles from "./styles.module.scss";
import { socials } from "../../constants/footer";

const classes = stylesConfig(styles, "footer");

const Footer = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		e?.preventDefault();
		alert("You have subscribed to our newsletter!");
	};

	return (
		<footer className={classes("")}>
			<div className={classes("-top")}>
				<div className={classes("-left")}>
					<img src="/favicon.png" alt="NFT Marketplace" />
				</div>
				<div className={classes("-right")}>
					<nav className={classes("-nav")}>
						<Typography as="h1" size="lg">
							Contact Us
						</Typography>
						<div className={classes("-socials")}>
							{socials.map((social, index) => (
								<a
									key={`social-${index}`}
									href={social.link}
									target="_blank"
									rel="noreferrer"
								>
									{social.icon}
								</a>
							))}
						</div>
					</nav>
					<form className={classes("-form")} onSubmit={handleSubmit}>
						<input
							type="email"
							name="email"
							id="subscribe-email"
							value={email}
							placeholder="Enter your email address"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
						<button
							type="submit"
							className={classes("-form-button")}
						>
							Subscribe Now!
						</button>
					</form>
				</div>
			</div>
			<div className={classes("-bottom")}>
				<Typography size="xs">
					© 2023 - 2024 by The three musketeers.
				</Typography>
			</div>
		</footer>
	);
};

export default Footer;
