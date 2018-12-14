var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table");

var newTable = new table({
    head: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity'],
    colWidths: [20, 20, 20, 20, 20]
});

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});


// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var initialArray = [];
        var dataArray = [];
        for (i = 0; i < res.length; i++) {
            initialArray.push(res[i].item_id)
            initialArray.push(res[i].product_name)
            initialArray.push(res[i].department_name)
            initialArray.push(res[i].price)
            initialArray.push(res[i].stock_quantity)
            dataArray.push(initialArray)
            initialArray = []
            newTable.push(dataArray[i])
        }
        var blah = newTable.toString();
        console.log(blah);
        postOrBid();
        //call postOrbid function next()
    })
}
// function which prompts the user for what action they should take
function postOrBid() {
    inquirer
        .prompt({
            name: "postOrBid",
            type: "input",
            message: "Select the ID of the product you'd like to buy: "
        })
        .then(function (answer) {
            //refer to line 111-116 greatbay.js
            input = parseInt(answer.postOrBid)
            console.log(input);
            connection.query("SELECT * FROM products WHERE item_id = " + answer.postOrBid, function (err, res) {
                if (err) throw err;
                console.log(res);
                addStore();
            })
            //select the id from the database and display sql SELECT statement
        })
}

function addStore() {
    inquirer
        .prompt({
            name: "addStore",
            type: "input",
            message: "How many units would you like to buy?"
        })
        .then(function (answer) {
            connection.query("SELECT * FROM products WHERE item_id = " + answer.postOrBid) {

            console.log(answer);
            // based on their answer, either call the Add or the View functions
            if (answer.addStore === "post") {
                console.log(answer.addStore);

            }
        });
}
