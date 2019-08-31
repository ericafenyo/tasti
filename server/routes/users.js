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
const sha256 = require('sha256');

const db = require('../config');
const router = express.Router();

const encryptPassword = (user) => ({ ...user, password: sha256(user.password) });

// Get a list of users when a get request is made to /users.
router.get('/', (request, response) => {
	db.query('SELECT * FROM user', (error, users) => {
		if (error) {
			console.log(error);
			return response.status(400).send({ error: 'Unable to get users' });
		}
		response.json(users);
	});
});

// Get a single of user.
router.get('/:userId', (request, response) => {
	response.json({ type: 'get', payload: request.params.userId });
});

/**
 * Post
 */

// Add a user to the database.
router.post('/register', (request, response) => {
	const data = request.body;

	// The user's password is hashed before being stored in the database.
	const user = encryptPassword(data);

	db.query('INSERT INTO user SET ?', user, (error) => {
		if (error) {
			console.log(error);
			response.send(error);
		}
	});

	response.json(user);
});

// In order to update a user,
// The HTTP request must include the user object.
router.put('/:userId', (request, response) => {
	const userId = request.params.userId;
	const data = request.body;
	// The user's password is hashed before being stored in the database.
	const user = encryptPassword(data);

	db.query('UPDATE user SET? WHERE id = ?', [ user, userId ], (error, result) => {
		if (error) {
			console.log(error);
			return response.send(error);
		}

		response.json({ user: result });
	});
});

// Delete a user.
router.delete('/:userId', (request, response) => {
	response.json({ type: 'delete', payload: request.params.userId });
});

module.exports = router;
