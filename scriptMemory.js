const gameContainer = document.getElementById("game");
let firstCard = null ;
let secondCard = null ;
let cardCount = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (noClicking) return;
if (event.target.classList.contains("flipped")) return;

let cardPicked = event.target;
cardPicked.style.backgroundColor = cardPicked.classList[0];

if(!firstCard || !secondCard ) {
cardPicked.classList.add("flipped");
firstCard = firstCard || cardPicked;
secondCard = cardPicked === firstCard ? null : cardPicked;
}

if(firstCard && secondCard) {
  noClicking = true

  if(firstCard.className === secondCard.className) {
    cardCount += 2;
    firstCard.removeEventListener("click", handleCardClick);
    secondCard.removeEventListener("click", handleCardClick);
    firstCard = null
    secondCard = null
    noClicking = false
  }
  else {
    setTimeout(function() {
      firstCard.style.backgroundColor = '';
      secondCard.style.backgroundColor = '';
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard = null;
      secondCard = null;
      noClicking = false
    }, 1000)
  }
}
}

// when the DOM loads
createDivsForColors(shuffledColors);
