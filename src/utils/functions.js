// function to get a random element from an array
export const getRandomElement = (arr) => {
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
};

// function to open a link in a new tab
export const openLink = (link) => window.open(link, "_blank");

// function to copy text to clipboard
export const copyToClipboard = (text) => {
	navigator.clipboard.writeText(text);
};

// function to get a random number between min and max
export const random = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

// function to shuffle an array in place
export const shuffle = (array) => {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
};

// function to implement a sleep function
export const sleep = (seconds) =>
	new Promise((resolve) => setTimeout(resolve, seconds * 1000));

// function for finding max and min of two numbers
export const max = (a, b) => (a > b ? a : b);
export const min = (a, b) => (a < b ? a : b);

// debounce function for delaying function calls
export const debounce = (func, wait) => {
	let timeout;
	return (e) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(e);
		}, wait);
	};
};

// function to get a random ID
export const randomId = () => Math.floor(Math.random() * 1000000000);

// function to covert text to slug
export const slugify = (text) =>
	text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/[^\w-]+/g, "") // Remove all non-word chars
		.replace(/--+/g, "-") // Replace multiple - with single -
		.replace(/^-+/, "") // Trim - from start of text
		.replace(/-+$/, ""); // Trim - from end of text

// function to declare while dealing wih modular css
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

// function to omit keys from an object
export const omitKeys = (obj, keys) => {
	const newObj = {};
	Object.keys(obj).forEach((key) => {
		if (!keys.includes(key)) {
			newObj[key] = obj[key];
		}
	});
	return newObj;
};

// function to round off a number to given decimal places
export const roundOff = (num, decimalPlaces) =>
	Math.round(num * 10 ** decimalPlaces) / 10 ** decimalPlaces;
