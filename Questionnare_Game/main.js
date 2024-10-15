// Imports
import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync'
import { gameMenu, highScores } from './functions.js'
import { game } from './questionParser.js';

// Game Menu
console.log("===================================================================");
console.log(chalk.yellow(figlet.textSync("Game-Menu", { font: 'Standard', horizontalLayout: 'fitted' })));
console.log("===================================================================");
let index = -1;
while (index != 0) {
  let opts = ['Who wants to be a pointaire', 'Game Admin', 'Top Five Scores'];
  index = readlineSync.keyInSelect(opts, chalk.blue('Select an option ?'));
  index++;
  switch (index) {
    case 1:
      console.log("Option 1");
      game();
      break;

    case 2:
      console.log("Option 2");
      gameMenu();

      break;

    case 3:
      console.log("Option 3");
      highScores();
      break;

    case 0:
      console.log(chalk.yellow(figlet.textSync("Thanks for Playing!", { font: 'Standard', horizontalLayout: 'fitted' })));
      break;

    default:
      break;
  }
}
