
class Phrase {

    constructor() {
        this.randomPhrase = this.addPhraseToDisplay();
    }

    /* this adds letter placeholders to the display when the game starts. Each letter is presented by an empty box,
    one list item for each letter. See the example_phrase_html.txt file for an example of what the render HTML
    for a phrase should look like when the game starts. When the player correctly guesses a letter, the empty box is replaced with
    a the matched letter (see the showMatchedLetter() method below. Make sure the phrase displayed on the screen doesn't include spaces.*/

    addPhraseToDisplay() {

        const phrase = document.createElement('li');

        // Secret phrases. You can add as many phrases as you like.
        const secret_phrases = [
            'I am groot',
            'Superman',
            'I am a tech degree student',
            'I am a nerd',
            'JavaScript',
            'Marcuz is very cool'
        ];

        // A 2-dimensional phrases constructor 
        let phrases_constructor = [];

        // Different phrase values we need for later manipulation
        let lengthOfPhrases = [];
        let listOfPhrases = [];
        let finalPhrases = [];

        /* Iterate through all the secret phrases and split the phrases into single letter strings so the first one
        will be an array of: ["i", " ", "a", "m", " ", "g", "r", "o", "o", "t"]. */
        for (let i = 0; i < secret_phrases.length; i++) {

            // Split each phrase into a single letter with a split method.
            phrases_constructor.push(secret_phrases[i].split(/(?!$)/u));
            
        }

        /* Iterate through the 2-dimensional phrases constructor. Manipulate each letter in the array and transform it to
        the correct HTML value. Example: If it finds a single letter-string "a" in the array, then it should transform it to
        "<li class='hide letter a>a</li> and if its a space it should say: "<li class='hide space'></li>". This enables the app
        to transform single letter-strings into a correct HTML equavilent so we can push as many secret phrases into the program as we like. */

        for (let i = 0; i < phrases_constructor.length; i++) {

            // Pushes the length of each phrase string into an array.
            lengthOfPhrases.push(phrases_constructor[i].length);            

            for (let o = 0; o < phrases_constructor[i].length; o++) {
                    
                    // All strings that is equal to an space
                    if (phrases_constructor[i][o] === " ") {
                        listOfPhrases.push("<li class='hide space'></li>");
                    }
                    
                    // All string that is not equal to space in the array
                    if (phrases_constructor[i][o] !== " ") {
                        listOfPhrases.push("<li class='hide letter "+phrases_constructor[i][o]+"'>"+phrases_constructor[i][o]+"</li>");
                    }   
            }            
        };
        
        //////////////////////////////////
        //  Extra info:                 //
        //  The list of phrases         //
        //  in the above 2d loop        //
        //  generates one big           //
        //  confusing array.            //
        //  Everything below is how     //
        //  to create a perfect usuable //
        //  array from a total non-     //
        //  usabale array.              //
        //////////////////////////////////

        /* Concat the lengthOfPhrases with the listOfPhrases. This will generate 
        an array consisting of integers and strings. I can then filter the array
        to only give me the integers. The integers represents the length of each 
        secret phrase and is used to make a clean array */
        const totalPhrases = lengthOfPhrases.concat(listOfPhrases).filter(a => /^\d+$/.test(a));

        /* This for loop creates a perfect phrases array which is nested so
        each phrase has its own index number. The for loop iterates through 
        all the length of every secret phrase and then splices the listOfPhrases
        so it matches the length. */
        for (let i = 0; i <= totalPhrases.length; i++) {
            finalPhrases.push(listOfPhrases.splice(0, totalPhrases[i]));
        }
        
        /* For some unknown reason the array adds an extra empty array at the end. 
        My guess is that it is the above loop that causes it. But it is easier 
        to fix than to figure out */
        finalPhrases.pop();
        
        // Now the array is perfect! See for yourself in the console:
        // console.log(finalPhrases);

        // Return the result
        return finalPhrases;
    }

    // Checks to see if letter selected by player matches a letter in the phrase.
    checkLetter( target ) {

        // Store each secret letter in an array
        let secretLetter = [];
 
        // Get the letter value the user has pressed
        const guess = target;
    
        // Get secret phrase
        const secretPhrases = document.querySelectorAll(".hide");
        
        // Iterate through the secret phrase and store the letter
        for (let i = 0; i < secretPhrases.length; i++) {
            secretLetter.push(secretPhrases[i].textContent.toLowerCase());
        }
        
        // Filter all correct letters (if a letter in the list is equal to the guess; we store the result)
        let correctGuess = secretLetter.filter(list => list === guess);
        
        /* If the length of correct guess is more than one, then we have a correct guess
        and want to show the matched letter on the screen. If its wrong we want to remove a life */
        if (correctGuess.length > 0) {
            // Correct guess
            return true;
        } else {
            // Wrong guess
            return false;
        }

    }

    // Reveals the letter(s) on the board that matches player's selection.
    showMatchedLetter( letter ) {
        
        // Store each secret letter in an array
        let secretLetter = [];

        // Get secret phrase
        const secretPhrases = document.querySelectorAll(".hide");
        
        // Iterate through the secret phrase and store the letter
        for (let i = 0; i < secretPhrases.length; i++) {
            secretLetter.push(secretPhrases[i].textContent.toLowerCase());
        }
        
        /* I filter the secret letter array with "" to remove the spaces
        and get a clean array which length represents the total amount
        of letters needed to be correct in order to win */
        const correctLettersToWin = secretLetter.filter( list => list !== "");

        // How many correct letters is needed to win?
        const weHaveAWinner = correctLettersToWin.length;

        // Find all list items
        const secretPhrase = document.querySelectorAll(".hide");
        
        /* Iterate through all the secret phrases. If a letter matches the
        correct letter then we want to show it and give it a class */
        secretPhrase.forEach((element, index) => {
            if (element.textContent.toLowerCase() === letter) {
                element.style.color = "#555";
                element.classList.add("correct");
            }
        });

        // Find all correct guesses
        const correctLetters = document.getElementsByClassName("correct");

        /* If the number of correct classes is equal to the length needed to win
        - then we have a winner! */
        if (weHaveAWinner === correctLetters.length) {
            // If true then run checkForWin
            return true;
        }
    }
}

