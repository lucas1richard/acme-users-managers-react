const router = require('express').Router();
const db = require('../db');

const { User } = db.models;
db.seed();

router.get('/users', (req, res, next) => {
  User.usersWManagers()
  .then(users => res.json(users))
  .catch(next);
});

router.put('/users/:userId', (req, res, next) => {
  User.changeManager(req.params.userId, req.body.managerId)
  .then(user => res.json(user))
  .catch(next);
});

router.get('/managers', (req, res, next) => {
  User.scope('managers').findAll()
  .then(managers => {
    res.json(managers);
  })
  .catch(next);
});

module.exports = router;
