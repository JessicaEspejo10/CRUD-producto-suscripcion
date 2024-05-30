CREATE DATABASE Adventure;

USE Adventure;

CREATE TABLE products(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    observation VARCHAR(200) NOT NULL,
    travel_date DATE NOT NULL,
    duration INT NOT NULL,
);

CREATE TABLE suscribers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    suscription_type VARCHAR(50) NOT NULL,
    billing_date VARCHAR(50) NOT NULL,
    expiration_date VARCHAR(50) NOT NULL,
    );

SELECT * FROM products;