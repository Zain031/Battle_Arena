const bcrypt = require('bcryptjs')
const { User, Event } = require('../models')

class Controller {

  // GO TO REGISTRATION FORM
  static registrationForm(req, res) {
    res.render('_layout', { body: 'registrationPage' })
  }

  // REGISTER
  static async postRegister(req, res) {
    try {

      const { email, password } = req.body

      await User.create({
        email: email,
        password: password,
      })

      console.log(email, password);

      res.redirect('/login')
    } catch (error) {
      res.send(error)
    }
  }

  // GO TO LOGIN PAGE
  static async loginForm(req, res) {

    const { errorMessage } = req.query;

    console.log(errorMessage);

    res.render('_layout', { body: 'loginPage', errorMessage })

  }

  // LOGGED IN
  static async postLogin(req, res) {
    try {

      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } })
        .then(user => {
          const userValid = bcrypt.compareSync(password, user.password);

          if (userValid) {

            req.session.userId = user.id
            
            res.redirect('/events')
          } else {
            throw `Username or Password invalid`
          }
        }
        )
    } catch (error) {
      res.redirect(`/login?errorMessage=${error}`)
    }
  }

  static async logoutThisSession(req, res) {
    req.session.destroy(error => {
      if (error) res.send(error)
      else { res.redirect('/login') }
    })
  }


}


module.exports = Controller