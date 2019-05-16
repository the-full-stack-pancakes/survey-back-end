const mongoose = require('mongoose')

const oneSchema = new mongoose.Schema({
  title: {
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

module.exports = mongoose.model('One', oneSchema)
