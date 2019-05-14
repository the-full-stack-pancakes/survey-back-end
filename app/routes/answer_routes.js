const express = require('express')
const passport = require('passport')
const Answer = require('../models/answer')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// CREATE
router.post('/answers', requireToken, (req, res, next) => {
  req.body.answer.owner = req.user.id

  Answer.create(req.body.answer)
    .then(answer => {
      res.status(201).json({ answer: answer.toObject() })
    })
    .catch(next)
})
// INDEX
router.get('/answers', (req, res, next) => {
  Answer.find()
    .then(answers => {
      return answers.map(answer => answer.toObject())
    })
    .then(answers => res.status(200).json({ answers: answers }))
    .catch(next)
})
// SHOW
router.get('/answers/:id', (req, res, next) => {
  Answer.findById(req.params.id)
    .then(handle404)
    .then(answer => res.status(200).json({ answer: answer.toObject() }))
    .catch(next)
})
// UPDATE
router.patch('/answers/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.answer.owner

  Answer.findById(req.params.id)
    .then(handle404)
    .then(answer => {
      requireOwnership(req, answer)

      return answer.update(req.body.answer)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY / DELETE
router.delete('/answers/:id', requireToken, (req, res, next) => {
  Answer.findById(req.params.id)
    .then(handle404)
    .then(answer => {
      requireOwnership(req, answer)
      answer.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
