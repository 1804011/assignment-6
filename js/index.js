// Common Function used frequently
const $ = (str) => document.getElementById(str);

const loadData = (url, callBack) => {
	fetch(url)
		.then((response) => response.json())
		.then((data) => callBack(data));
};
// ===================================
//when submit button is clicked then loadData function fetched data & display it.
$("submit").addEventListener("click", () => {
	let searchText = $("search").value;
	searchText = searchText.toLowerCase().trim();
	$("data").textContent = "";
	loadData(
		`https://openapi.programming-hero.com/api/phones?search=${searchText}`,
		displayPhoneInfo
	);
});
// ===============================================
//Function to display phone info in ui
const displayPhoneInfo = (phones) => {
	if (phones.status === false) {
		$("error").style.display = "block";
		$("search").style.border = "2px solid red";
	} else {
		$("error").style.display = "none";
		$("search").style.border = "2px solid black";
		const detailDiv = document.createElement("div");
		detailDiv.id = "detail-info";
		detailDiv.classList.add(
			"container",
			"mx-auto",
			"mb-5",
			"mt-3",
			"d-flex",
			"justify-content-center"
		);
		$("data").appendChild(detailDiv);
		const div = document.createElement("div");
		div.id = "phone-info";
		div.classList.add("container", "border", "rounded-3", "py-5");
		$("data").appendChild(div);
		let cnt = 0;
		phones.data.forEach((phone) => {
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
			<button id="${slug}"  class="btn btn-primary mx-auto d-block" >Show details</button>
		</div>`;
			$(slug).addEventListener("click", displayDetail);
			if (cnt < 20) {
				card.style.display = "block";
			} else card.style.display = "none";
			if (cnt == 20) {
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
				$("load-more").onclick = () => {
					const cards = document.getElementsByClassName("card");
					for (const card of cards) {
						card.style.display = "block";
					}
					$("phone-info").removeChild($("load-more"));
				};
			}
			cnt++;
		});
	}
};
// ===========================
// functions to display detail information on ui
const displayDetail = (event) => {
	loadData(
		`https://openapi.programming-hero.com/api/phone/${event.target.id}`,
		(response) => {
			console.log(response);
			const {
				brand,
				image,
				name,
				mainFeatures = "no-information",
				others = "no-information",
				releaseDate = "no release date found",
			} = response.data;
			const {
				chipSet = "no information",
				displaySize = "no information",
				memory = "no-information",
				sensors = "no-informations",
				storage = "no-informations",
			} = mainFeatures;

			const card = document.createElement("div");
			card.classList.add("card", "p-4");
			card.style = "width: 22rem";
			$("detail-info").textContent = "";
			$("detail-info").appendChild(card);
			card.innerHTML = `<img src="${image}" class="card-img-top" alt="${name}" />
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">
                   ${brand}
                </p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${releaseDate}</li>
                <li class="list-group-item"><span class="bold"> Chipset:</span>  ${chipSet}</li>
                <li class="list-group-item"><span class="bold"> Display-size: </span>${displaySize}</li>
                <li class="list-group-item"><span class="bold"> Memory:</span> ${memory}</li>
                <li class="list-group-item"><span class="bold"> Sensors:</span> ${sensors.toString()}</li>
                <li class="list-group-item"><span class="bold"> Storage:</span> ${storage}</li>
            </ul>`;
			if (others == "no-information") {
				const li = document.createElement("li");
				li.classList.add("list-group-item");
				li.innerHTML = `<span class="bold"> Others informations:</span> ${others}`;
				document.getElementsByClassName("list-group")[0].appendChild(li);
			} else {
				const li = document.createElement("li");
				li.classList.add("list-group-item");
				li.innerHTML = `<span class="bold"> Others informations:</span>`;
				document.getElementsByClassName("list-group")[0].appendChild(li);
				for (const prop in others) {
					const li = document.createElement("li");
					li.classList.add("list-group-item");
					li.innerHTML = `<span class="bold"> ${prop}:</span> ${others[prop]}`;
					document.getElementsByClassName("list-group")[0].appendChild(li);
				}
			}
		}
	);
};
// ==========================================
