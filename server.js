const express = require('express');
const app = express();

let bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');
const port = process.env.PORT ||5000;

const urlencodedParser = bodyParser.urlencoded({ extended: false });

require('dotenv').config()

// set template engine 
app.set('view engine', 'ejs')

// EndPoints

app.get('/', (req, res) => {
    res.render('index')
})


app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', urlencodedParser, [
    check('username', 'This username must be 3+ characters long')
        .exists()
        .isLength({ min: 3 }),
    check('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail()
], (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // return res.status(400).json(errors.array())
        const alert = errors.array()
        res.render('register', {
            alert
        })
    } else {
        // res.render('register', {
        //     massage : 'User registration Successfully'
        // })
    }
})


app.listen(port, () => console.log(`Server Running at the port ${port}`))