#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";


let blue = chalk.blue.bold;
let red = chalk.red.bold;
let randomNumber: number;
let easy = Math.floor(Math.random() * 10) + 1;
let medium = Math.floor(Math.random() * 50) + 1;
let hard = Math.floor(Math.random() * 100) + 1;

let timeout = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
}

let welcome = async () => {
    let title = chalkAnimation.karaoke("Welcome to the guessing game..");
    await timeout();
    title.stop();
}

await welcome();

let guess = async () => {
    return await inquirer.prompt([{
        type: "list",
        name: "level",
        message: "Choose the level \n",
        choices: ["Easy (1 to 10)", "Medium (1 to 50)", "Hard (1 to 100)"],
    }, {
        type: "number",
        name: "guessNumber",
        message: "Type the guessing number \n",
    }])
    .then((answer) => {    
        switch (answer.level) {
            case "Easy (1 to 10)":
                randomNumber = easy;
                break;
            case "Medium (1 to 50)":
                randomNumber = medium;
                break;
            case "Hard (1 to 100)":
                randomNumber = hard;
                break;
            default:
                break;
        }
        
        if (randomNumber == answer.guessNumber) {
            console.log(blue(`You won! The number is ${randomNumber}`));        
        } else {
            console.log(red(`You loss! The number is ${randomNumber}`));        
        }    
    });
}

let again;
let showAgain = async () => {
    do {
        await guess();
        again = await inquirer
            .prompt({
                type: "input",
                name: "restart",
                message: "Do you want to continue? Press y or n:",
                validate(name) {                    
                    if (!name) {
                        return "Answer is required";
                    }
                    return true;
                },
            });
    } while (again.restart == "y" || again.restart == "Y" || again.restart == "Yes" || again.restart == "YES" || again.restart == "yes")
}

showAgain();