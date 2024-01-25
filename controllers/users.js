
const { User, Event } = require('../models')

class UserController {
  static async showAllUser(req, res) {
    try {
      const userList = await User.findAll()

      res.send(userList)
    } catch (error) {

    }
  }
}

module.exports = UserController