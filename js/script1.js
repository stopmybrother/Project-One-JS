const inputTittle = document.querySelector("#inputTittle");
const inputDescription = document.querySelector("#inputDescription");
const clickBtn = document.querySelector("#clickBtn");
const wrapperItem = document.querySelector("#wrapperItem");

const data = [];
let obj = {};

clickBtn.addEventListener("click", () => {
	obj = {
		tittle: "",
		description: "",
	}; // not sure

	obj.tittle = inputTittle.value;
	obj.description = inputDescription.value;

	inputTittle.value = "";
	inputDescription.value = "";

	data.push(obj);
	wrapperItem.innerHTML = "";
	data.forEach((_item, index, array) => {
		wrapperItem.innerHTML += `
			<div class="wrapper__capsule">
				<div class="wrapper__capsuleText">
					<p class="wrapper__text">Tittle: ${array[index].tittle}</p>
					<p class="wrapper__text">Description: ${array[index].description}</p>
				</div>
				<div class="wrapper__capsuleBtn">
					<button class="wrapper__btnEdit">edit</button>
					<button class="wrapper__btnDelete">delete</button>
				</div>
			</div>
		`;
	});
	console.log(data);
});
