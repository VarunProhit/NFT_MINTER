// Some useful arithmetic functions

// The function to get the sum of an array
export const sum = (arr) => arr.reduce((a, b) => a + b, 0);

// The function to get the average of an array
export const average = (arr) => sum(arr) / arr.length;
