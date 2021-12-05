const drawList = (dataType) => {
	const toDoSection = document.querySelector("#toDo");

	toDoSection.innerHTML = "";

	dataType.forEach((item) => {
		toDoSection.innerHTML += `
			<div class="wrapper__toDoItem">
				<div class="wrapper__toDoItemFull">
					<p class="wrapper__tittleName">Tittle:</p>
					<p class="wrapper__tittle">${item.tittle}</p>
					<p class="wrapper__descriptionName">Decscription:</p>
					<p class="wrapper__description">${item.description}</p>
				</div>
				<div class="wrapper__toDoBtn">
					<button class="wrapper__btnEdit">edit</button>
					<button class="wrapper__btnDelete">delete</button>
				</div>
				<button class="wrapper__BtnBegin">begin</button>
			</div>
		`;
	});
};

const deleteCard = (dataType, tittle, description) => {
	dataType.forEach((item, index) => {
		if (item.tittle === tittle && item.description === description) {
			dataType.splice(index, 1);
		}
	});
	drawList(dataType);
};

const editCard = (dataType, tittle, description) => {
	const modalWrapper = document.querySelector(".wrapper__modalGeneralWrapper");
	modalWrapper.style.display = "block";

	const closeButton = document.querySelector("#closeButton");
	closeButton.addEventListener("click", () => {
		modalWrapper.style.display = "none";
	});

	const tittleInModal = document.querySelector(".wrapper__modalInputTittle");
	const descriptionInModal = document.querySelector(
		".wrapper__modalInputDescription"
	);

	tittleInModal.value = tittle;
	descriptionInModal.value = description;

	const submitButton = document.querySelector(".wrapper__submitButton");

	submitButton.addEventListener("click", (event) => {
		event.preventDefault();

		dataType.forEach((item, index) => {
			if (item.tittle === tittle && item.description === description) {
				dataType.splice(index, 1, {
					tittle: tittleInModal.value,
					description: descriptionInModal.value,
				});
			}
		});

		modalWrapper.style.display = "none";
		drawList(dataType);
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
				const card = event.target.closest(".wrapper__toDoItem");
				const tittle = card.querySelector(".wrapper__tittle").textContent;
				const description = card.querySelector(".wrapper__description").textContent;

				deleteCard(data.toDo, tittle, description);
				break;

			case "wrapper__btnEdit":
				const cardForModal = event.target.closest(".wrapper__toDoItem");
				const tittleForModal =
					cardForModal.querySelector(".wrapper__tittle").textContent;
				const descriptionForModal = cardForModal.querySelector(
					".wrapper__description"
				).textContent;
				editCard(data.toDo, tittleForModal, descriptionForModal);
				break;
			case "wrapper__BtnBegin":
				
				break;
			default:
				break;
		}
	});
};
init();
