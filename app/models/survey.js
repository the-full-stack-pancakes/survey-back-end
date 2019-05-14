const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  answers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Survey', surveySchema)
