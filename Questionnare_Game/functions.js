// Imports

import result from './Scores.json' assert {type: 'json'};
import myJson from './Questions.json' assert {type: 'json'};
import fs from 'fs'
import readlineSync from 'readline-sync'
import chalk from 'chalk';
import figlet from 'figlet';
import { prompt } from 'readline-sync';


function ranNum() {
  return Math.floor(Math.random() * 100) + 1;
}

// Admin Menu Function
function gameMenu(params) {
  let opt = -1;
  console.log("========================================================================");
  console.log(chalk.blue(figlet.textSync("Admin-Menu", { font: 'Standard', horizontalLayout: 'fitted' })));
  console.log("========================================================================");
  while (opt != 0) {
    let opts = ['Add Question', 'Delete Question', 'Edit Question', 'View Question'];
    opt = readlineSync.keyInSelect(opts, 'Select an option ?');
    opt++;
    switch (opt) {
      case 1:
        console.log("Add");
        // Function to add new question
        add();
        break;

      case 2:
        console.log("Delete");
        // Function to delete question
        del();
        break;

      case 3:
        console.log("Edit");
        // Function to edit existing question
        edit();
        break;

      case 4:
        console.log("View");
        // Function to edit existing question
        view();
        break;

      case 0:
        console.log("Exit");
        break;

      default:
        break;
    }
  }
}

// Add function
function add() {
  // Accept user input 
  console.log("Please enter a new question!: ");
  const quest = prompt();
  console.log("Please enter option 1!: ");
  const opt1 = prompt();
  console.log("Please enter option 2!: ");
  const opt2 = prompt();
  console.log("Please enter option 3!: ");
  const opt3 = prompt();
  console.log("Please enter option 4!: ");
  const opt4 = prompt();
  console.log("Please enter correct choice of a, b, c or d!: ");
  const answer = prompt();

  // Gives a json array a variable
  var data = fs.readFileSync("Questions.json");
  // Parse variable into another object
  var myObject = JSON.parse(data);

  // create new json object using input
  let newData = {
    "question": quest,
    "content": [opt1, opt2, opt3, opt4],
    "correct": answer
  };

  // Push object into array
  myObject.push(newData);

  // Stringify objects content into proper format
  var newData2 = JSON.stringify(myObject, null, '\t');
  // Write to file
  fs.writeFileSync("Questions.json", newData2, (err) => {
    // Error checking
    if (err) throw err;
    console.log("New data added");
  });
  console.log(chalk.green(figlet.textSync("Question-Added", { font: 'Standard', horizontalLayout: 'fitted' })));

}

// Delete Function
function del() {
  console.log("Choose a number between " + 0 + " and " + myJson.length + "-1");
  // User input
  console.log("Enter number: ");
  const num = prompt();

  // confirm user input
  console.log("Do you want to delete: " + myJson[num].question);

  let index = -1;
  while (index != 0) {
    let opts = ['Yes', 'No'];
    index = readlineSync.keyInSelect(opts, 'Select an option ?');
    index++;
    switch (index) {
      case 1:
        console.log("Before!");
        // Show before
        console.log(myJson[num]);

        //////Deletes from instance not json file/////

        // Gives a json array a variable
        var data = fs.readFileSync("Questions.json");

        // Splice chosen object out of the array
        myJson.splice(num, 1);
        console.log("After!");
        // Show after
        console.log(myJson[num]);
        // Parse variable into another object
        var myObject = JSON.parse(data);
        fs.writeFileSync('Questions.json', JSON.stringify(myObject, null, '\t'), (err) => {
          // Error checking
          if (err) throw err;
        });

        console.log(chalk.red(figlet.textSync("Deleted", { font: 'Standard', horizontalLayout: 'fitted' })));
        break;

      case 2:
        console.log("No");
        console.log("Action Cancelled");

        break;

      case 0:
        console.log("Exit");
        break;

      default:
        break;
    }
  }

}

// Edit Function
function edit() {
  console.log("Choose a number between " + 0 + " and " + (myJson.length - 1));
  // User Input
  console.log("Enter number: ");
  const num2 = prompt();

  // Confirm User Input
  console.log("Do you want to edit: " + myJson[num2].question);

  let index = -1;
  while (index != 0) {
    let opts = ['Yes', 'No'];
    index = readlineSync.keyInSelect(opts, 'Select an option ?');
    index++;
    switch (index) {
      case 1:
        // User Input
        console.log("Please enter a new question!: ");
        const quest = prompt();
        console.log("Please enter option 1!: ");
        const opt1 = prompt();
        console.log("Please enter option 2!: ");
        const opt2 = prompt();
        console.log("Please enter option 3!: ");
        const opt3 = prompt();
        console.log("Please enter option 4!: ");
        const opt4 = prompt();
        console.log("Please enter correct choice of a, b, c or d!: ");
        const answer = prompt();

        // Update the chosen question
        myJson[num2].question = quest;
        myJson[num2].content = [opt1, opt2, opt3, opt4];
        myJson[num2].correct = answer;

        // Save the updated questions to the JSON file
        fs.writeFileSync("Questions.json", JSON.stringify(myJson, null, '\t'), (err) => {
          if (err) throw err;
          console.log("Question updated successfully.");
        });
        break;

      case 2:
        console.log("Action Cancelled");
        console.log("Choose a number between " + 0 + " and " + (myJson.length - 1));
        break;

      case 0:
        console.log("Exit");
        break;

      default:
        break;
    }
  }
}

var position = 0
// Highscore Function
function highScores(params) {
  console.log("================================================================");
  console.log(chalk.blue(figlet.textSync("High-Score!", { font: 'Standard', horizontalLayout: 'fitted' })));
  console.log("================================================================");

  // Sorts all the results
  for (let index = 0; index < result.length; index++) {
    var toSort = result[index].score;
  }
  result.sort(function (a, b) {
    return b.score - a.score;
  });
  console.log(chalk.blue("Name || Score"));
  console.log("===============");
  // Display the top 5 names
  for (let index = 0; index < 5; index++) {
    // console.log(result);
    position++;
    console.log(chalk.blue(position + ". " + result[index].name + " || " + result[index].score));
    console.log("===============");

  }
}

function view(params) {
  console.log("Choose a number between " + 0 + " and " + (myJson.length - 1));
  // User input
  console.log("Enter number: ");
  const num = prompt();
  console.log('=================================');
  // Display chosen question
  console.log('Question');
  console.log('=================================');
  console.log(chalk.blue(myJson[num].question));
  console.log('=================================');
  console.log('Options');
  console.log('=================================');
  console.log(chalk.blue(myJson[num].content));
  console.log('=================================');
  console.log('Correct Answer');
  console.log('=================================');
  console.log(chalk.blue(myJson[num].correct));
  console.log('=================================');

}

// Export Functions
export { ranNum, gameMenu, highScores, view };