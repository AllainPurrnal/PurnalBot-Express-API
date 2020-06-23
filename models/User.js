const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  platform: {
    type: Array,
    required: false
  },
  discordId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);