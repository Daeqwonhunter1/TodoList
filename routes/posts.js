const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const {verify} = require('../routes/verifyToken')
const User = require('../models/User')
const {buildAuthResponse} = require('./auth')
///ALL Posts


router.get('/posts', verify, async (req, res,next) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

///Create Post
router.post('/posts',verify, async (req, res,next) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    userId: res.locals.user.id
  })
  try {
    const savedPost = await post.save()
    res.json(savedPost)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

///Specific Post
router.get('/posts/:postId',verify, async (req, res,next) => {
  try {
    const post = await Post.findById(req.params.postId)
    res.json(post)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

///Delete Post
router.delete('/posts/:postId',verify, async (req, res,next) => {
  Post.findByIdAndDelete(req.params.postId)
    .then(post => res.json(`${post} deleted`))
    .catch(err => res.status(400).json('Error:' + err))
})

//Update Post
router.put('/posts/:postId',verify, async (req, res,next) => {
  Post.findById(req.params.postId)
    .then(post => {
      post.title = req.body.title
      post.description = req.body.description
      post.expiration = req.body.expiration

      post.save()
        .then(post => res.json(`${post} updated`))
        .catch(err = res.status(400).json('Error:' + err))
    })
    .catch(err => res.status(400).json('Error:' + err))
})


module.exports = router;