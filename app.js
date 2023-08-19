// Get references to HTML elements
const turn = document.getElementById("turn");
const winLose = document.getElementById("win-lose");
const tryButton = document.getElementById("tryAgain");

// Define winning conditions for the game
const winCondition = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

// Array of input elements representing the game cells
const ipElements = [
    document.getElementById("input1"),
    document.getElementById("input2"),
    document.getElementById("input3"),
    document.getElementById("input4"),
    document.getElementById("input5"),
    document.getElementById("input6"),
    document.getElementById("input7"),
    document.getElementById("input8"),
    document.getElementById("input9"),
];

// Variables for player turns and symbols
let turnX = true;
const X = "X";
const Y = "Y";

// Function to handle cell click events
function clickEvent() {
    ipElements.forEach((element) => {
        element.addEventListener("click", () => {
            if (element.textContent === "" && !winLose.style.display) {
                element.textContent = turnX ? X : Y;
                element.style.color = "white";
                turnX = !turnX;
                turnMessage();
                checkForWin();
            }
        });
    });
}

// Function to display the current player's turn
function turnMessage() {
    turn.innerHTML = turnX ? "It's X's Turn" : "It's Y's Turn";
}

// Function to check if the game has been won
function checkForWin() {
    for (const condition of winCondition) {
        const [a, b, c] = condition;
        const ipA = ipElements[a - 1].textContent;
        const ipB = ipElements[b - 1].textContent;
        const ipC = ipElements[c - 1].textContent;

        if (ipA === ipB && ipB === ipC && ipA !== "") {
            winLose.style.display = "block";
            winLose.textContent = `${ipA} wins!`;
            highlightWinningCells(a, b, c);
            endGame();
            return;
        }
    }

    const isTie = ipElements.every((element) => element.textContent !== "");
    if (isTie) {
        winLose.style.display = "block";
        winLose.textContent = "It's a tie!";
        endGame();
    }
}

// Function to highlight winning cells
function highlightWinningCells(a, b, c) {
    ipElements[a - 1].style.backgroundColor = "green";
    ipElements[b - 1].style.backgroundColor = "green";
    ipElements[c - 1].style.backgroundColor = "green";  
}

// Function to end the game
function endGame(){
    tryButton.style.display = "block";
}

// Function to restart the game
function restartGame(){
    location.reload();
}

// Function to start the game
function startGame() {
    clickEvent();
    turnMessage();
}

// Run the game when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    startGame();
});

// Add event listener to "Play Again" button
tryButton.addEventListener("click", () =>{
    restartGame();
});