// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please provide a description of your project.',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                return false;
            }
        }

    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the steps required to install your project?',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                return false;
            }
        }

    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide instructions on how to use your project.',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Please provide guidelines for other developers to contribute to your project.',
        validate: contributionInput => {
            if (contributionInput) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Please provide instructions on how to test your project.',
        validate: testInput => {
            if (testInput) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmLicense',
        message: 'Would you like to include a license?',
        default: false,
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please select a license for your project.',
        choices: ['MIT', 'Apache', 'GPL', 'BSD', 'None'],
        when: ({confirmLicense}) => {
            if (confirmLicense) {
                return true;
            } else {
                return false;
            }
        }
    },

];

async function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log(err);
        }
        console.log('README.md successfully created!');
    });
}

async function init() {
    try {
        const data = await inquirer.prompt(questions);
        const markdown = generateMarkdown(data);

        await writeToFile('README.md', markdown);

    } catch (err) {
        console.log(err);
    }
}

// Function call to initialize app
init();
