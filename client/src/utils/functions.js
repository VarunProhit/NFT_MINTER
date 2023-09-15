export const stylesConfig =
	(styles, prefix = "") =>
	(...args) => {
		const classes = [];
		args.forEach((arg) => {
			if (typeof arg === "string")
				classes.push(styles[`${prefix}${arg}`]);
			else if (typeof arg === "object")
				Object.keys(arg).forEach((key) => {
					if (arg[key]) classes.push(styles[`${prefix}${key}`]);
				});
		});
		return classes.join(" ");
	};
