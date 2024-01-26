const teams = require('express').Router()
const UserController = require('../controllers');

// go to register page
teams.get('/', UserController.showAllTeam)
teams.get('/:teamId/join', UserController.joinTeam)

module.exports = teams;