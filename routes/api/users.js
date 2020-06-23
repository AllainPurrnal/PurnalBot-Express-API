const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');

// @route   GET api/users
// @desc    GET All Users Guild Game Profiles. For Guild Directory purposes
// @access  Private
router.get('/', (req, res, next) => {
  // if the req has a discordId attached, move to next router
  console.log(req.query.discordId)
  if (req.query.discordId) return next();

  // console.log(`First GET`)
  User.find()
    .sort({ name: 1 })
    .then(users => {
      console.log(users)
      res.send(users)
    })
    .catch(err => {
      console.log(err)
    })
});

// @route   GET api/users
// @desc    GET A Users Guild Game Profile
// @access  Public
router.get('/', (req, res) => {

  // console.log(`Second GET`)
  User.find({discordId: {$eq: req.query.discordId}})
  .then(user => {
    res.send(user)
  })
  .catch(err => {
    console.log(err)
  })
});

// --------------------------------------------------

// @route   POST api/users
// @desc    Creates a new user
// @access  Automatically created by the bot upon the user joining the guild
router.post('/', (req, res) => {
  const { guildId, name, discordId } = req.body

  const newUser = User({
    guildId: guildId,
    name: name,
    discordId: discordId
  });

  newUser.save().then(user => res.json(user));
});

// --------------------------------------------------

// @route   PUT api/users
// @desc    Edits a Users library to add a game
// @access  Public
router.put('/', (req, res) => {
  User.updateOne(
    { discordId: req.body.id }, // Finds the user calling the command
    { // Pushes a new game to the Users Library array
      $push: {
        platform: {
          "name": req.body.name,
          "username": req.body.username
        }
      }
    }
  )
  .then(user => {
    console.log(`Success pushing to User.Platform`)
    res.send(user)
  })
  .catch(err => console.log(`Failed`, err))
});

// router.put('/', (req, res) => {
//   User.updateOne(
//     { discordId: req.body.id },
 
//   )
// })

module.exports = router;