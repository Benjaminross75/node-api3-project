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

router.delete('/:id',validateUserId, async (req, res, next) => {
  await User.remove(req.params.id)
  try{
     res.json(req.user)
  } catch(err){
   next(err)
  }
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  User.getUserPosts(req.user.id)
  .then(post =>{
    res.json(post)
  })
  .catch(next)
});

router.post('/:id/posts', validateUserId,validatePost,async (req, res, next) => {
  try{
    const result = await Post.insert({
     user_id: req.params.id,
     text: req.text
    })
    res.json(result)
  } catch(err){
   next(err)
  }
});


router.use((err, req, res, next) =>{ //eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: "Something tagic inside posts router happened",
    message: err.message,
    err: err.stack,
  })
})

module.exports = router
