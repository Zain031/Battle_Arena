const formatDate = require("../helper");
const {
  Event, Team
} = require("../models")

// const{}

class EventController {
  static async readEvent(req, res) {
    try {
      // let name = req.query.name
      // let opt = {
      //   where: {
      //     name: {
      //       [Op.iLike]: { name }
      //     }
      //   }
      // }

      let data = await Event.findAll()
      console.log(data);
      res.render("_layout", { body: 'event', data, formatDate })
    } catch (error) {
      res.send(error)
    }
  }
  static async addEvent(req, res) {
    try {
      res.render('_layout', { body: "addEvent" })
    } catch (error) {
      res.send(error)
    }
  } static async SubmitAddEvent(req, res) {
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
      res.redirect("./")
    } catch (error) {
      res.send(error)
    }
  }
  static async readTeam(req, res) {
    try {

      // let opt = {
      //   where: {
      //     name: {
      //       [Op.iLike]: { name }
      //     }
      //   }
      // }

      const data = await Team.findAll()
      console.log(data);
      // res.send(data)
      res.render('_layout', { body: "team", data })
    } catch (error) {
      res.send(error)
    }
  } static async addTeam(req, res) {
    try {
      res.render("addTeam")
    } catch (error) {
      res.send(error)
    }
  } static async SubmitAddTeam(req, res) {
    try {
      let { name } = req.body
      await Team.create({ name })
      res.redirect("/team")
    } catch (error) {
      res.send(error)
    }
  }
}










module.exports = EventController