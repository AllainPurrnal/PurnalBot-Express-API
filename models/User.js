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
  library: {
    type: Array,
    required: false
  },
  discordId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("User", userSchema)