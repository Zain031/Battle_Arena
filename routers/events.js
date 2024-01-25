const events = require('express').Router()
const EventController = require('../controllers/events');

// show all event
events.get('/', EventController.readEvent)

events.get('/add', EventController.addEvent)
events.post('/add', EventController.SubmitAddEvent)

events.get('/team', EventController.readTeam)
events.get('/team/add', EventController.addTeam)
events.post('/team/add/submit', EventController.SubmitAddTeam)

module.exports = events;