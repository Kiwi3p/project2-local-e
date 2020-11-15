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


    router.get('/profile', requireLogin, (req, res) => {
      res.render('private/profile');
    });

    router.get('/map', requireLogin, (req, res) => {
      res.render('private/map');
    });

module.exports = router;
