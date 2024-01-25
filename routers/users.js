const users = require('express').Router()
const UserController = require('../controllers');

// show all event
// users.get('/', UserController.checkUserProfile)
// users.get('/team', UserController.readTeam)

users.get('/:userId', UserController.checkUserProfile)
users.get('/:userId/profile', UserController.showProfileForm)
users.post('/:userId/profile', UserController.submitProfileUser)

// users.get('/team/add', UserController.addTeam)
// users.post('/team/add/submit', UserController.SubmitAddTeam)

module.exports = users;