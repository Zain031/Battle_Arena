<<<<<<< Updated upstream
const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();



=======
const router = require('express').Router()
const users = require('./users');
const events = require('./events');
const Controller = require('../controllers');

router.get('/', (req, res) => res.send('it works PIM!!!'))
router.use('/users', users)//users)
// router.use('/events', events)
>>>>>>> Stashed changes

module.exports = router;