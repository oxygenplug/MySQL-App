DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(25) NULL,
    department_name VARCHAR(25) NULL,
    price DOUBLE NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ('Bananas', 'Groceries', 1.25, 99), ('Socks', 'Clothing', 5.55, 99), ('Bacon', 'Groceries', 3.75, 99), ('4K TV', 'Electronics', 600, 25), ('Movie Pack', 'Electronics', 15.00, 99), ('Apples', 'Groceries', 10, 99), ('Jeans', 'Clothing', 30.00, 99), ('Phone Charger', 'Electronics', 9.99, 99), ('T-Shirt', 'Clothing', 19.99, 99), ('Avocado', 'Groceries', 1.50, 99);