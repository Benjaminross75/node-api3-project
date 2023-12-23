const express = require('express');
const {validateUserId,validateUser,validatePost} = require('../middleware/middleware')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const User = require('./users-model');
const Post = require('../posts/posts-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  User.get()
  .then(users =>{
    res.json(users)
  })
  .catch(next)

});

router.get('/:id', validateUserId, (req, res, next) => {
  User.getById(req.params.id)
  .then(user =>{
   res.json(user)
  })
  .catch(next)
});

router.post('/', validateUser, (req, res, next) => {
  User.insert({name: req.name})
  .then(newUser =>{
    res.json(newUser)
  })
  .catch(next)
});

router.put('/:id', validateUserId,validateUser, (req, res,next) => {
  User.update(req.params.id, {name: req.name})
  .then(updatedUser =>{
    res.json(updatedUser)
  })
  .catch(next)
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});


router.use((err, req, res, next) =>{ //eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: "Something tagic inside posts router happened",
    message: err.message,
    err: err.stack,
  })
})

module.exports = router
