const { User, Event } = require('../models')
const bcrypt = require("bcryptjs");

class UserController {
  static async showAllUser(req, res) {
    try {
      const userList = await User.findAll()
      console.log(userList);
      res.send(userList)
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = UserController