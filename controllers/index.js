const bcrypt = require('bcryptjs')
const { User, Event, Profile, Team, EventsHaveUsers } = require('../models')
const { loginValid } = require('../helper')

class UserController {

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

      // console.log(email, password);

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

            res.redirect(`/users/${user.id}`)
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

  static async checkUserProfile(req, res) {
    try {

      const { userId: id } = req.params
      console.log(req.params)

      const userProfileExist = await User.findOne({
        include: Profile,
        where: {
          id: id
        }
      })

      console.log(userProfileExist)

      userProfileExist.Profile == null ? res.redirect(`/users/${id}/profile`) : res.redirect('/events')

    } catch (error) {
      res.send(error)
    }
  }

  static async showProfileForm(req, res) {
    console.log(req.params);

    const { userId: id } = req.params
    res.render('_layout', { body: 'profile', id })
  }

  static async submitProfileUser(req, res) {
    try {

      const { userId: id } = req.params
      const { name, gender, age } = req.body

      console.log(req.body)

      await Profile.create({
        name: name,
        gender: gender,
        age: age,
        UserId: id
      })

      res.redirect('/events')
    } catch (error) {
      res.send(error)
    }
  }

  // show all available team
  static async showAllTeam(req, res) {
    try {
      const data = await Team.findAll()

      res.render('_layout', { body: 'team', data })
    } catch (error) {
      res.send(error)
    }
  }

  static async joinTeam(req, res) {
    try {
      console.log(req.params);

      const { userId: id } = req.session
      const { teamId } = req.params
      await User.update({ TeamId: teamId }, {
        where: {
          id: id
        }
      })

      res.redirect('/events')
    } catch (error) {
      res.send(error)
    }
  }

}


module.exports = UserController