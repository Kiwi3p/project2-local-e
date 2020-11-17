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
        return;
      }
      if(bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect('/profile');
      } else {

        res.render('auth/login', {
          errorMessage: 'Invalid login'   
        })
      }
    });
});

//SIGNUP
router.post('/signup', (req, res) => {
  const { username, email, password, location } = req.body;
  
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);

  if(username == '' || password == '') {
    res.render('auth/login' , 
    {
      errorMessage: 'Indicate username and password'
    });
    return;
  }

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
      if(user) {   
        res.render('auth/login', {
          errorMessage: 'The username already exists'
        })
        return;
      }
      User.create({ username, email, password: hashPassword, location})
      .then(() => {
        res.redirect('/profile');
      })
      .catch((err) => { 
        if (err.code === 11000) {  
          res.status(500).  
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