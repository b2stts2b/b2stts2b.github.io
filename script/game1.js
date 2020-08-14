//OBJECTS
let currencyText = document.getElementById("currency-text");
let bars = document.getElementsByClassName("col");
let barMovers = document.getElementsByClassName('bar-mover');
let barTexts = document.getElementsByClassName("bar-text");
let barButton = document.getElementById("bar-button");
let barButtonText = document.getElementById("bar-button-text");
let upgrades = document.getElementsByClassName("upgrade");
let upgradeGroups = document.getElementsByClassName("upgrade-group");
let hover = new Array(bars.length).fill(false);
let barHeights = new Array(barMovers.length).fill(0);

let currency = 0;
let currencyPerSec = 1;
let buyPrice = 100;
let FRAMERATE = 30;
let maxHeight = bars[0].offsetHeight+4;
let upgradePrices = new Array(upgrades.length).fill(10);
let upSpeed = new Array(barMovers.length).fill(0.5);
let shrinkSpeed = new Array(barMovers.length).fill(5);
let multipliers = new Array(barMovers.length).fill(1);
let timesBought = new Array(upgrades.length).fill(0);

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

for (let l = 1; l < upgradeGroups.length; l++) {
	upgradeGroups[l].style.display = "none";
}

for (let o = 0; o < upgrades.length; o++){
	upgrades[o].addEventListener("mouseover", function(){
		if (currency > upgradePrices[o]){
			upgrades[o].style.backgroundColor = 'green';
		} else {
			upgrades[o].style.backgroundColor = 'red';
		}
	})
}
for (let o = 0; o < upgrades.length; o++){
	upgrades[o].addEventListener("mouseout", function(){
		upgrades[o].style.backgroundColor = "#0000c0";
	})
}

for (let o = 0; o < upgrades.length; o++){
	upgrades[o].addEventListener("click", function(){
		if (currency >= upgradePrices[o]){
			timesBought[o] += 1
			currency -= upgradePrices[o];
			if (o%3==0){
				upSpeed[Math.floor(o/3)] *= 1.25;
				upgradePrices[o] *= 2;
			} else if (o%3==1){
				shrinkSpeed[Math.floor(o/3)] *= 0.95;
				upgradePrices[o] *= 4;
			} else {
				multipliers[Math.floor(o/3)] *= 1.25;
				upgradePrices[o] = Math.pow(10, timesBought[o]+1);
			}
		}
	})
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
				barHeights[i] = Math.min(barHeights[i]+upSpeed[i], maxHeight);
				barMovers[i].style.height = `${Math.round(barHeights[i])}px`
			} else {
				barHeights[i] = Math.max(barHeights[i]-shrinkSpeed[i], 0);
				barMovers[i].style.height = `${Math.round(barHeights[i])}px`;
			}	
		}
	}
}

function updateCurrency(){
	let newCurrencyPerSec = 1;
	for (let j = 0; j < barMovers.length; j++) {
		newCurrencyPerSec *= (1+Math.floor(barHeights[j]/16))*multipliers[j];
	}
	currencyPerSec = newCurrencyPerSec;
	currency += currencyPerSec/FRAMERATE;
}

function updateText(){
	currencyText.innerHTML = `Currency: ${Math.floor(currency)} (${Math.floor(currencyPerSec)}/s)`
	barButtonText.innerHTML = `Buy new bar\ncost: ${Math.ceil(buyPrice)}`;
	for (let k = 0; k < barTexts.length; k++) {
		barTexts[k].innerHTML = `x${Math.floor((1+Math.floor(barHeights[k]/16))*multipliers[k])}`;
	}

	for (let n = 0; n < upgrades.length; n++) {
		if (n%3==0){
			upgrades[n].innerHTML = `Go up faster.\nCost: ${upgradePrices[n]}`
		} else if (n%3==1){
			upgrades[n].innerHTML = `Shrink slower.\nCost: ${upgradePrices[n]}`
		} else {
			upgrades[n].innerHTML = `Multi more.\nCost: ${upgradePrices[n]}`
		}
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
				upgradeGroups[m].style.display = "block";
				buyPrice *=2	;
				break;
			}
		}
	}
}

