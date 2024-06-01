CREATE DATABASE Adventure;

USE Adventure;

CREATE TABLE products(
    id INT AUTO_INCREMENT PRIMARY KEY,
    prodname VARCHAR(50) NOT NULL,
    size VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    price INT NOT NULL,
    image VARCHAR(150)
);

CREATE TABLE suscribers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    subscname VARCHAR(50),
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    suscription_type VARCHAR(50) NOT NULL,
    value INT,
    billing_date VARCHAR(50) NOT NULL
    );

