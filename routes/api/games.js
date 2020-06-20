const express = require('express');
const router = express.Router();

// Game Model
const Game = require('../../models/Game');

// @route   GET api/games
// @desc    GET All recognized games in the Guild
// @access  Public
router.get('/', (req, res) => {
  Game.find()
    .sort({ name: 1 })
    .then(games => {
      console.log(games)
      res.json(games)
    })
})

module.exports = router;