/**
 * @license 
 * Copyright (c) 2019 Eric Afenyo
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const sha256 = require('sha256');
const randomize = require('randomatic');

const db = require('../config');
const router = express.Router();

// Multer storage configurations.
const storageOptions = multer.diskStorage({
	/**
	 * A function used to determine within which folder the uploaded files should be stored.
	 * Note: This function is automatically executed.
	 * @param {*} request an Express request object.
	 * @param {*} file a `Multer file` object.
	 * @param {*} callback A function to receive an error and the file destination.
	 * 
	 */
	destination: function(request, file, callback) {
		// because there is no error, we pass null as the first argument.
		callback(null, 'images/');
	},

	/**
	 * A function used to determine what the file should be named inside the folder.
	 * Note: This function is automatically executed.
	 * 
	 * @param {*} request an Express request object.
	 * @param {*} file a `Multer file` object.
	 * @param {*} callback 
	 */
	filename: function(request, file, callback) {
		let fileName;

		fileName = `${randomize('Aa0', 16)}${path.extname(file.originalname)}`;
		callback(null, fileName);
	}
});

const upload = multer({ storage: storageOptions });

/* == GET RECIPES == */

// Get a list of all recipes
router.get('/', (request, response) => {
	db.query('SELECT * FROM recipe', (error, users) => {
		if (error) {
			console.log(error);
			return response.status(400).send({ error: 'Unable to get users' });
		}
		response.json(users);
	});
});

// Get a list of recipes belonging to a specific user.
router.get('/:userId', (request, response) => {
	const { userId } = request.params;

	db.query('SELECT * FROM recipe WHERE user_id = ?', userId, (error, recipes) => {
		if (error) {
			console.log(error);
			return response.status(404).send('Recipes not found');
		}

		response.json(recipes);
	});
});


// Get all ingredients belonging to a particular recipe.
router.get('/:recipeId/ingredients', (request, response) => {
	const { recipeId } = request.params;

	db.query('SELECT * FROM ingredient WHERE recipe_id = ?', recipeId, (error, ingredients) => {
		if (error) {
			console.log(error);
			return response.status(400).send({ error: 'Unable to get ingredients' });
		}

		response.json(ingredients);
	});
});

// Get an additional information about a particular recipe.
router.get('/:recipeId/info', (request, response) => {
	const { recipeId } = request.params;

	db.query('SELECT * FROM info WHERE recipe_id = ?', recipeId, (error, additionalInformation) => {
		if (error) {
			console.log(error);
			return response.status(400).send({ error: 'Unable to get ingredients' });
		}

		response.json(additionalInformation);
	});
});

/* == POST RECIPES == */

// Add a recipe to the database.
router.post('/:userId', upload.single('image'), (request, response) => {
	const data = request.body;
	const userId = request.params.userId;
	const imagePath = request.file.filename;
	// Create a new object and append the user id.
	const recipe = { ...data, image_path: imagePath, user_id: userId };
	
	console.log(request);
	
	db.query('INSERT INTO recipe SET ?', recipe, (error) => {
		if (error) {
			console.log(error);
			return response.status(400).send({ error: error });
		}

		response.json(recipe);
	});
});

// Add ingredients to a particle recipe.
router.post('/:recipeId/ingredients', (request, response) => {
	const data = request.body;
	const { recipeId } = request.params;

	// Create a new object and append the user id.
	const ingredient = { ...data, recipe_id: recipeId };

	db.query('INSERT INTO ingredient SET ?', ingredient, (error) => {
		if (error) {
			console.log(error);
			return response.send(error);
		}

		response.json(ingredient);
	});
});

// Add an additional information to a particle recipe.
// Note: There can only be a single info about a particular recipe.
// TODO: The recipe_id field must be unique.
router.post('/:recipeId/info', (request, response) => {
	const data = request.body;
	const { recipeId } = request.params;

	// Create a new object and append the user id.
	const info = { ...data, recipe_id: recipeId };

	db.query('INSERT INTO info SET ?', info, (error) => {
		if (error) {
			console.log(error);
			return response.send(error);
		}

		response.json(info);
	});
});

// In order to update a recipe,
// The HTTP request must include the recipe object.
router.put('/:userId', (request, response) => {
	const userId = request.params.userId;
	const data = request.body;
	// The recipe's password is hashed before being stored in the database.
	const recipe = encryptPassword(data);

	db.query('UPDATE recipe SET? WHERE id = ?', [ recipe, userId ], (error, result) => {
		if (error) {
			console.log(error);
			return response.send(error);
		}

		response.json({ recipe: result });
	});
});

// Delete a recipe.
router.delete('/:userId', (request, response) => {
	response.json({ type: 'delete', payload: request.params.userId });
});

module.exports = router;
