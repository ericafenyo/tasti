const express = require('express');

const db = require('../config');
const router = express.Router();

// Get a list of users when a get request is made to /users.
router.get('/', (request, response) => {
  response.json({ type: "get" });
});

// Get a single of user.
router.get('/:userId', (request, response) => {
  response.json({ type: "get", payload: request.params.userId });
});

/**
 * Post
 */

// Add a user to the database.
router.post('/', (request, response) => {

  const data = request.body;
  db.query("INSERT INTO user SET ?", data, (error, result) => {
    if(error){
      console.log(error);
      response.send()
    }
  })

  response.json(data);
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

