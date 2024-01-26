const PDFDocument = require('pdfkit');
const fs = require('fs');

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

function generateString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}


const generateEventInvitation = (event = 'BlackCompany', name = 'Anonymous', team = 'not Undefined', code = 'lol555lol') => {
  // Create a document
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(`./files/ticket_event_${event.split(' ').join('_')}_${name.split(' ').join('_')}_${code}.pdf`));

  doc
    .image('./images/event-logo.jpg', 205, 15, { fit: [200, 200], align: 'center', valign: 'center' })


  doc
    .font('files/BebasNeue-Regular.ttf')
    .fontSize(25)
    .moveDown()
    .moveDown()
    .moveDown()
    .moveDown()
    .moveDown()


  doc.text(`Congratulations ${name} from team ${team}`, {
    width: 425,
    align: 'center'
  }
  )

  doc
    .moveDown()
  doc.text(`You're successfully enter ${event} tournament`, {
    width: 425,
    align: 'center'
  }
  )

    .moveDown()
    .moveDown()
    .moveDown()
    .moveDown()
  doc.text(`Show this code to enter the venue`, {
    width: 425,
    align: 'center'
  }
  )

    .moveDown()
  doc.text(`${code}`, {
    width: 425,
    align: 'center'
  }
  );

  doc.end()

  return doc
}



module.exports = { formatDate, loginValid, generateString, generateEventInvitation }