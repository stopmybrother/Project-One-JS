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
    		<p class="wrapper__text">Tittle: ${array[index].tittle}</p>
    		<p class="wrapper__text">Description: ${array[index].description}</p>
    		<button class="wrapper__btnEdit">EDIT</button>
    		<button class="wrapper__btnDelete">DELETE</button>
		`;
	});
});
console.log(data);
