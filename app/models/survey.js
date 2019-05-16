const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  one: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'One',
    required: true
  },
  two: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Two',
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Survey', surveySchema)
