const express = require('express');
const router = express.Router();

// Game Model
const Game = require('../../models/Game');

// @route   GET api/games
// @desc    GET All games supported in the guild
// @access  Public
router.get('/', (req, res) => {
  Game.find()
    .sort({ name: 1 })
    .then(games => {
      console.log(games)
      res.send(games)
    });
});

// @route   POST api/games
// @desc    Adds a new game to the server list
// @access  Private Moderation Team Only
router.post('/', (req, res) => {
  const { guildId, name } = req.body

  const newGame = Game({
    guildId: guildId,
    name: name
  });

  newGame.save().then(game => res.json(game));
})

module.exports = router;