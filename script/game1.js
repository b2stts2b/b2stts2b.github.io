//OBJECTS
let currencyText = document.getElementById("currency-text");
let bars = document.getElementsByClassName("col");
let barMovers = document.getElementsByClassName('bar-mover');
let barTexts = document.getElementsByClassName("bar-text");
let barButton = document.getElementById("bar-button");
let barButtonText = document.getElementById("bar-button-text");
let hover = new Array(bars.length).fill(false);
let barHeights = new Array(barMovers.length).fill(0);

let currency = 0;
let currencyPerSec = 1;
let buyPrice = 10;
let FRAMERATE = 30;
let maxHeight = bars[0].offsetHeight+4;

//Add mouseover event
for (let i = 0; i < bars.length; i++) {
	bars[i].addEventListener("mouseover",function(){
		hover[i] = true;
	})
}
for (let i = 0; i < bars.length; i++) {
	bars[i].addEventListener("mouseout",function(){
		hover[i] = false;
	})
}

for (let l = 1; l < barMovers.length; l++) {
	bars[l].style.display = "none";
}

//New button div
barButton.addEventListener("mouseover", function(){
	if (currency > buyPrice){
		barButton.style.backgroundColor = "green";
	} else {
		barButton.style.backgroundColor = "red";
	}
})
barButton.addEventListener("mouseout", function(){
	barButton.style.backgroundColor = "#444";
})
barButton.onclick =  purchaseBar;


setInterval(updateHeight, 1000/FRAMERATE);
setInterval(updateCurrency, 1000/FRAMERATE);		
setInterval(updateText, 1000/FRAMERATE);

function updateHeight(){
	for (let i = 0; i < bars.length; i++) {
		if (barMovers[i]) {
			if (hover[i]){
				barHeights[i] = Math.min(barHeights[i]+1, maxHeight);
				barMovers[i].style.height = `${barHeights[i]}px`
			} else {
				barHeights[i] = Math.max(barHeights[i]-1, 0);
				barMovers[i].style.height = `${barHeights[i]}px`;
			}	
		}
	}
}

function updateCurrency(){
	let newCurrencyPerSec = 1;
	for (let j = 0; j < barMovers.length; j++) {
		newCurrencyPerSec *= 1+Math.floor(barHeights[j]/10);
	}
	currencyPerSec = newCurrencyPerSec;
	currency += currencyPerSec/FRAMERATE;
}

function updateText(){
	currencyText.innerHTML = `Currency: ${Math.floor(currency)} (${Math.floor(currencyPerSec)}/s)`
	barButtonText.innerHTML = `Buy new bar\ncost: ${Math.ceil(buyPrice)}`;
	for (let k = 0; k < barTexts.length; k++) {
		barTexts[k].innerHTML = `x${1+Math.floor(barHeights[k]/10)}`;
	}
}

function purchaseBar(){
	if (currency > buyPrice){
		currency -= buyPrice;
		for (let m = 0; m < barMovers.length; m++) {
			if(bars[m].style.display == "none"){
				if (m==barMovers.length-1){
					barButton.style.display = "none";
				}
				bars[m].style.display = "block";
				buyPrice *=2	;
				break;
			}
		}
	}
}
