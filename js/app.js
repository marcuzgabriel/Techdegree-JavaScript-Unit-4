/* This function resets and starts the game. In the exceeds
it says; that a new button should be created that resets the game.
This is extra work. Therefore, I just changed the button text to (try again)
and ensured that everytime the button is clicked then the game starts resets */
function resetDisplay() {

    // Target the overlay and set the display to none
    document.getElementById('overlay').style.display = 'none';

    // Target all the keys (letters)
    const allKeys = document.getElementsByClassName('key');
    
    // If any keys is disalbed then reset them and restore their color
    for (let i = 0; i < allKeys.length; i++) {
        allKeys[i].removeAttribute("disabled");
        allKeys[i].style.color = "rgba(0, 0, 0, 1)";
    }
    
    // Figure out if there is any hearts shown on the screen
    hearts = document.querySelectorAll(".tries");

    // Remove all hearts
    hearts.forEach((element, index) => {
       element.remove();
    });

    // Add 5 new hearts
    for (let i = 0; i < 5; i++) {
        const heartParent = document.createElement("li");
        const heartIMG = document.createElement("img");

        // Set styles and attributes
        heartParent.setAttribute("class", "tries");
        heartIMG.setAttribute("src", "images/liveHeart.png");
        heartIMG.setAttribute("style", ` 
        height: 35px;
        width: 35px;    
        margin-left: 5px;
        `
        );

        // Append to each other
        heartParent.appendChild(heartIMG);
        document.querySelector("#scoreboard ol").appendChild(heartParent);
    }
}

/* This function is called when a player selects a letter. It disables
the button on the onscreen keyboard and calls the handleInteraction()
method of the Game class. */

function markButton() {

    const keyrows = document.querySelectorAll(".key");
    
    for (let i = 0; i < keyrows.length; i++) {

        // Add event listeners to each of the keyboard buttons, so that clicking a button calls the markButton() function.
        keyrows[i].addEventListener('click', (e) => {
            e.preventDefault();
         
            // Handle inteaction
            new Game().handleInteraction(e.target);
            e.target.setAttribute("disabled", true);
            e.target.style.color = "rgba(0,0,0,0.2)";
        });

        // Exeeds add event listeners for key presses
        document.addEventListener('keypress', (e) => {
            const keyName = e.key;
           
            if (keyName === keyrows[i].textContent) {
                const target = keyrows[i];
                new Game().handleInteraction(target);
                target.setAttribute("disabled", true);
                target.style.color = "rgba(0,0,0,0.2)";
            }
        });
    }
}

// Run the function so its active
markButton();

// Add an event listener to the "Start Game" button which calls the resetDisplay() function, creates a new Game object, and starts the game.
document.getElementById('btn__reset').addEventListener('click', function() {
    new Game().startGame();
    resetDisplay();
})


