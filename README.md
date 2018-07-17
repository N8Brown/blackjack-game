# blackjack-game
A web-based blackjack game using HTML, CSS, and Javascript

The purpose of this project is to build a basic Blackjack game simulator that keeps scores for one player and one dealer, using only 
HTML, CSS, and Javascript.

/*****************************************************************************
Program: Blackjack
Version: 1.2
Created: 7/3/2018
 Author: Nathan Brown 
******************************************************************************
Revision History
******************************************************************************
7/3/2018 - v1.2
	
	Eliminated the checkEndGame() function and combined it with the 
	checkForWinner() function to eliminate unnecessary lines of code.

	Added the following HTML element variables:

	* playerWins -	HTML element id for storing player win totals
	* dealerWins - 	HTML element id for storing dealer win totals

	Added the following program variables:

	* pWinsTotal - 	Initial value of zero. Is used to keep track of number of 
					hands won by the player during an active game. Resets to
					zero when the "No" button is clicked.
	* dWinsTotal - 	Initial value of zero. Is used to keep track of number of
					hands won by the dealer during an active game. Resets to
					zero when the "No" button is clicked.
	* playerWon - 	Initial value of false. Is set in the checkForWinner() 
					function and interpreted by the declareWinner() function.

	Added the following functions:

	* declareWinner() - If playerWon variable is set to true, declares the
						player the winner of the hand and increases player win
						total by 1. If playerWon variable is set to false,
						declares the dealer the winner of the hand and increases
						dealer win total by 1. 

	The program now keeps a running tally of the number of wins for both the
	dealer and the player. These win totals appear beneath he Player and
	Dealer titles in the game space.
******************************************************************************
7/2/2018 - v1.1
	Added the following functions to make code more concise and eliminate
	unnecessry lines of code:

	* playerUpdate() - 	Updates the player's card array, card list, and hand
						score when called.
	* dealerUpdate() -  Updates the dealer's card array, card list, and hand
						score when called.
	* reset() - Resets the player and dealer card arrays, card lists, and hand
				scores once a hand is completed and a new hand is dealt.

	Overall functionality and appearance of the program stayed the same.
*****************************************************************************/
