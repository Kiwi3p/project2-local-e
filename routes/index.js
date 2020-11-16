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
     
      //req.session.currentUser = user;
      let storedLocation = req.session.currentUser.location;
  
      console.log(storedLocation)

      res.render('private/profile');
    });

    //map
    router.get('/map', requireLogin, (req, res) => {
      res.render('private/profile');
    });


    //ENTER location 
    router.get('/location', (req, res) => {

      let location = JSON.stringify({ lat: '123', long: '123'})
      res.render('location/location', {location : location});
    })


module.exports = router;
