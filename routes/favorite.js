const { Router } = require('express');
const express = require('express');
const router  = express.Router();
const Favorite = require('../models/Favorite');
const User = require('../models/User');

function requireLogin(req, res, next) {
  if(req.session.currentUser) {
    next();
  } else {
    res.redirect('/login');
  }
}
//WORKING!!!
//get favorites from Back-end
router.get('/profile/favorites', (req, res) => {
  
  Favorite.find({user: req.session.currentUser._id})
  .then((allFavoritesFromDB) => {
    res.json( {favorites: allFavoritesFromDB });
  });
});


//WORKING!!!
router.post('/favorites/create', requireLogin,(req, res) => {
  let {place_id, name, address, rating, lat, lng} = req.body;
  console.log('req.body', req.body);

    Favorite.create({
      user: req.session.currentUser._id,
      id: place_id,
      name: name,
      address: address,
      rating: rating,
      lat: lat, 
      lng: lng
    }).then(() => {
      res.redirect('/profile')
    });
  });

//WORKING!!!
router.post('/profile/:favoritesId/delete', requireLogin, (req, res) => {
  let favoritesId = req.params.favoritesId;
  Favorite.findByIdAndDelete(favoritesId)
    .then(() => {
    res.redirect('/profile?showOnlyFavorites=true');
  });
});

module.exports = router;
