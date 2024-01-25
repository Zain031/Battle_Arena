let formatDate = (date) => {

  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const loginValid = ((req, res, next) => {
  const errorMessage = `Please login first !`
  console.log(req.session)
  !req.session.userId ? res.redirect(`/login?errorMessage=${errorMessage}`) : next()

})

module.exports = { formatDate, loginValid }