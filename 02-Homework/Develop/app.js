const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// array for the employee's information to come back to
const allEmployees = [];
function employeeQuestions() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "role",
                message: "What is your role with the company?",
                choices: [Manager, Engineer, Intern],
            },
        ])
        .then(function (employee) {
            console.log(typeof employee.role)
            switch (employee.role) {

                case "Manager":
                    inquirer
                        .prompt([

                            {
                                type: "input",
                                name: "name",
                                message: "Team member's name ?",
                            },
                            {
                                type: "input",
                                name: "Id",
                                message: "Team member's Id ?",
                            },
                            {
                                type: "input",
                                name: "email",
                                message: "Team member's email?",
                            },
                            {
                                type: "input",
                                name: "officeNumber",
                                message: "What is your office number ?",
                            },])
                        .then(function (managerInfo) {
                            let newManager = new Manager(managerInfo.name, managerInfo.Id, managerInfo.email, managerInfo.officeNumber)
                            allEmployees.push(newManager);
                            addUser()


                        })
                        // added a break so it would not prompt all remaining questions at once.
                    break;
                case "Engineer":
                    inquirer
                        .prompt([{
                            type: "input",
                            name: "name",
                            message: "Team member's name ?",
                        },
                        {
                            type: "input",
                            name: "Id",
                            message: "Team member's Id ?",
                        },
                        {
                            type: "input",
                            name: "email",
                            message: "Team member's email?",
                        },
                        {
                            type: "input",
                            name: "github",
                            message: "What is your GitHub username?",
                        },])
                        .then(function (engineerInfo) {
                            let newEngineer = new Engineer(engineerInfo.name, engineerInfo.Id, engineerInfo.email, engineerInfo.github)
                            allEmployees.push(newEngineer);
                            addUser();
                        })
                    break;
                case "Intern":
                    inquirer
                        .prompt([{
                            type: "input",
                            name: "name",
                            message: "Team member's name ?",
                        },
                        {
                            type: "input",
                            name: "Id",
                            message: "Team member's Id ?",
                        },
                        {
                            type: "input",
                            name: "email",
                            message: "Team member's email?",
                        },
                        {
                            type: "input",
                            name: "school",
                            message: "What school did you attend ?",
                        },])
                        .then(function (internInfo) {
                            let newIntern = new Intern(internInfo.name, internInfo.Id, internInfo.email, internInfo.school);
                            allEmployees.push(newIntern);
                            addUser();
                        })
                    break;


            }
            
        })
        // that will have user confirm if they will be adding another employee 
    function addUser() {
        inquirer
            .prompt([{
                type: "confirm",
                name: "anotherEmployee",
                message: "Would you like to add another employee?"

            }])
            .then(function (add) {
                if (add.anotherEmployee === true) {
                    employeeQuestions()
                } else {
                    console.log("render html")
                    console.log(allEmployees)
                }
            })
    }
    // fs to render to the output folder and generate a html file with user input 
    fs.writeFileSync(outputPath, render(allEmployees), "utf8");

}
employeeQuestions()

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
