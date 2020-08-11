let currencyText = document.getElementById("currency-text");
let bars = document.getElementsByClassName("col");
let barMovers = document.getElementsByClassName('bar-mover');
let barTexts = document.getElementsByClassName("bar-text");
let hover = new Array(bars.length).fill(false);
let barHeights = new Array(barMovers.length).fill(0);


let currency = 0;
let currencyPerSec = 1;
let FRAMERATE = 30;
let maxHeight = bars[0].clientHeight;

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

setInterval(updateHeight, 1000/FRAMERATE);
setInterval(updateCurrency, 1000/FRAMERATE);		
setInterval(updateText, 1000/FRAMERATE);

function updateHeight(){
	for (let i = 0; i < bars.length; i++) {
		if (hover[i]){
			barHeights[i] = Math.min(barHeights[i]+1, maxHeight);
			barMovers[i].style.height = `${barHeights[i]}px`
		} else {
			barHeights[i] = Math.max(barHeights[i]-1, 0);
			barMovers[i].style.height = `${barHeights[i]}px`;
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
	for (let k = 0; k < barTexts.length; k++) {
		barTexts[k].innerHTML = `x${1+Math.floor(barHeights[k]/10)}`;
	}
}
