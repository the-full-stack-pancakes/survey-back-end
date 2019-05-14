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
    ans3: String,
    ans4: String
  }]
})

module.exports = mongoose.model('Survey', surveySchema)
