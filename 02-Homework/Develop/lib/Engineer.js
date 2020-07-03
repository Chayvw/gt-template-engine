// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");
class Engineer extends Employee{
    constructor(name, id, email, Github){
    super(name, id, email);
    this.Github = Github;
      this.role = "Engineer";
    }
    getGithub(){
        return this.Github;
    };
}
module.exports = Engineer;