// Imports
import myJson from './Questions.json' assert {type: 'json'};
import fs from 'fs'
import figlet from 'figlet';
import chalk from 'chalk';
import { prompt } from 'readline-sync';
import chalkRainbow from 'chalk-rainbow';

// Current Score
let score = 0;
let participantNum = 0;
// Main Game Function
function game(params) {
    console.log("====================================================");
    console.log(chalk.blue(figlet.textSync("Pointaire!", { font: 'Standard', horizontalLayout: 'fitted' })));
    console.log("====================================================");
    console.log("Choose a number between " + 0 + " and " + (myJson.length - 1));
    //User Input
    console.log("Enter number: ");
    const num = prompt();
    console.log(myJson[num].question);
    console.log(myJson[num].content);
    // for (let i = 0; i < myJson.length; i++) {
    console.log("Please enter either a, b, c or d: ");
    const answer = prompt();
    // If answer is correct
    if (score < 12) {
        if (answer.toLocaleLowerCase() == myJson[num].correct) {
            score++;
            console.log(chalk.green(figlet.textSync("Correct!", { font: 'Standard', horizontalLayout: 'fitted' })));
            console.log("Current Score=" + score)
            game();
        }
        // If answer is wrong
        else if (answer.toLocaleLowerCase() != myJson[num].correct) {
            console.log(chalk.red(figlet.textSync("Wrong Answer!", { font: 'Standard', horizontalLayout: 'fitted' })));
            // User Input
            console.log("Enter Name: ");
            const name = prompt();
            // Gives a json array a variable
            var data = fs.readFileSync("Scores.json");
            // Parse variable into another object
            var myObject = JSON.parse(data);

            // create new json object using input
            let newData = {
                "name": name,
                "score": score
            };

            // Push object into array
            myObject.push(newData);

            // Stringify objects content into proper format
            var newData2 = JSON.stringify(myObject, null, '\t');
            // Write to file
            fs.writeFileSync("Scores.json", newData2, (err) => {
                console.log("New data added");
                // Error checking
                if (err) throw err;
            });
        }
        else
            console.log("Invalid choice");
    } else {
        // If score is equal to 12
        console.log(chalkRainbow(figlet.textSync("Winner!", { font: 'Standard', horizontalLayout: 'fitted' })));
        console.log("Enter Name: ");
        const name = prompt();
        var data = fs.readFileSync("Scores.json");
        var myObject = JSON.parse(data);

        // Create new json object
        let newData = {
            "name": name,
            "score": score
        };

        // Push new score object into array
        myObject.push(newData);

        var newData2 = JSON.stringify(myObject, null, '\t');
        fs.writeFileSync("Scores.json", newData2, (err) => {
            console.log("New data added");
            // Error checking
            if (err) throw err;
        });

    }

}

export { game };
