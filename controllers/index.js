const EventController = require("./events")
const UserController = require("./users")

class Controller {
  static home(req, res) {
    res.render('_layout')
  }

}


module.exports = Controller