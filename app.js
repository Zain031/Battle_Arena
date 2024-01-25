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
    https://github.com/BayuPrasetyaUtomo/EsportsRush/pull/1/conflict?name=controllers%252Fusers.js&base_oid=8a5d085d6b265a07cbabdec5d1c74d1d72189405&head_oid=ff9f64ea085b511bcf1fd378ff27db976b815c50
    console.log(`Example app listening on port ${port}`)
})