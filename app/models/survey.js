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
  surveyQuestions: [{
    que: String,
    ans1: String,
    ans2: String,
    required: true
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Survey', surveySchema)
