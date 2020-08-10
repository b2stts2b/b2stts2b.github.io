let money = 0;
let moneyHeight = 10;
let candy = 0;
let candyHeight = 10;
let books = 0;
let booksHeight = 10;
let FRAMERATE = 30;

let moneyText = document.getElementById("money");
let candyText = document.getElementById("candy");
let booksText = document.getElementById("books");

let moneyBar = document.getElementById('money-bar');
let moneyBarMover = document.getElementById("money-bar-mover");
let candyBar = document.getElementById('candy-bar');
let candyBarMover = document.getElementById("candy-bar-mover");
let booksBar = document.getElementById('books-bar');
let booksBarMover = document.getElementById("books-bar-mover");

let hoverMoney = false;
let hoverCandy = false;
let hoverBooks = false;

let maxHeight = moneyBar.clientHeight;
setInterval(updateHeight, 1000/FRAMERATE);

moneyBar.addEventListener("mouseover", function(){
	hoverMoney = true;
})

moneyBar.addEventListener("mouseout", function(){
	hoverMoney = false;
})

candyBar.addEventListener("mouseover", function(){
	hoverCandy = true;
})

candyBar.addEventListener("mouseout", function(){
	hoverCandy = false;
})

booksBar.addEventListener("mouseover", function(){
	hoverBooks = true;
})

booksBar.addEventListener("mouseout", function(){
	hoverBooks = false;
})

function updateHeight(){
	if (hoverMoney) {
		moneyHeight = Math.min(moneyHeight+3, maxHeight);
	} else{
		moneyHeight = Math.max(moneyHeight-1, 10);
	}
	if (hoverCandy) {
		candyHeight = Math.min(candyHeight+3, maxHeight);
	} else{
		candyHeight = Math.max(candyHeight-1, 10);
	}
	if (hoverBooks) {
		booksHeight = Math.min(booksHeight+3, maxHeight);
	} else{
		booksHeight = Math.max(booksHeight-1, 10);
	}

	moneyBarMover.style.height = `${moneyHeight}px`;
	candyBarMover.style.height = `${candyHeight}px`;
	booksBarMover.style.height = `${booksHeight}px`;

	money += Math.floor(moneyHeight/10);
	candy += Math.floor(candyHeight/10);
	books += Math.floor(booksHeight/10);

	moneyText.innerHTML = `Money: ${money}`;
	candyText.innerHTML = `Candy: ${candy}`;
	booksText.innerHTML = `Books: ${books}`;

}