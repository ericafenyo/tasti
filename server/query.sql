-- Create the Database.
CREATE DATABASE tasti;

-- Use the newly created database.
USE tasti;

-- Create user table

CREATE TABLE `user`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `biography` TEXT,
  `phone` INT,
  `image` BLOB
);

CREATE TABLE `recipe`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `user_id` INT NOT NULL,
   FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE `ingredient`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `recipe_id` INT NOT NULL,
   FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

CREATE TABLE `info`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `recipe_id` INT NOT NULL,
   FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);




