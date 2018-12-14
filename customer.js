var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon_DB"
});


// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        postOrBid();
        //call postOrbid function next()
    })
}
// function which prompts the user for what action they should take
function postOrBid() {
  inquirer
    .prompt({
      name: "postOrBid",
      type: "rawlist",
      message: "What would you like to do??",
      choices: ["add", "post"]
    })
    .then(function(answer) {
        console.log(answer);
      // based on their answer, either call the Add or the View functions
      if (answer.postOrBid === "add") {
          console.log(answer.postOrBid);
        addStore();
      }
      //else {
    //     ViewStore();
    //   }
    });
}

function addStore() {
    console.log("add store");
}
