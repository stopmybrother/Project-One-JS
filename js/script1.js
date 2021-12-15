const commonVariables = (eventTarget, data) => {
	const sectionId = eventTarget.closest(".section").id;
	const card = eventTarget.closest(".wrapper__card");
	const cardId = +card.id;
	const deletedCard = data[sectionId].filter((card) => card.id === cardId)[0];
	const deletedCardIndex = data[sectionId].findIndex(
		(card) => card.id === deletedCard.id
	);

	return { sectionId, deletedCard, deletedCardIndex };
};

const drawList = (data, sectionType) => {
	const section = document.querySelector(`#${sectionType}`);

	section.innerHTML = "";

	data[sectionType].forEach((item) => {
		section.innerHTML += `
			<div class="wrapper__card" id=${item.id}>
				<div class="wrapper__toDoListItemFull">
					<p class="wrapper__tittleName">Tittle:</p>
					<p class="wrapper__tittle">${item.tittle}</p>
					<p class="wrapper__descriptionName">Decscription:</p>
					<p class="wrapper__description">${item.description}</p>
				</div>
				${
					sectionType !== "deleted"
						? `
						<div class="wrapper__toDoListBtn">
							<div class="wrapper__editAndDeleteBtns">
								<button class="wrapper__btnEdit">edit</button>
								<button class="wrapper__btnDelete">delete</button>
							</div>
							<button class="wrapper__btnNext">next</button>
						</div>
					`
						: `
						<button class="wrapper__btnRestore">restore</button>
					`
				}
			</div>
		`;
	});
};

const createCard = (data) => {
	const form = document.querySelector("#form");
	const inputTittle = document.querySelector("#inputTittle");
	const inputDescription = document.querySelector("#inputDescription");

	data.toDo.push({
		tittle: inputTittle.value,
		description: inputDescription.value,
		id: Date.now(),
	});

	form.reset();

	drawList(data, "toDo");
};

const deleteCard = (eventTarget, data) => {
	const { sectionId, deletedCard, deletedCardIndex } = commonVariables(
		eventTarget,
		data
	);

	data[sectionId].splice(deletedCardIndex, 1);
	data.deleted.push(deletedCard);

	drawList(data, sectionId);
	drawList(data, "deleted");
};

const editCard = (eventTarget, data) => {
	const { sectionId, deletedCard, deletedCardIndex } = commonVariables(
		eventTarget,
		data
	);

	const modalWrapper = document.querySelector(".wrapper__modalGeneralWrapper");
	const tittleInModal = document.querySelector(".wrapper__modalInputTittle");
	const descriptionInModal = document.querySelector(
		".wrapper__modalInputDescription"
	);

	const closeButton = document.querySelector(".wrapper__roundButton");
	const submitButton = document.querySelector(".wrapper__submitButton");

	modalWrapper.style.display = "block";

	tittleInModal.value = deletedCard.tittle;
	descriptionInModal.value = deletedCard.description;

	const editEventListener = (event) => {
		event.preventDefault();

		data[sectionId].splice(deletedCardIndex, 1, {
			tittle: tittleInModal.value,
			description: descriptionInModal.value,
			id: deletedCard.id,
		});

		closeModal();
	};

	const closeModal = () => {
		submitButton.removeEventListener("click", editEventListener);

		modalWrapper.style.display = "none";
		drawList(data, sectionId);
	};

	submitButton.addEventListener("click", editEventListener);

	closeButton.addEventListener("click", (event) => {
		event.preventDefault();

		closeModal();
	});
};

const transferCardToAnotherSection = (eventTarget, data) => {
	const { sectionId, deletedCard, deletedCardIndex } = commonVariables(
		eventTarget,
		data
	);
	const sectionsId = [...document.querySelectorAll(".section")].map(
		(section) => section.id
	);
	const nextSectionIndex = sectionsId.findIndex((id) => id === sectionId) + 1;

	data[sectionId].splice(deletedCardIndex, 1);
	data[sectionsId[nextSectionIndex]].push(deletedCard);

	drawList(data, sectionId);
	drawList(data, sectionsId[nextSectionIndex]);
};

const restoreCard = (eventTarget, data) => {
	const { sectionId, deletedCard, deletedCardIndex } = commonVariables(
		eventTarget,
		data
	);

	data[sectionId].splice(deletedCardIndex, 1);
	data.toDo.push(deletedCard);

	drawList(data, sectionId);
	drawList(data, "toDo");
};

const emptyTrash = (data) => {
	data.deleted = [];
	drawList(data, "deleted");
};

const init = () => {
	const toDoList = document.querySelector("#toDoList");
	const clickBtn = document.querySelector("#clickBtn");
	const emptyTrashBtn = document.querySelector(".header__emptyTrashBtn");

	const data = {
		toDo: [],
		inProgress: [],
		done: [],
		deleted: [],
	};

	clickBtn.addEventListener("click", (event) => {
		event.preventDefault();

		createCard(data);
	});

	toDoList.addEventListener("click", (event) => {
		switch (true) {
			case [...event.target.classList].includes("wrapper__btnDelete"):
				deleteCard(event.target, data);
				break;
			case [...event.target.classList].includes("wrapper__btnEdit"):
				editCard(event.target, data);
				break;
			case [...event.target.classList].includes("wrapper__btnNext"):
				transferCardToAnotherSection(event.target, data);
				break;
			case [...event.target.classList].includes("wrapper__btnRestore"):
				restoreCard(event.target, data);
				break;
			case [...event.target.classList].includes("wrapper__emptyTrashBtn"):
				emptyTrash(data);
				break;
		}
	});
};
init();
