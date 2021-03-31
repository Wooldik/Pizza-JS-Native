import Clear from "./Clear.js";

const basisList = document.getElementById("basis-list");
const ing1List = document.getElementById("ing1-list");
const ing2List = document.getElementById("ing2-list");
const souseList = document.getElementById("souse-list");
const listOrder = document.getElementById("list-order__ul");
const productList = document.getElementById("product-list");
const sumNumId = document.getElementById("sum");
const btn = document.getElementById("order-btn");

let resultSum;

const cartObj = {
	thin: 7,
	lush: 9.22,
	garlic: 11,
	withBoard: 12.6,
	bacon: 3,
	ham: 3.22,
	salami: 2.9,
	сhickenBBQ: 2.6,
	tomato: 7,
	champignons: 9.22,
	cucumber: 11,
	onion: 12.6,
	caesar: 2.49,
	pesto: 2.49,
	cheese: 2.49,
	bechamel: 2.49,
};

let cartFilling = {};
sum.textContent += `Сумма заказа: 0 $`;

const active = function (target) {
	target.classList.add("active");
	productDisableOn(target);
	cart(target);
	resultSum = sumProduct(target);
	outputSum();
};

const remove = function (target) {
	target.classList.remove("active");
	pizza(target);
	deleteIng(target);
	orderON();
	resultSum = sumProduct(target);
	outputSum();
};


basisList.addEventListener("click", ({ target }) => {
	if (target.classList.contains("active")) {
		remove(target);
		productDisableOff(target);
	} else if (basisList.getElementsByClassName("active").length > 0) {

		addIngrid(target);
	} else {
		active(target);
		pizza(target);
		addIngrid(target);
	}
});
ing1List.addEventListener("click", ({ target }) => {
	if (target.classList.contains("active")) {
		remove(target);
		productDisableOff(target);
	} else if (ing1List.getElementsByClassName("active").length > 1) {

		addIngrid(target);
	} else {
		active(target);
		addIngrid(target);
		pizza(target);
	}
});
ing2List.addEventListener("click", ({ target }) => {
	if (target.classList.contains("active")) {
		remove(target);
		productDisableOff(target);
	} else if (ing2List.getElementsByClassName("active").length > 1) {

		addIngrid(target);
	} else {
		active(target);
		addIngrid(target);
		pizza(target);
	}
});
souseList.addEventListener("click", ({ target }) => {
	if (target.classList.contains("active")) {
		remove(target);
		productDisableOff(target);
	} else if (souseList.getElementsByClassName("active").length > 0) {

		addIngrid(target);
	} else {
		active(target);
		addIngrid(target);
		pizza(target);
	}
});

const addIngrid = (target) => {
	if (!target.hasAttribute("disabled")) {
		const span = document.createElement("span");
		const ing = document.createElement("li");
		span.classList.add("textIng");
		span.textContent = target.textContent;
		ing.append(span);
		listOrder.append(ing);
		cross(ing);
		orderON();
	}
};

const cross = (li) => {
	const cros = document.createElement("span");
	cros.textContent = "X";
	cros.classList.add("norm");
	li.append(cros);
};

listOrder.addEventListener("click", ({ target }) => {
	const actives = Array.from(document.getElementsByClassName("active"));

	if (target.classList.contains("norm")) {
		target.parentElement.remove();
		const textElemToDelete = target.parentElement.getElementsByClassName(
			"textIng"
		);

		const span = textElemToDelete[0].textContent.trim();

		actives.forEach((el) => {
			if (el.textContent.trim() === span) {
				el.classList.remove("active");
				pizza();
				delElemDis();
				orderON();

				for (let ing in cartFilling) {
					if (el.textContent.trim().toLocaleLowerCase() === ing) {
						delete cartFilling[ing];
						resultSum = sumProduct(target);
						outputSum();
					}
				}
			}
		});
	}
});

const delElemDis = () => {
	let arr1 = Array.from(basisList.querySelectorAll("[disabled]"));
	let arr2 = Array.from(ing1List.querySelectorAll("[disabled]"));
	let arr3 = Array.from(ing2List.querySelectorAll("[disabled]"));
	let arr4 = Array.from(souseList.querySelectorAll("[disabled]"));

	runDelElem(arr1);
	runDelElem(arr2);
	runDelElem(arr3);
	runDelElem(arr4);
};

const runDelElem = (arr) => {
	for (let li of arr) {
		li.removeAttribute("disabled");
		li.style.color = "black";
	}
};

const deleteIng = (target) => {
	const OrderLiActive = Array.from(listOrder.getElementsByClassName("textIng"));
	const textElem = target.textContent;

	for (let el of OrderLiActive) {
		if (el.textContent === textElem) {
			el.parentElement.remove();
		}
	}
};

const pizza = (target) => {
	let act = document.querySelectorAll(`.active`);

	if (act.length === 1) {
		document.getElementById("img").src = `image/${1}.png`;
	} else if (act.length === 2) {
		document.getElementById("img").src = `image/${2}.png`;
	} else if (act.length === 3) {
		document.getElementById("img").src = `image/${3}.png`;
	} else if (act.length === 4) {
		document.getElementById("img").src = `image/${4}.png`;
	} else if (act.length === 0) {
		document.getElementById("img").src = `image/${0}.png`;
	} else {
		document.getElementById("img").src = `image/${4}.png`;
	}
};

const orderON = () => {
	if (listOrder.children.length >= 4) {
		btn.removeAttribute("disabled");
	} else {
		btn.setAttribute("disabled", "disabled");
	}
};

btn.addEventListener("click", (ev) => {
	Clear();
	resultSum = 0;
	sum.textContent = `Сумма заказа: ${resultSum} $`;
	console.log(cartFilling);
	return cartFilling = {};

});

const productDisableOn = (target) => {
	let listElem = Array.from(target.parentElement.children);
	const amountElemActive = listElem.filter((el) =>
		el.classList.contains("active")
	).length;

	if (target.parentElement.id === "basis-list" && amountElemActive === 1) {
		disabledFor(listElem);
	} else if (
		target.parentElement.id === "ing1-list" &&
		amountElemActive === 2
	) {
		disabledFor(listElem);
	} else if (
		target.parentElement.id === "ing2-list" &&
		amountElemActive === 2
	) {
		disabledFor(listElem);
	} else if (
		target.parentElement.id === "souse-list" &&
		amountElemActive === 1
	) {
		disabledFor(listElem);
	}
};

function disabledFor(listElem) {
	for (let li of listElem) {
		if (!li.classList.contains("active")) {
			li.setAttribute("disabled", "disabled");
			li.style.color = "gray";
		}
	}
}

const productDisableOff = (target) => {
	const listElem = Array.from(target.parentElement.children);
	for (let li of listElem) {
		li.removeAttribute("disabled");
		li.style.color = "black";
	}
};

const cart = (target) => {
	for (let product in cartObj) {
		if (product === target.dataset.id) {
			cartFilling[product] = cartObj[target.dataset.id];
		}
	}
};

function sumProduct(target) {
	let sum = 0;
	for (let key in cartFilling) {
		sum += cartFilling[key];
		if (key === target.dataset.id && !target.classList.contains("active")) {
			delete cartFilling[key];
			let sum = 0;
			for (let key in cartFilling) {
				sum += cartFilling[key];
			}

			return sum.toFixed(2);
		}
	}
	return sum.toFixed(2);
}

const outputSum = () => {
	sum.textContent = `Сумма заказа: ${resultSum} $`;
};


