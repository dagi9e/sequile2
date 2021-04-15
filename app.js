const express = require('express')
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const { v4: uuidv4 } = require('uuid');
const matchCredentials = require('./utils.js')
const { User , Session} = require('./fake_db.js')
const app = express();
const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// show home with forms
app.get('/', function(req, res) {
    res.render('pages/home')
})

////////////////////////////////////////////////

app.post('/create',async function(req, res) {
    // let bodyB = JSON.parse(req.body);​
    // let bodyB = JSON.stringify(req.body);​
    // let bodyB = req.body​

    const user =  await User.create({
        username: req.body.username,
        password: req.body.password // need to encrypt
    }
)
// ;​
    res.redirect('/')
})

///////////////////////////////////////////////////////////


// login

// let global_id = 0; //this global variable will later be used to hold the current session unique ID
// let sesh=0;
app.post('/login', async function(req, res) {
    if (await matchCredentials(req.body.username)) {

        let id = uuidv4()
        global_id = id;

       sesh= await Session.create({
            sessionID: id,
            timeOfLogin: Date.now(),
            user: req.body.username
            
        })

        res.cookie('SID', id, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true
        })
        res.render('pages/members')
    } else {
        res.redirect('/error')
    }



})


// this is the protected route
// let session=0;
app.get('/supercoolmembersonlypage', async function(req, res) {
    let id2 = req.cookies.SID
        // let session = fake_db.sessions[id2]
    let session = await Session.findOne({
        where: {
            sessionID: id2
        }
    })

    if (session) {
        res.render('pages/members')
    } else {
        res.render('pages/error')
    }
})

//the line of code below is the solution to the challenge
app.get('/clc', async function(req, res) {
    res.cookie('SID', null, {
        expires: new Date(Date.now() - 900000),
        httpOnly: true
    })

    // await sesh.destroy();
    // delete fake_db.sessionId.global_id //global_id varriable is the copy of the unique id created by uuidv4()
    res.render('pages/home')
})

// if something went wrong, you get sent here
app.get('/error', function(req, res) {
    res.render('pages/error')
})

// 404 handling
app.all('*', function(req, res) {
    res.render('pages/error')
})

app.listen(1612)
    console.log('running')