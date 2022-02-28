// Common Function used frequently
const $ = (str) => document.getElementById(str);

const loadData = (url, callBack) => {
	fetch(url)
		.then((response) => response.json())
		.then((data) => callBack(data));
};
// =============================
