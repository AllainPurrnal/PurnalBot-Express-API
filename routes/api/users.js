const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');

// @route   GET api/users
// @desc    GET The Users Guild Info
// @access  Undetermined
router.get('/', (req, res) => {
  if (req.query.discordId) {
    User.find({discordId: {$eq: req.query.discordId}})
    .then(user => {
      res.send(user)
    })
  }

  User.find()
    .sort({ name: 1 })
    .then(users => {
      console.log(users)
      res.send(users)
    })
});

// @route   POST api/users
// @desc    Creates a new user
// @access  Automatically created by the bot upon the user joining the guild
router.post('/', (req, res) => {
  const { guildId, name, discordId } = req.body

  const newUser = User({
    guildId: guildId,
    name: name,
    discordId: discordId
  })

  newUser.save().then(user => res.json(user));
})

// @route   PUT api/users
// @desc    Edits a Users library to add a game
// @access  Public
router.put('/', (req, res) => {
  User.updateOne(
    { discordId: req.body.id }, // Finds the user calling the command
    { // Pushes a new game to the Users Library array
      $push: {
        library: {
          "game": req.body.game,
          "platform": req.body.platform,
          "username": req.body.username
        }
      }
    }
  )
  .then(user => res.send(user))
  .catch(err => console.log(err))
})

module.exports = router;