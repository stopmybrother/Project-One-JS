const drawList = (dataType) => {
	const toDoSection = document.querySelector("#toDo");

	toDoSection.innerHTML = "";

	dataType.forEach((item) => {
		toDoSection.innerHTML += `
			<div class="wrapper__capsule">
				<div class="wrapper__capsuleFull">
					<p class="wrapper__tittleName">Tittle:</p>
					<p class="wrapper__tittle">${item.tittle}</p>
					<p class="wrapper__descriptionName">Decscription:</p>
					<p class="wrapper__description">${item.description}</p>
				</div>
				<div class="wrapper__capsuleBtn">
					<button class="wrapper__btnEdit">edit</button>
					<button class="wrapper__btnDelete">delete</button>
				</div>
			</div>
		`;
	});
};

const init = () => {
	const toDoList = document.querySelector(".wrapper__toDoList");
	const form = document.querySelector("#form");
	const inputTittle = document.querySelector("#inputTittle");
	const inputDescription = document.querySelector("#inputDescription");
	const clickBtn = document.querySelector("#clickBtn");

	const data = {
		toDo: [],
		inProgress: [],
		done: [],
	};

	clickBtn.addEventListener("click", (event) => {
		event.preventDefault();

		data.toDo.push({
			tittle: inputTittle.value,
			description: inputDescription.value,
		});

		form.reset();

		drawList(data.toDo);
	});

	toDoList.addEventListener("click", (event) => {
		switch (event.target.classList.value) {
			case "wrapper__btnDelete":
				const card = event.target.closest(".wrapper__capsule");
				const tittle = card.querySelector(".wrapper__tittle").textContent;
				const description = card.querySelector(".wrapper__description").textContent;

				data.toDo.forEach((item, index) => {
					if (item.tittle === tittle && item.description === description) {
						data.toDo.splice(index, 1);
					}
				});
				drawList(data.toDo);
				console.log(data.toDo);
				break;
			case "wrapper__btnEdit":
				console.log(event.target);
				break;
			default:
				break;
		}
	});
};
init();
