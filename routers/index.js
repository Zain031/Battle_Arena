const router = require('express').Router()
const events = require('./events');
const users = require('./users');
const teams = require('./teams');
const UserController = require('../controllers');
const { loginValid } = require('../helper');

// go to register page
router.get('/register', UserController.registrationForm)
router.post('/register', UserController.postRegister)
router.get('/', (req, res) => loginValid ? res.redirect('/events') : res.redirect('/login'))

// go to login page
router.get('/login', UserController.loginForm)
router.post('/login', UserController.postLogin)

// go to user page
router.use('/users', loginValid, users)
// router.use('/users/:userId', loginValid, UserController.showProfileForm)

// go to event page
router.use('/events', loginValid, events)

// go to list of team page
router.use('/teams', loginValid, teams)

// log out session
router.get('/logout', UserController.logoutThisSession)

module.exports = router;