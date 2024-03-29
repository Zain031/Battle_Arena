const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000
const router = require("./routers/index")

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true
    }
}))

app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})