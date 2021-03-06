const express = require('express');
const router  = express.Router();
const axios = require('axios');
const Favorite = require('../models/Favorite');

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
      let storedLocation = req.session.currentUser.location;
      console.log(storedLocation);
    
      axios
        .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${storedLocation}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        )       
        .then((response) => {
          console.log(response.data.results[0].geometry.location);
          let geocodeLocation = response.data.results[0].geometry.location; 
          let geocodeLocationStr = JSON.stringify(geocodeLocation);

          Favorite.find().then((allFavoritesFromDB) => {
             let allFavoritesFromDBStr = JSON.stringify(allFavoritesFromDB);
             res.render('private/profile', {user: req.session.currentUser, thisLocation: geocodeLocationStr, favorites: allFavoritesFromDBStr});
          });
        })
        
    });
    
    //map
    router.get('/profile', requireLogin, (req, res) => {
      res.render('private/profile');
    });


    //ENTER location 
    router.get('/location', (req, res) => {

      let location = JSON.stringify({ lat: '123', long: '123'})
      res.render('location/location', {location : location});
    })


module.exports = router;
