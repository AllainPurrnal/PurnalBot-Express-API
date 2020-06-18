const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
  resolved: {
    type: Boolean,
    default: false
  },
  guildId: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  reportedBy: {
    type: String,
    required: true
  },
  reportedById: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Report", reportSchema)