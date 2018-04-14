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
      var query = connection.query("SELECT price FROM products WHERE item_id='" + answer.product_selection + "'", function (err, res) {
        if (err) throw err;
        var price = res[0].price;
        checkItemInventory();

      })
      function checkItemInventory() {
        var query2 = connection.query("SELECT stock_quantity FROM products WHERE item_id='" + answer.product_selection + "'", function (err, res) {
          var inStock;
          var remainingInventory = res[0].stock_quantity;
          if (err) throw err;
          if (answer.quantity_selection > remainingInventory) {
            console.log('Sorry! We do not have enough stock');
            return;
            inStock = false;
          }
          else if (inStock = true) {
            updateProduct();
            console.log('\nYour total comes out to: $' + (price * userQuantity) + '\nThank You!\n');
          }
        }
        )
      }
      function updateProduct() {
        console.log("Updating product quantities...\n");
        var query3 = connection.query("SELECT stock_quantity FROM products WHERE item_id='" + answer.product_selection + "'", function (err, res) {
          var itemStock = res[0].stock_quantity;
        })

        var amountPurchased = answer.quantity_selection
        var itemId = answer.product_selection
        var insert = ['products', 'stock_quantity', 'stock_quantity', amountPurchased, 'item_id', itemId]
        var query4 = connection.query('UPDATE ?? SET ?? = ?? - ? WHERE ?? = ?', insert, function (error) {
        });
      }

    })
}

