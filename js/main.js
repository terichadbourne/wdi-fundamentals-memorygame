var cards = [
	{
		rank: "queen", 
		suit: "hearts", 
		cardImage: "images/queen-of-hearts.png"
	}, 
	{
		rank: "queen", 
		suit: "diamonds", 
		cardImage: "images/queen-of-diamonds.png"
	}, 
	{
		rank: "king", 
		suit: "hearts", 
		cardImage: "images/king-of-hearts.png"
	}, 
	{
		rank: "king", 
		suit: "diamonds", 
		cardImage: "images/king-of-diamonds.png"
	}
];

var score = 0;
var cardsInPlay = [];

var shuffleButton = document.getElementById('shuffle');
var scoreButton = document.getElementById('clearScore');
var scoreboard = document.getElementById('score');


//shuffle function adapted from Fisher-Yates as described by Frank Mitchell 
//at https://www.frankmitchell.org/2015/01/fisher-yates/
var shuffle = function() {
  var i = 0;
  var j = 0;
  var temp = null;

  for (i = cards.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = cards[i]
    cards[i] = cards[j]
    cards[j] = temp
  }
  //after shuffling cards array, use it to recreate board
  createBoard();
}

var createBoard = function() {
	//clear out cardsInPlay array
	cardsInPlay = [];
	//remove all card elements from game board
	document.getElementById('game-board').innerHTML = "";
	//loop through card array and display each card (face down) on game board
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', "images/back.png");
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
}

//checks for match if there are 2 cards in play
var checkForMatch = function() {
	//if 2 cards in play, check for match and alert accordingly
	if (cardsInPlay.length === 2) {
		if (cardsInPlay[0] === cardsInPlay[1]) {
			alert("You found a match!");
			//add one to score and update display
			score +=1;
			scoreboard.innerHTML = score;
		} else {
			alert("Sorry, try again.");
		}
		//flip over cards and clear out cardsInPlay array (no shuffle)
		createBoard();
	}
}

//when card is clicked, add card to cards in play 
var flipCard = function() {
	var cardId = this.getAttribute('data-id');
	this.setAttribute('src', cards[cardId].cardImage);
	console.log("user flipped " + cards[cardId].rank);
	console.log(cards[cardId].cardImage);
	console.log(cards[cardId].suit);
	cardsInPlay.push(cards[cardId].rank);
	//delay on checking for match makes 2nd card flip before alert pops up
	setTimeout(checkForMatch, 400);
}

//resets score to zero and updates scoreboard display
var resetScore = function () {
	score = 0;
	scoreboard.innerHTML = score;
}


//to do on page load
resetScore();
shuffle();
createBoard();


shuffleButton.addEventListener('click', shuffle);
scoreButton.addEventListener('click', resetScore);
