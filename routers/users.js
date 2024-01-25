const users = require('express').Router()
const Controller = require('../controllers')

users.get('/', Controller.showAllUser)

module.exports = users;