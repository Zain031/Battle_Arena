const express = require('express')
const app = express()
const port = 3000
const router = require("./routers/index")


<<<<<<< Updated upstream
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
}));
=======
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
>>>>>>> Stashed changes
app.use('/', router);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})