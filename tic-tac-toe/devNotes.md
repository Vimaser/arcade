These are just notes I'm keeping as I code for a reference of my thoughts on this project, where I stumbled, and where I found success.

Project started by looking at different youtube videos on tic-tac-toe and incorporating elements into my code. Ideally, the simpler the better for my project. However, upon implementation of different elements asked for, this is where I ran into difficulty. My originaly goal was to push these out as basic, but running and passable as possible. Why? Well time constraints. Fortunately, I have most of these finished besides the Mancala project. A.I implementation has not been done yet and certain elements like score board and playernames have not been implemented. Ideally, I want to stick to only one JS file, one HTML file, and one CSS file per game. Scoreboard, despite being relatively simple, has been a challenge so far. It's mostly going back, relooking at where I started. Then figureing out where to put it. 

//Break two more .js files

We need a scoreboard, we can tie it to our existin score function to eleminate wasteful code.
Styling can be done in main .css script. Shouldn't be an issue. Scoreboard function needs to return based on wins and tie into the current player NAME not X or O! FIX THIS ASAP! Try to get this working before monday. 

As for minimax AI, speak with either Brian or Paris on this. YouTube is a poor source of information on this. Minimax script is not completely implemented yet. Focus on score board, base game is functional, we are now trying to fix issues and implement features! Focus on this Monday. This will bleed into the other projects. Once A.I. is implemented.

1. Set counter on rounds won for X - then go from there.


Find a simple and elegant solution!!!

PlayerX and PlayerO scores.

////////////////////////////
let PlayerXScore = 0;
let PlayerOScore = 0;


function checkWinner() {
    let roundWon = false;
        for(let i = 0; i < winConditions.length; i++){
            const condition = winConditions[i];
            const cellA = options[condition[0]];
            const cellB = options[condition[1]];
            const cellC = options[condition[2]];
 
           if(cellA == "" || cellB == "" || cellC == "") {
            continue;
           }
           if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
           }
        }
        if(roundWon) {
            if(currentPlayer == "X") {
                PlayerXScore++;
            } else {
                PlayerOScore++;
            }
            statusText.textContent = `${PlayerXScore} X's and ${PlayerOScore} O's`;
            running = false;
        }

        if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
        } 
        else if(!options.includes("")){
            statusText.textContent = 'Draw!';
            running = false;
        }
        else{
            changePlayer(); 
        }
    }

////////////////////////////////////////////////////////////////////////

What am I doing wrong here?
Current code doesn't stop the game anymore. 
Instead it goes to next player even when the board is filled.
--Syntax error? Am I overridign the logic here?

^I have typo errors for sure. Probably shouldn't pull an allnighter...

Found it!

I need to change the player currentPlayer player string in both updatePlayer and updateCell funcions! 

Fixed it! Woop woop!

////

Right now I have a random A.I. the minimax project is a little bit more than I can chew lol. I often make that mistake in my life... I may write a rule based A.I. later, but for now I need to make sure I have an a.i. implemented in connect 4