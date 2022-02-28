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
				let sz = phones.data.length;
				const div = document.createElement("div");
				div.id = "phone-info";
				div.classList.add("container", "border", "rounded-3", "py-5");
				$("data").appendChild(div);
				let cnt = 0;
				phones.data.forEach((phone) => {
					if (cnt < 20) {
						const { brand, image, phone_name, slug } = phone;
						const card = document.createElement("div");
						card.classList.add("card", "p-4", "shadow-sm", "rounded-3");
						card.style = "width: 18rem";
						$("phone-info").appendChild(card);
						card.innerHTML = `<img src="${image}" class="card-img-top " alt="${phone_name}" />
					<div class="card-body">
						<h5 class="card-title text-center">${phone_name}</h5>
						<p class="card-text text-center">
						${brand}
						</p>
						<button class="btn btn-primary mx-auto d-block">Show details</button>
					</div>`;
					} else if (cnt == 20) {
						const button = document.createElement("button");
						button.id = "load-more";
						button.classList.add(
							"btn",
							"btn-outline-danger",
							"d-flex",
							"justify-content-center",
							"align-items-center",
							"me-3"
						);
						button.style.height = "32px";
						button.style.alignSelf = "flex-end";
						button.innerText = "Load more..";
						$("phone-info").appendChild(button);
					}
					cnt++;
				});
			}
		}
	);
});
