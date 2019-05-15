const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  ans1: {
    type: String,
    required: true
  },
  ans2: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Answer', answerSchema)
