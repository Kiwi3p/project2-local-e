const express = require('express');
const router  = express.Router();

function requireLogin(req, res, next) {
  if(req.session.currentUser) {
    next();
  } else {
    res.redirect('/login');
  }
}

    /* GET home page */
    router.get('/', (req, res, next) => {
      req.app.locals.loggedUser = req.session.currentUser;
      //set the local here as it has to be after loggedIn
      // to be able to show my local in my layout
      res.render('index', {user: req.session.currentUser});
      //User in the session allows the time set for teh session!
    });

    //profile
    router.get('/profile', requireLogin, (req, res) => {
      res.render('private/profile');
    });

    //map
    router.get('/map', requireLogin, (req, res) => {
      res.render('private/profile');
    });

    //location
    router.get('/location', (req, res) => {

      let location = JSON.stringify({ lat: '123', long: '123'})
      res.render('location/location', {location : location});
    })

    //READ and display landing profile page with stored location
    router.app('/private/profile', (req, res) =>{
      callAPI
      .cliet()
    })

module.exports = router;
