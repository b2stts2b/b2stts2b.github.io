let money = 0;
let candy = 0;
let books = 0;

let moneyObj = document.getElementById("money");
let candyObj = document.getElementById("candy");
let booksObj = document.getElementById("books");


function add(resource){
	switch (resource) {
		case "money":
			money++;
			moneyObj.innerHTML = `Money: ${money}`
			break;
		case "candy":
			candy++;
			candyObj.innerHTML = `Candy: ${candy}`
			break;
		case "books":
			books++;
			booksObj.innerHTML = `Books: ${books}`
			break;
	}
}