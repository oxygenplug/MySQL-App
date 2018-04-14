var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  startApp();
});

  function startApp(){
    var query = connection.query('SELECT product_name FROM bamazon_db', function(err, res){
      if(err) throw err;
      var results = res;
    })
    console.log(results);
  }