const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User')


//LOGIN-SINGUP
router.get('/login', (req, res) => {
  res.render('auth/login');
})

router.post('/login', (req, res) => {

  const { username, password } = req.body;

  if(!username || !password) {
    res.render('auth/login', {
      errorMessage: 'Please enter username and password'
    });
    return;
  }

  User.findOne({'username': username})
    .then((user) => {
      if(!user) {
        res.render('auth/login', {
          errorMessage: 'Invalid login'
        })
        //User does not exist on the DB
        return;
      }

      if(bcrypt.compareSync(password, user.password)) {
        //Login success!
        req.session.currentUser = user;
        //SESSION CREATED and set teh user to the Session 
        //User in the session allows the time set for teh session!

        res.redirect('/profile');
        //res.render('private/profile', { user })
        console.log(user);

      } else {
        //Passwords dont match
        res.render('auth/login', {
          errorMessage: 'Invalid login'   // So I dont give that much info
        })
      }
    });
});

//SIGNUP
router.post('/signup', (req, res) => {
  const { username, email, password, location } = req.body;
  
  //hash the password
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);

  if(username == '' || password == '') {
    res.render('auth/login' , 
    {
      errorMessage: 'Indicate username and password'
    });
    return;
  }

  // Regular expression to filter the password
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if(!regex.test(password)) {
    res.render('auth/login' , 
    {
      errorMessage: 'Password is not strong enough: needs at least 6 characters, one numebr and one uppercase'
    })
    return;
  }

  User.findOne({'username': username})
    .then((user) => {
      if(user) {   // !== undefined
        res.render('auth/login', {
          errorMessage: 'The username already exists'
        })
        return;
      }
      User.create({ username, email, password: hashPassword, location})
      // so it only creates after checking
      .then(() => {
        res.redirect('/profile');
      })
      .catch((err) => {  // From DATABASE
        if (err.code === 11000) {  // code message form MongoDB
          res.status(500).  // for REACT 
          render('auth/login', {
            errorMessage: 'Username and Email need to be unique'
          })
        } else {
          res.render('auth/login', {
            errorMessage: err
          })
        }
      })
    });
  
});


//LOG OUT 
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/')
})

module.exports = router;