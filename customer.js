
//
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

//
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

//
connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

//
function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "What is the item id number of the product you'd like to buy? ",
                "Find the product",
                "What department is the product in",
                "How much is the item",
                "How many items are in store"
            ]
        })
//
        .then(function (answer) {
            switch (answer.action) {
                case "What is the item id":
                    itemSearch();
                    break;

                // case "Find the product":
                //     productSearch();
                //     break;

                // case "What department is the product in":
                //     departmentSearch();
                //     break;

                // case "How much is the item":
                //     priceSearch();
                //     break;

                // case "How many items are in store":
                //     stockSearch();
                //     break;
            }
        });
}

//
function itemSearch() {
    inquirer
        .prompt({
            name: "item",
            type: "input",
            message: "What is the item id number?"
        })
//
        .then(function (answer) {
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, { item_id: answer.item }, function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log("Position: " + res[i].position + " || Item ID: " + res[i].itemid + " || Year: " + res[i].year);
                }
               
                console.log(res)
                runSearch();
            });
        });
}

//
function productSearch() {
    var query = "SELECT artist FROM products GROUP BY artist HAVING count(*) > 1";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].product);
        }
        runSearch();
    });
}

//
function departmentSearch() {
    inquirer
        .prompt([
            {
                name: "start",
                type: "input",
                message: "Enter starting position: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
//
                name: "end",
                type: "input",
                message: "Enter ending position: ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
//
        .then(function (answer) {
            var query = "SELECT position,item ID,product,department,price,quantity FROM products WHERE position BETWEEN ? AND ?";
            connection.query(query, [answer.start, answer.end], function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log(
                        "Position: " +
                        res[i].position +
                        " || Item ID: " +
                        res[i].itemid +
                        " || Product: " +
                        res[i].product +
                        " || Department: " +
                        res[i].department +
                        " || Price: " +
                        res[i].price +
                        " || Quantity: " +
                        res[i].stock
                    );
                }
                runSearch();
            });
        });
}

//
function priceSearch() {
    inquirer
        .prompt({
            name: "Price",
            type: "input",
            message: "How much is the item"
        })
//
        .then(function (answer) {
            console.log(answer.price);
            connection.query("SELECT * FROM products WHERE ?", { price: answer.price }, function (err, res) {
                console.log(
                    "Position: " +
                    res[0].position +
                    " || Item Number: " +
                    res[i].itemid +
                    " || Product: " +
                    res[i].product +
                    " || Department: " +
                    res[i].department +
                    " || Price: " +
                    res[i].price +
                    " || Quantity: " +
                    res[i].stock
                );
                runSearch();
            });
        });
}

//
function stockSearch() {
    inquirer
        .prompt({
            name: "Stock",
            type: "input",
            message: "How many items are in store"
        })
//
        .then(function (answer) {
            console.log(answer.stock);
            connection.query("SELECT * FROM products WHERE ?", { price: answer.stock }, function (err, res) {
                console.log(
                    "Position: " +
                    res[0].position +
                    " || Item Number: " +
                    res[i].itemid +
                    " || Product: " +
                    res[i].product +
                    " || Department: " +
                    res[i].department +
                    " || Price: " +
                    res[i].price +
                    " || Quantity: " +
                    res[i].stock
                );
                runSearch();
            });
        });
}