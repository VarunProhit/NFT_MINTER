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

export const copy = (text) => {
	navigator.clipboard.writeText(text);
};

export const exportAsJson = (data, filename) => {
	const json = JSON.stringify(data);
	const blob = new Blob([json], { type: "application/json" });
	const href = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = href;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
