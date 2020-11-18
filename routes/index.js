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
             let favoritesIds = allFavoritesFromDB.map((favorite) => {
                return favorite.id;
             });
             let favoritesIdsStr = JSON.stringify(favoritesIds);
             res.render('private/profile', {user: req.session.currentUser, thisLocation: geocodeLocationStr, favorites: favoritesIdsStr});
          });
        })
        
    });
    
    //map
    router.get('/profile', requireLogin, (req, res) => {
    /*   const markers = [
    { lat: 38.7129146, lng: -9.1286218 },
    { lat: 38.7117206, lng: -9.1264315 },
    { lat: 38.7123872, lng: -9.1287935}
  ];
  let markersString = JSON.stringify(markers);  , { markers: markersString}*/
      res.render('private/profile');
    });


    //ENTER location 
    router.get('/location', (req, res) => {

      let location = JSON.stringify({ lat: '123', long: '123'})
      res.render('location/location', {location : location});
    })


module.exports = router;
