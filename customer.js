var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Find songs by artist",
                "Find all artists who appear more than once",
                "Find data within a specific range",
                "Search for a specific song",
                "Find artists with a top song and top album in the same year"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Find songs by artist":
                    itemSearch();
                    break;

                case "Find all artists who appear more than once":
                    productSearch();
                    break;

                case "Find data within a specific range":
                    departmentSearch();
                    break;

                case "Search for a specific song":
                    priceSearch();
                    break;

                case "Find artists with a top song and top album in the same year":
                    stockSearch();
                    break;
            }
        });
}

function itemSearch() {
    inquirer
        .prompt({
            name: "Item ID",
            type: "input",
            message: "What is the item number?"
        })
        .then(function (answer) {
            var query = "SELECT position, song, year FROM top5000 WHERE ?";
            connection.query(query, { item: answer.item }, function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    console.log("Position: " + res[i].position + " || Item ID: " + res[i].item + " || Year: " + res[i].year);
                }
                runSearch();
            });
        });
}

function productSearch() {
    var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].artist);
        }
        runSearch();
    });
}

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
        .then(function (answer) {
            var query = "SELECT position,item ID,product,department,price,quantity FROM top5000 WHERE position BETWEEN ? AND ?";
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

function priceSearch() {
    inquirer
        .prompt({
            name: "Price",
            type: "input",
            message: "This is the price"
        })
        .then(function (answer) {
            console.log(answer.product);
            connection.query("SELECT * FROM top5000 WHERE ?", { price: answer.price }, function (err, res) {
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

function stockSearch() {
    inquirer
        .prompt({
            name: "Stock",
            type: "input",
            message: "Amount of product in store"
        })
        .then(function (answer) {
            console.log(answer.song);
            connection.query("SELECT * FROM top5000 WHERE ?", { price: answer.stock }, function (err, res) {
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