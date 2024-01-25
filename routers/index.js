const router = require('express').Router()
const users = require('./users');

const Controller = require('../controllers');
const events = require('./events');

router.get('/', Controller.home)
router.use('/users', users)
router.use('/events', events)

module.exports = router;