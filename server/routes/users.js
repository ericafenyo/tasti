const express = require('express');

const router = express.router();


// Get a list of users when a get request is made to /users.
router.get('/', (request, response, next) => {
  response.json({ type: "get" });
});

// Get a single of user.
router.get('/:userId', (request, response, next) => {
  response.json({ type: "get", payload: request.params.userId });
});

// Add user into a database.
router.post('/', (request, response, next) => {
  response.json({ type: "post" });
});

// Update a user.
router.put('/:userId', (request, response, next) => {
  response.json({ type: "put", payload: request.params.userId });
});

// Delete a user.
router.delete('/:userId', (request, response, next) => {
  response.json({ type: "delete", payload: request.params.userId });
});

module.exports = router;

