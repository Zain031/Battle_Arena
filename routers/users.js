const users = require('express').Router()
const UserController = require('../controllers');

// show all event
users.get('/', UserController.checkUserProfile)
users.get('/detail', UserController.userDetail)
users.get('/detail/edit', (req, res) => res.redirect(`/users/${req.session.userId}/profile/edit`))

users.get('/:userId', UserController.checkUserProfile)
users.get('/:userId/profile', UserController.showProfileForm)
users.post('/:userId/profile', UserController.submitUserProfile)

users.get('/:userId/profile/edit', UserController.editProfileForm)
users.post('/:userId/profile/edit', UserController.submitEdittedProfile)

module.exports = users;