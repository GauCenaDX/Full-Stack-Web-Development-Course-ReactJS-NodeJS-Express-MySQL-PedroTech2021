const express = require('express');
// const Posts = require('../models/Posts');
const router = express.Router()
const { Posts } = require('../models')

router.get('/', async (req, res) => {
  // res.send('Hello World.')
  const listOfPosts = await Posts.findAll()
  res.json(listOfPosts)
})

//-- Wait for the data to be insert before moving forward with the request
router.post('/', async (req, res) => {
  const post = req.body
  await Posts.create(post)
  res.json(post)
})

module.exports = router

