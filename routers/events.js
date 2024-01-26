const events = require('express').Router()
const EventController = require('../controllers/events');

// show all event
events.get('/', EventController.readEvent)

events.get('/add', EventController.addEvent)
events.post('/add', EventController.SubmitAddEvent)

events.get('/:eventId/join', EventController.joinEvent)
events.get('/:eventId/delete', EventController.deleteEvent)

module.exports = events;