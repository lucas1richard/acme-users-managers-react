const router = require('express').Router();
const db = require('../db');

const { User } = db.models;
db.seed()
  .then(() => User.findOne({ where: { id: -1 } })
  )
  .then(user => console.log(user));


router.get('/users', (req, res, next) => {
  User.usersWManagers()
  .then(users => res.json(users))
  .catch(next);
});

router.put('/users/:userId', (req, res, next) => {
  User.changeManager(req.params.userId, req.body.managerId)
  .then(user => {
    console.log(user.get());
    return res.json(user);
  })
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
