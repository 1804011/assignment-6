// Common Function used frequently
const $ = (str) => document.getElementById(str);

const loadData = (url, callBack) => {
	fetch(url)
		.then((response) => response.json())
		.then((data) => callBack(data));
};
// =============================

$("submit").addEventListener("click", () => {
	let searchText = $("search").value;
	searchText = searchText.toLowerCase();
	$("data").textContent = "";
	loadData(
		`https://openapi.programming-hero.com/api/phones?search=${searchText}`,
		(phones) => {
			if (phones.status === false) {
				$("error").style.display = "block";
				$("search").style.border = "2px solid red";
			} else {
				$("error").style.display = "none";
				$("search").style.border = "2px solid black";

				phones.data.forEach((phone) => {
					const { brand, image, phone_name, slug } = phone;
				});
			}
		}
	);
});
