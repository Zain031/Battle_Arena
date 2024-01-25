const router = require('express').Router()
const users = require('./users');
const events = require('./events');
const Controller = require('../controllers');

// go to register page
router.get('/', (req, res) => res.redirect('/login'))

router.get('/register', Controller.registrationForm)
router.post('/register', Controller.postRegister)

// go to login page
router.get('/login', Controller.loginForm)
router.post('/login', Controller.postLogin)

// log out session
router.get('/logout', Controller.logoutThisSession)

router.use((req, res, next) => {
  const errorMessage = `Please login first !`
  console.log(req.session)
  !req.session.userId ? res.redirect(`/login?errorMessage=${errorMessage}`) : next()

})

// go to user page
router.use('/users', users)

// go to event page
router.use('/events', events)

module.exports = router;