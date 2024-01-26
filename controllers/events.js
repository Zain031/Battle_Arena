const { formatDate, generateEventInvitation } = require("../helper");
const { User, Profile, Event, Team, EventsHaveUsers } = require("../models");
const { Op } = require("sequelize");
// const{}

class EventController {
  static async readEvent(req, res) {
    try {

      console.log(req.query);

      const checkRole = await User.findOne({ where: { id: req.session.userId } })

      const { search } = req.query
      let opt = {}

      if (search) {
        opt.where = { name: { [Op.iLike]: `%${search}%` } }
      }

      let data = await Event.findAll(opt)
      // console.log(data);
      res.render("_layout", { body: 'event', data, formatDate, checkRole })
    }
    catch (error) {
      res.send(error)
    }
  }

  static async addEvent(req, res) {
    res.render('_layout', { body: "addEvent" })
  }

  static async SubmitAddEvent(req, res) {
    try {
      let {
        name,
        schedule,
        place
      } = req.body;

      await Event.create({
        name: name,
        schedule: schedule,
        place: place
      })

      res.redirect("/events")
    } catch (error) {
      res.send(error)
    }
  }

  static async joinEvent(req, res) {
    try {
      // Log information or handle errors before the redirect
      console.log(req.session, 'dari event!!!!!!!!!!!!!!!!!!!!!!');
      const { userId } = req.session
      const { eventId: id } = req.params



      await EventsHaveUsers.create({
        EventId: id,
        UserId: userId
      })

      const userDetail = await User.findOne({
        include: [{ model: Event, where: { id: id } }, { model: Profile }, { model: Team }],
        where: { id: userId }
      })
      const eventCode = await EventsHaveUsers.findOne({ where: { EventId: id, UserId: userId } })

      generateEventInvitation(userDetail.Events[0].name, userDetail.Profile.name, userDetail.Team.name, eventCode.eventCode)

      // Now perform the redirect
      const successMessage = `Congratulations ${userDetail.Events[0].name} from team ${userDetail.Profile.name}\nYou're successfully entering ${userDetail.Team.name} tournament`

      res.redirect(`/users/detail?success=${successMessage}`);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }

  static async deleteEvent(req, res) {
    try {
      // Log information or handle errors before the redirect
      const { userId } = req.session
      const { eventId: id } = req.params

      await Event.destroy({ where: { id: id } })

      res.redirect(`/events`);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }

}




module.exports = EventController