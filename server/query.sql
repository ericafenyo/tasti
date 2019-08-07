-- Create the Database.
CREATE DATABASE tasti;

-- Use the newly created database.
USE tasti;

-- Create tables

CREATE TABLE `user`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `biography` TEXT,
  `email` varchar(255),
  `phone` INT,
  `image` blob,
  `recipe_id` INT,
  FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
);

CREATE TABLE `recipe`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL
);