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

connection.connect(function (err) {
  if (err) throw err;
  displayItems();
});

function displayItems() {
  var query = connection.query('SELECT item_id, product_name FROM products', function (err, res) {

    if (err) throw err;

    console.log('Here are all available items for sale: \n')

    for (i in res) {
      console.log('---------\n' + 'Item ID: ' + res[i].item_id + '\n' + 'Product Name: ' + res[i].product_name + '\n---------');
    }

    runApp();

  })
 
}

function runApp() {
  inquirer.prompt([{

      name: 'product_selection',
      type: 'input',
      message: 'Please enter the id of the product you would like to buy',
  },
  {
      name: 'quantity_selection',
      type: 'input',
      message: 'Please enter the quantity you would like to buy'
      
  }])
  .then(answer => {
    userQuantity = answer.quantity_selection;
    var query = connection.query("SELECT price FROM products WHERE item_id='" + answer.product_selection +"'", function (err, res) {
      if(err) throw err;
    var price  = res[0].price;
    console.log('\nYour total comes out to: $' + (price * userQuantity) + '\nThank You!\n');
    })
    function updateProduct() {
      console.log("Updating product quantities...\n");
      var query2 = connection.query("SELECT stock_quantity FROM products WHERE item_id='" + answer.product_selection +"'", function(err, res){
        var itemStock = res[0].stock_quantity;
      })
      var query3 = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            quantity: itemStock - answer.quantity_selection
          },
          {
            item_id: answer.product_selection
          }
        ],
        function (err, res) {
          console.log(res)
        }
      );
    }
    updateProduct();
})
}

