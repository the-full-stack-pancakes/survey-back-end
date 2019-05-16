const express = require('express')
const passport = require('passport')
const Two = require('../models/two')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// CREATE
router.post('/twos', requireToken, (req, res, next) => {
  req.body.two.owner = req.user.id

  Two.create(req.body.two)
    .then(two => {
      res.status(201).json({ two: two.toObject() })
    })
    .catch(next)
})
// INDEX
router.get('/twos', (req, res, next) => {
  Two.find()
    .then(twos => {
      return twos.map(two => two.toObject())
    })
    .then(twos => res.status(200).json({ twos: twos }))
    .catch(next)
})
// SHOW
router.get('/twos/:id', (req, res, next) => {
  Two.findById(req.params.id)
    .then(handle404)
    .then(two => res.status(200).json({ two: two.toObject() }))
    .catch(next)
})
// UPDATE
router.patch('/twos/:id', removeBlanks, (req, res, next) => {
  delete req.body.two.owner

  Two.findById(req.params.id)
    .then(handle404)
    .then(two => {
      return two.update(req.body.two)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY / DELETE
router.delete('/twos/:id', requireToken, (req, res, next) => {
  Two.findById(req.params.id)
    .then(handle404)
    .then(two => {
      requireOwnership(req, two)
      two.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
