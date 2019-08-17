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
  `image` VARCHAR(255)
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
  `serving_time` VARCHAR(255) NOT NULL,
  `nutrition_facts` VARCHAR(255) NOT NULL,
  `recipe_id` INT NOT NULL UNIQUE,
   FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);

CREATE TABLE `direction`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `video` VARCHAR(255),
  `content` TEXT NOT NULL,
  `recipe_id` INT NOT NULL,
   FOREIGN KEY (recipe_id) REFERENCES recipe(id)
);




