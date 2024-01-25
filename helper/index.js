let formatDate = (date) => {

  return date.toLocaleDateString('id-ID', {
     weekday: 'long',
     year: 'numeric',
     month: 'long',
     day: 'numeric',
   })
 }

 module.exports = formatDate