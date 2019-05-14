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
