var cardSuit = ["hearts", "diamonds", "clubs", "spades"],
    cardValue = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
    cardDeck = [];

var playersCards = [],
    playersHand = document.getElementById('playersHand');

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

function displayCards(cardHand){
	for(i = 0; i < cardHand.length; i++){
        var card = document.createElement("div"),
            suit = cardHand[i].suit,
            cardTop = document.createElement("div"),
            cardCenter = document.createElement("div"),
            cardBottom = document.createElement("div"),
            playersHand = document.getElementById('playersHand');

        card.classList.add('card', suit);
        cardTop.classList.add('top-suit');
        cardCenter.classList.add('card-value');
        cardBottom.classList.add('bottom-suit');

        cardTop.innerHTML = cardFaceSuit(cardHand[i]);
        cardCenter.innerHTML = cardHand[i].value;
        cardBottom.innerHTML = cardFaceSuit(cardHand[i]);

        card.appendChild(cardTop);
        card.appendChild(cardCenter);
        card.appendChild(cardBottom);
		playersHand.appendChild(card);
	}
}

function cardFaceSuit(card){
	switch(card.suit){
		case 'hearts':
			return '&hearts;';
			break;
		case 'diamonds':
			return '&diams;';
			break;
		case 'clubs':
			return '&clubs;';
			break;
		case 'spades':
			return '&spades;';
			break;
	}
}
