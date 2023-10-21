import React from "react";
import PropTypes from "prop-types";
import { stylesConfig } from "../../utils/functions";
import styles from "./styles.module.scss";

const classes = stylesConfig(styles, "typography");

const Typography = ({
	children,
	family = "montserrat",
	size = "md",
	weight = "regular",
	as = "span",
	className = "",
	...rest
}) => {
	const Component = as || "span";

	return (
		<Component
			className={
				classes("", `--${family}-${size}-${weight}`) + ` ${className}`
			}
			{...rest}
		>
			{children}
		</Component>
	);
};

export default Typography;

/* 
import React from "react";

// All the font definitions can be found in @/styles/config/_typography.scss

export type FontFamily = "montserrat" | "source-sans";

export type FontSize =
	| "xxs"
	| "xs"
	| "sm"
	| "md"
	| "lg"
	| "xl"
	| "xxl"
	| "xxxl";

export type FontWeight = "regular" | "medium" | "semi-bold" | "bold";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
	family?: FontFamily;
	size?: FontSize;
	weight?: FontWeight;
	children: React.ReactNode;
	as?: React.ElementType;
}

 */
// create prop types

Typography.propTypes = {
	family: PropTypes.oneOf(["montserrat", "source-sans"]),
	size: PropTypes.oneOf(["xxs", "xs", "sm", "md", "lg", "xl", "xxl", "xxxl"]),
	weight: PropTypes.oneOf(["regular", "medium", "semi-bold", "bold"]),
	children: PropTypes.node.isRequired,
	as: PropTypes.elementType,
	className: PropTypes.string,
};
