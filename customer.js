var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_DB"
});


// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "postOrBid",
      type: "rawlist",
      message: "What would you like to do??",
      choices: ["Add to Inventory/ Add New Product", "View Products for Sale/ View Low Inventory"]
    })
    .then(function(answer) {
      // based on their answer, either call the Add or the View functions
      if (answer.postOrBid.toUpperCase() === "Add ") {
        AddStore();
      }
      else {
        ViewStore();
      }
    });
}

// function to handle posting new items up for auction
function AddStore() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "action",
        type: "rawlist",
        message: "Would you like to add to the inventory?"
        choices: ["Add to Inventory"]
      }
      {
        name: "Product",
        type: "input",
        message: "How many items are you adding?"
      }
    ])
    .then(function(answer) {
      // update inventory!!
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.product,
          department_name: answer.department,
          price: answer.price,
          stock: answer.stock
        },
        function(err) {
          if (err) throw err;
          console.log("");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

function ViewStore() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
            }
            return choiceArray;
          },
          message: "What auction would you like to place a bid in?"
        },
        {
          name: "bid",
          type: "input",
          message: "How much would you like to bid?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if bid was high enough
        if (chosenItem.highest_bid < parseInt(answer.bid)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                highest_bid: answer.bid
              },
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Bid placed successfully!");
              start();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Your bid was too low. Try again...");
          start();
        }
      });
  });
}

//BAMAZON PSUEDO CODE

//require your dependencies (mysql, inquirer, cli-table)
DONE
//initialize a connection variable to sync with mysql db
DONE
//create a mysql connection and then call function(1)
DONE
//function(1): create a function that loads all the products using a sql SELECT * FROM products; then call function(2)

//function(2): Prompts the user for the id of the product they want. (note:**The user input will come as a string. ) You must use parseInt() to turn the answer into a number-- save this to a variable. Call function(3)

//function(3): Prompt user for a quantity. If given a quantity, store it into a variable, but make sure you parseInt() to turn it into a number. Call function(4) and pass this variable to function(4)

//function(4): a function that makes a query connection. It should be a sql UPDATE statement.  Something like BUT NOT EXACTLY.... "UPDATE products SET stock = stock - ? WHERE id = ?", [? , ?]
// if successful console.log (success!), else, call function(1)


//************* obviously give your functions names.. but this is a basic outline of what your code should look like for the homework ************************
