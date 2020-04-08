// app.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const db = require('./db.js');

const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const User = mongoose.model('User');
const Profile = mongoose.model('Profile');
const Question = mongoose.model('Question');

//middleware
const session = require('express-session');
app.use(session({
  secret: 'secret for signing session id',
  resave: false,
  saveUninitialized: false
}));

//session store username
app.use(function (req, res, next) {
  if (!req.session.user && req.body.email) {
    req.session.user = req.body.email
  }
	res.locals.user = req.session.user
  next()
})

app.use(function(req, res, next) {
  const question = req.body
  if (req.session.Questions === undefined) {
    req.session.Questions = []
  }
	if (Object.keys(question).length !== 0) {
		req.session.Questions.push(question)
		}
		res.locals.myQuestions = req.session.Questions;
  next();
})

//should render random question from database (and the image of the associated user profile)
app.get('/', (req, res) => {
  Question.find({}, function (err, q) {
    if (err) {
      res.send(err.errmsg)
    } else {
      res.render('play', {questions: q})
    }
  });

  });

//need to improve authentication for both register and login - looking into PassportJS
app.get('/register', (req, res) => {
  res.render('register')
});

app.post('/register', (req, res) => {
  console.log(req.body)
  const { email, password, password_conf } = req.body
  const newUser = new User({ email, password })
  //use schema.create to insert data into the db
  newUser.save((err, savedUser) => {
    if (err) {
       res.render('register', {error: err.errmsg});
    } else {
      console.log(savedUser, "has been added to db!")
      res.redirect('/profile');
    }
  });
});

app.get('/login', (req, res) => {
    res.render('login')
  });

app.post('/login', (req, res) => {
  console.log(req.body)
  const { email, password } = req.body
  //use schema.create to insert data into the db
  User.find({ email, password }, function (err, user) {
    if (err) {
      res.send(err.errmsg)
    } else {
      console.log(user, "logged in!")
      res.redirect('/profile');
    }
  });
  });

// app.post('/login', passport.authenticate('local', { successRedirect: '/profile',
//                                                     failureRedirect: '/login' }));

app.get('/profile', (req, res) => {
  const profile_id = res.locals.user;
  Question.find({ profile_id }, function (err, q) {
    if (err) {
      res.send(err.errmsg)
    } else {
      console.log("showing profile")
      res.render('profile', {questions: q})
    }
  });
})

app.post('/profile', (req, res) => {
  const profile_id = res.locals.user;
  console.log(profile_id)
  const newQuestion = new Question({
    profile_id: profile_id,
    question: req.body.question,
    answers: {
      a: req.body.a,
      b: req.body.b,
      c: req.body.c,
    },
    correctAnswer: req.body.correctAnswer,
  })
  Question.find({profile_id: profile_id, question: req.body.question}, function (err, q) {
    if (q.length === 0) {
      newQuestion.save((err, savedQues) => {
        if (err) {
           res.render('profile', {error: err.errmsg});
        } else {
          console.log(savedQues, "has been added to db!")
          res.redirect('/profile');
        }
      })
    }
    else if (err) {
      res.send(err.errmsg)
    }
    else {
      res.send("dupe") //temp TODO
    }
  });
})


app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

  const port = 3000;
  app.listen(port);
  console.log(`server started on port ${port}`);
