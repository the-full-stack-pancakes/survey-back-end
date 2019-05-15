const express = require('express')
const passport = require('passport')
const Survey = require('../models/survey')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// CREATE
router.post('/surveys', requireToken, (req, res, next) => {
  req.body.survey.owner = req.user.id

  Survey.create(req.body.survey)
    .then(survey => {
      res.status(201).json({ survey: survey.toObject() })
    })
    .catch(next)
})
// INDEX
router.get('/surveys', (req, res, next) => {
  Survey.find()
    //.populate({
    //  path: 'questions',
    //  model: 'Question',
    //  populate: {
    //    path: 'answer',
    //    model: 'Answer'
    //  }
    //})
    .then(surveys => {
      return surveys.map(survey => survey.toObject())
    })
    .then(surveys => res.status(200).json({ surveys: surveys }))
    .catch(next)
})
// SHOW
router.get('/surveys/:id', requireToken, (req, res, next) => {
  Survey.findById(req.params.id)
    .then(handle404)
    .then(survey => res.status(200).json({ survey: survey.toObject() }))
    .catch(next)
})
// UPDATE
router.patch('/surveys/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.survey.owner

  Survey.findById(req.params.id)
    .then(handle404)
    .then(survey => {
      requireOwnership(req, survey)
      return survey.update(req.body.survey)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
router.delete('/surveys/:id', requireToken, (req, res, next) => {
  Survey.findById(req.params.id)
    .then(handle404)
    .then(survey => {
      requireOwnership(req, survey)
      survey.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
