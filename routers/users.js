const UserController = require('../controllers/users');
const users = require('express').Router()


// users.get('/register', UserController.newUserForm)
// users.post('/register', UserController.submitNewUser)
// users.get('/', UserController.showAllUser)

module.exports = users;