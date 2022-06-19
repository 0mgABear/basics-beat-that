//getting player names
let player1 = prompt(`What is your name Player 1?`, ``);
let player2 = prompt(`What is your name Player 2?`, ``);
//3 game states
var game_state_start = `dice roll`;
var game_state_choose = `choose dice`;
var game_state_compare = `compare scores`;
var game_state_quit = `game end`;
//starting game state and player
var gameState = game_state_start;
var currentPlayer = player1;
//arrays to store current player score and all player score
var currentPlayerRolls = [];
var allPlayerRolls = [];
//to keep track of scores
var player1score = 0;
var player2score = 0;
//keep track of wins - mini leaderboard
var player1wins = 0;
var player2wins = 0;

//dice roll function
var diceRoll = function () {
  var randomInteger = Math.floor(Math.random() * 6) + 1;
  return randomInteger;
};
//2 dice roll functions
var diceRolls = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(diceRoll());
    counter += 1;
  }
  return `${currentPlayer} rolled <b>Dice 1: ${currentPlayerRolls[0]}</b> + <b>Dice 2: ${currentPlayerRolls[1]} </b>. <br> Now please input 1 or 2 to choose which dice to use as your first dice.`;
};

var getPlayerScore = function (input) {
  var playerscore;
  if (input == 1) {
    playerscore = Number(`${currentPlayerRolls[0]}${currentPlayerRolls[1]}`);
    output = `${currentPlayer} have chosen dice 1 first! Your final score is: <b>${playerscore}.</b>`;
    console.log(playerscore);
    console.log(currentPlayerRolls);
  } else if (input == 2) {
    playerscore = Number(`${currentPlayerRolls[1]}${currentPlayerRolls[0]}`);
    output = `${currentPlayer} have chosen dice 2 first! Your final score is: <b>${playerscore}.</b>`;
  } else if (input != 1 || input != 2) {
    console.log(`error`);
    output = `Error! Please only enter 1 or 2 to choose which dice to use as your first digit.`;
  }
  allPlayerRolls.push(playerscore); //OK can run
  currentPlayerRolls = []; //ok
  console.log(currentPlayerRolls);

  return output;
};

var main = function (input) {
  if (input == "quit") {
    output = `You have chosen to quit the game! The final score is: ${player1} : ${player1wins} , ${player2} : ${player2wins}.`;
    gameState = game_state_quit;
    return output;
  }
  if (gameState == game_state_start) {
    output = diceRolls();
    gameState = game_state_choose; //update game state
    return output;
  }
  if (gameState == game_state_choose) {
    var finaldice = getPlayerScore(input); //final dice order
    output = finaldice;

    if (currentPlayer == player1) {
      currentPlayer = player2; //P2 turn
      gameState = game_state_start; //Switch back game state
      output =
        output + ` It is now Player 2's turn! Press submit to roll the dice!`;
    } else if (currentPlayer == player2) {
      gameState = game_state_compare; //see which player wins
      player1score += allPlayerRolls[0]; //extracting scores
      player2score += allPlayerRolls[1];

      if (player1score > player2score) {
        //comparing scores
        player1wins += 1;
        output = `Final Result! <br> ${player1} rolled <b>${allPlayerRolls[0]}</b> and ${player2} rolled <b>${allPlayerRolls[1]}</b>. <br> Player 1 wins! <br> Current Score: Player 1:${player1wins}, Player 2: ${player2wins}. <br> It is now the start of the next round!`;
      } else {
        player2wins += 1;
        output = `Final Result! <br> ${player1} rolled <b>${allPlayerRolls[0]}</b> and ${player2} rolled <b>${allPlayerRolls[1]}</b>. <br> Player 2 wins! <br> Current Score: Player 1: ${player1wins}, Player 2: ${player2wins}. <br> It is now the start of the next round!`;
      }
      allPlayerRolls = [];
      gameState = game_state_start;
      currentPlayer = player1;
    }
    return output;
  }
};
