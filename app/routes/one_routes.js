const express = require('express')
const passport = require('passport')
const One = require('../models/one')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// CREATE
router.post('/ones', requireToken, (req, res, next) => {
  req.body.one.owner = req.user.id

  One.create(req.body.one)
    .then(one => {
      res.status(201).json({ one: one.toObject() })
    })
    .catch(next)
})
// INDEX
router.get('/ones', (req, res, next) => {
  One.find()
    .then(ones => {
      return ones.map(one => one.toObject())
    })
    .then(ones => res.status(200).json({ ones: ones }))
    .catch(next)
})
// SHOW
router.get('/ones/:id', (req, res, next) => {
  One.findById(req.params.id)
    .then(handle404)
    .then(one => res.status(200).json({ one: one.toObject() }))
    .catch(next)
})
// UPDATE
router.patch('/ones/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.one.owner

  One.findById(req.params.id)
    .then(handle404)
    .then(one => {
      requireOwnership(req, one)

      return one.update(req.body.one)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY / DELETE
router.delete('/ones/:id', requireToken, (req, res, next) => {
  One.findById(req.params.id)
    .then(handle404)
    .then(one => {
      requireOwnership(req, one)
      one.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
