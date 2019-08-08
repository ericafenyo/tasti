-- Create the Database.
CREATE DATABASE tasti;

-- Use the newly created database.
USE tasti;

-- Create user table

CREATE TABLE `user`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR NOT NULL,
  `biography` TEXT,
  `phone` INT,
  `image` BLOB
);