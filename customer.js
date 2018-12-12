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
                    artistSearch();
                    break;

                case "Find all artists who appear more than once":
                    multiSearch();
                    break;

                case "Find data within a specific range":
                    rangeSearch();
                    break;

                case "Search for a specific song":
                    songSearch();
                    break;

                case "Find artists with a top song and top album in the same year":
                    songAndAlbumSearch();
                    break;
            }
        });
}

function ItemidSearch() {
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

function multiSearch() {
    var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].artist);
        }
        runSearch();
    });
}

function rangeSearch() {
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
                        res[i].store +
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

function productSearch() {
    inquirer
        .prompt({
            name: "Product",
            type: "input",
            message: "What are you looking for today?"
        })
        .then(function (answer) {
            console.log(answer.product);
            connection.query("SELECT * FROM top5000 WHERE ?", { product: answer.product }, function (err, res) {
                console.log(
                    "Position: " +
                    res[0].position +
                    " || Item Number: " +
                    res[i].itemid +
                    " || Product: " +
                    res[i].product +
                    " || Department: " +
                    res[i].store +
                    " || Price: " +
                    res[i].price +
                    " || Quantity: " +
                    res[i].stock
                );
                runSearch();
            });
        });
}

function priceSearch() {
    inquirer
        .prompt({
            name: "Price",
            type: "input",
            message: "Cost of product"
        })
        .then(function (answer) {
            console.log(answer.song);
            connection.query("SELECT * FROM top5000 WHERE ?", { price: answer.price }, function (err, res) {
                console.log(
                    "Position: " +
                    res[0].position +
                    " || Item Number: " +
                    res[i].itemid +
                    " || Product: " +
                    res[i].product +
                    " || Department: " +
                    res[i].store +
                    " || Price: " +
                    res[i].price +
                    " || Quantity: " +
                    res[i].stock
                );
                runSearch();
            });
        });
}

function productSearch() {
    inquirer
        .prompt({
            name: "Product",
            type: "input",
            message: "What are you looking for today?"
        })
        .then(function (answer) {
            console.log(answer.song);
            connection.query("SELECT * FROM top5000 WHERE ?", { product: answer.product }, function (err, res) {
                console.log(
                    "Position: " +
                    res[0].position +
                    " || Item Number: " +
                    res[i].itemid +
                    " || Product: " +
                    res[i].product +
                    " || Department: " +
                    res[i].store +
                    " || Price: " +
                    res[i].price +
                    " || Quantity: " +
                    res[i].stock
                );
                runSearch();
            });
        });
}


function songAndAlbumSearch() {
    inquirer
        .prompt({
            name: "Department",
            type: "input",
            message: "What store would you like to search for?"
        })
        .then(function (answer) {
            var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
            query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
            query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year ";

            connection.query(query, [answer.store, answer.store], function (err, res) {
                console.log(res.length + " matches found!");
                for (var i = 0; i < res.length; i++) {
                    console.log(
                        "Album Position: " +
                        res[i].position +
                        " || Item Number: " +
                        res[i].itemid +
                        " || Product: " +
                        res[i].product +
                        " || Department: " +
                        res[i].store +
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