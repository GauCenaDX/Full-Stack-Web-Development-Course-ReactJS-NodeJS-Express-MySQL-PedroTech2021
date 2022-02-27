const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');

//- For USER REGISTRATION
//- We want a post request to insert information into Users table
//-   a.k.a doing registration.
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {  //-- hash string length is 10
    Users.create({
      username: username,
      password: hash
    });
    res.json('SUCCESS');
  });
});

//- For LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  //-- Check if the user existed in our database
  //--  . if: user not exist, send error feedback
  //--  . else: user exists, check password
  //--    . if: password not match, send error feedback
  //--    . else: password correct, send success message
  const user = await Users.findOne({ where: {username: username} });

  if (!user) {
    res.json({ error: 'User Doesn\'t Exist.'});
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: 'Wrong Username and Password Combination.' });
      } else {
        res.json('YOU LOGGED IN!!!');
      }
    });
  }
});

module.exports = router;