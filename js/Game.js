class Game {
    constructor(phrases = new Phrase().randomPhrase) {
        /*an array of phrases to use with the game (you'll use a method to create new instances of the Phrase class).
        A phrase should only include letters and spaces — no numbers, punctuation or other special characters. Please
        not that I have manipulated my phrases to be more flexible than the original. You can add as many phrases
        as you like and it will automatically transform the phrase into its correct HTML list value.*/
        this.phrases = phrases;
        this.missed = 0;
    }

    // This method randomly retrieves one of the phrases stored in the phrases array.
    getRandomPhrase() {

        let finalPhrase = [];
        let showRandomPhrase = "";

        // A function that picks out a random number dependent on the number of phrases and ensures that two phrases is not shown right after each other
        function getNumber( input ){
            return input[(getNumber.number = Math.ceil(Math.random() * input.length)-1) === getNumber.lastNumber ? getNumber() : getNumber.lastNumber = getNumber.number];
        }

        // Now a single-target phrase in a random order is shown
        const getRandomPhrase = getNumber(this.phrases);
    
        // Iterate through the phrase and store all the list items in a variable we can append later
        for (let i = 0; i < getRandomPhrase.length; i++) {
            showRandomPhrase += getRandomPhrase[i];
        }

        // Target the ul and make the inner HTML to the phrase consisting of several list items
        var list = document.getElementById("phrase").childNodes[1]; 
        list.innerHTML = showRandomPhrase;

        // Push the phrase into the phrases into a final result
        for (let i = 0; i < list.children.length; i++) {
           finalPhrase.push(list.children[i].textContent.toLowerCase());
        }

        // Return the result
        return finalPhrase;

    }

    /* This method checks to see if the button clicked by the player matches a letter in the phrase. If it does not, then call the removeLife() method.
    If the selected letter matches, call the showMatchedLetter() method on the phrase and then call the checkForWin() method. */ 
    handleInteraction( target ) {
  
        const phrase = new Phrase();
        const guess = target.textContent;

        // If checkedLetter returns true then show the matched letter else remove a life.
        if (phrase.checkLetter( guess )) {
            phrase.showMatchedLetter( guess );
            
            // Check for win: if the value returns true then we have a winner
            if (phrase.showMatchedLetter( guess )) {
                this.checkForWin( 1 );
            }

        } else {
            // Checkletter is false the guess is wrong and life should be removed
            this.removeLife();
        }  

    }

    // This method removes a life, removes a heart from the board, and, if the player is out of lives, ends the game.
    removeLife() {
    
        //remove life, heart and end game 
		let hearts = document.getElementsByClassName('tries');
        hearts[0].remove();
        
        const maxLimit = 5;
        this.missed = maxLimit - hearts.length;

			if (this.missed == 5) {
				this.checkForWin(0);
            }
            
    }

    // This method checks to see if the player has selected all of the letters.
    checkForWin( value ) {
        
        // If value is 0 then we have a loser

        if (value === 0) {
            this.gameOver();
        }
        
        // If value is 1 then we have a winner

        if (value === 1) {
            document.getElementById("game-over-message").innerHTML = "YOU ARE A TRUE WINNER!!!";
            document.getElementById("overlay").style.display = "flex";
            document.getElementById("btn__reset").innerHTML = "Try again!";
        }

    }

    // This method displays a message if the player wins or a different message if they lose.
    gameOver() {
        document.getElementById("game-over-message").innerHTML = "GAME OVER! BETTER LUCK NEXT TIME!";
        document.getElementById("overlay").style.display = "flex";
        document.getElementById("btn__reset").innerHTML = "Try again!";
    }

    /* startGame(): calls the getRandomPhrase() method, 
    and adds that phrase to the board by calling the Phrase class'
    addPhraseToDisplay() method. */
    startGame() {
        this.getRandomPhrase();   
    }


}

