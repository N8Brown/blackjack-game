/*****************************************************************************
Program: Blackjack
Version: 1.2
Created: 7/3/2018
 Author: Nathan Brown 
*****************************************************************************/

//Program variables

var cardValue = ['Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack','Queen','King','Ace'],
	cardSuit = ['of Hearts','of Diamonds','of Clubs','of Spades'],
	cardDeck = [],
	playersCards = [],
	playerScore = 0,
	pWinsTotal = 0,
	dealersCards = [],
	dealerScore = 0,
	dWinsTotal = 0,
	gameOver = false,
	playerWon = false;

//HTML element variables

var	playerHand = document.getElementById('playerHand'),
	playerScoreboard = document.getElementById('playerScoreboard'),
	dealerHand = document.getElementById('dealerHand'),
	dealerScoreboard = document.getElementById('dealerScoreboard'),
	startMenu = document.getElementById('startMenu'),
	cardTable = document.getElementById('cardTable'),
	playAgain = document.getElementById('playAgain'),
	textArea1 = document.getElementById('textArea1'),
	textArea2 = document.getElementById('textArea2'),
	startButton = document.getElementById('startButton'),
	playerButtons = document.getElementById('playerButtons'),
	hitButton = document.getElementById('hitButton'),
	stayButton = document.getElementById('stayButton'),
	statusButtons = document.getElementById('statusButtons'),	
	yesButton = document.getElementById('yesButton'),
	noButton = document.getElementById('noButton'),
	dealButton = document.getElementById('dealButton'),
	playAgainButtons = document.getElementById('playAgainButtons'),
	playerWins = document.getElementById('playerWins'),
	dealerWins = document.getElementById('dealerWins');

//Starting game view

cardTable.style.display = 'none';

//Button functionalities

startButton.addEventListener('click', function(){
	cardDeck = newDeck();
	startMenu.style.display = 'none';
	cardTable.style.display = 'block';
	// playerButtons.style.display = 'none';
	// playAgain.style.display = 'none';
	dealButton.style.display = 'inline';
	hitButton.style.display = 'none';
	stayButton.style.display = 'none';
	yesButton.style.display = 'none';
	noButton.style.display = 'none';
});

dealButton.addEventListener('click', function(){
	playersCards = [dealCard(), dealCard()];
	playerUpdate();
	dealersCards = [dealCard(), dealCard()];
	dealerUpdate();
	dealButton.style.display = 'none';
	// playerButtons.style.display = 'block';
	hitButton.style.display = 'inline';
	stayButton.style.display = 'inline';
});

hitButton.addEventListener('click', function(){
	playersCards.push(dealCard());
	playerUpdate();
	checkForWinner();
});

stayButton.addEventListener('click', function(){
	gameOver = true;
	checkForWinner();
});

yesButton.addEventListener('click', function(){
	reset();
	// playAgain.style.display = 'none';
	// textArea1.innerText = '';
	yesButton.style.display = 'none';
	noButton.style.display = 'none';
	dealButton.style.display = 'inline';
});

noButton.addEventListener('click', function(){
	reset();
	pWinsTotal = 0;
	dWinsTotal = 0;
	playerWins.innerText ='Wins: ';
	dealerWins.innerText ='Wins: ';
	cardTable.style.display = 'none';
	startMenu.style.display = 'inline';	
});


function newDeck() {

	//Creates a full deck of 52 cards.

	var deck = [];

	for (var suitIndex = 0; suitIndex < cardSuit.length; suitIndex++){
		for (var valueIndex = 0; valueIndex < cardValue.length; valueIndex++){
			var card = {
				suit: cardSuit[suitIndex],
				value: cardValue[valueIndex]
			};
			deck.push(card);
		}
	}

	//Shuffles the cards and returns a full shuffled deck.

	var ctr = deck.length,
		index,
		temp;

	while(ctr > 0){
		index = Math.floor(Math.random() * ctr);
		ctr--;
		temp = deck[ctr];
		deck[ctr] = deck[index];
		deck[index] = temp;
	}
	return deck;
}


function dealCard(){

	//Checks to see if there are any cards left in the deck.
	//If not, a new, shuffled deck is created.

	if(cardDeck.length === 0) {
		cardDeck = newDeck();
		return cardDeck.shift();
	}

	//Otherwise it returns the next card in the deck.

	else {
		return cardDeck.shift(); 
	}
}


function cardString(card){

	//Creates a string output of the given card.

	return card.value + " " + card.suit + "\n";
}


function cardPoints(card){

	//Assigns a numeric value to each card for the purpose of scores

	switch(card.value){
		case 'Ace':
			return 1;
			break;
		case 'Two':
			return 2;
			break;
		case 'Three':
			return 3;
			break;
		case 'Four':
			return 4;
			break;
		case 'Five':
			return 5;
			break;
		case 'Six':
			return 6;
			break;
		case 'Seven':
			return 7;
			break;
		case 'Eight':
			return 8;
			break;
		case 'Nine':
			return 9;
			break;
		default:
			return 10;
			break;
	}
}


function getScore(cardHand){

	//Calculates the score of the given hand. 

	var score = 0,
		hasAce = false;

	for(i = 0; i < cardHand.length; i++){
		var card = cardHand[i];
		score += cardPoints(card);
		if(card.value === 'Ace'){
			hasAce = true;
		}
	}

	if(hasAce && score + 10 <= 21){
		return score + 10;
	}

	return score;
}


function listCards(cardHand){

	//Lists the cards in the given hand in string form.

	var hand = '';

	for(i = 0; i < cardHand.length; i++){
		hand += cardString(cardHand[i]);
	}

	return hand
}


function playerUpdate(){

	//Lists the player's cards and calculates and lists
	//their current score

	playerHand.innerText = listCards(playersCards);
	playerScore = getScore(playersCards);
	playerScoreboard.innerText = playerScore;	
}


function dealerUpdate(){

	//Lists the dealer's cards and calculates and lists
	//their current score

	dealerHand.innerText = listCards(dealersCards);
	dealerScore = getScore(dealersCards);
	dealerScoreboard.innerText = dealerScore;	
}


function checkForWinner(){

	//If the player is done drawing cards, the dealer is dealt cards
	//and a winner is determined based on scores and Blackjack rules

	if(playerScore > 21){
		gameOver = true;
	}

	if(gameOver){

		while(dealerScore < playerScore && playerScore <= 21 && dealerScore <=21){
			dealersCards.push(dealCard());
			dealerUpdate();
		}
		if(playerScore > 21){
			playerWon = false;
		}
		else if(playerScore < 22 && dealerScore > 21){
			playerWon = true;
		}
		else if(playerScore > dealerScore){
			playerWon = true;
		}
		else{
			playerWon = false;
		}

		declareWinner();

		// playerButtons.style.display = 'none';
		// playAgain.style.display = 'inline';
	}

}


function declareWinner(){

	//Declares the winner of the hand based on the status of
	//the playerWon variable, and updates the winner's win
	//total.

	if(playerWon == true){
		textArea1.innerText = 'YOU WIN!\nPlay Again?';
		pWinsTotal++;
		playerWins.innerText = 'Wins: ' + pWinsTotal;
	}
	else if(playerWon == false){
		textArea1.innerText = 'DEALER WINS!\nPlay Again?';
		dWinsTotal++;
		dealerWins.innerText = 'Wins: ' + dWinsTotal;
	}
	
	hitButton.style.display = 'none';
	stayButton.style.display = 'none';
	yesButton.style.display = 'inline';
	noButton.style.display = 'inline';

}


function reset(){

	//Resets the completed game in order to start a new hand

	playersCards = [];
	dealersCards = [];
	playerScore = 0;
	dealerScore = 0;
	gameOver = false;
	playerWon = false;
	playerHand.innerText = '';
	playerScoreboard.innerText = '';
	dealerHand.innerText = '';
	dealerScoreboard.innerText = '';
	textArea1.innerText = '';	
}
