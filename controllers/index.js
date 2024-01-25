const EventController = require("./events")
const UserController = require("./users")

class Controller {
  static home(req, res) {
    res.send('mulaii!!!!!!')
    // res.render('_layout')
  }

  static showAllUser(req, res) {
    
    res.send(`good joobbb`)
  }
}


module.exports = Controller