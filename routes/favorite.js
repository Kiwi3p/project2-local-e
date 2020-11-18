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
    //console.log(allFavoritesFromDB);
    res.json( {favorites: allFavoritesFromDB });
  });
});


//WORKING!!!
router.post('/favorites/create', requireLogin,(req, res) => {
  let {place_id, name, address, rating} = req.body;
  console.log('req.body', req.body);

  /*Favorite.findOne({'id': place_id})
      .then((favorite) => {
        if(favorite) {   
         alert (`This is already a Favorite`) 
        } */
    Favorite.create({
      user: req.session.currentUser._id,
      id: place_id,
      name: name,
      address: address,
      rating: rating
    }).then(() => {
      res.redirect('/profile')
    });
  });
/*}); */

//WORKING!!!
router.post('/favorites/:favoritesId/delete', requireLogin, (req, res) => {
  let favoritesId = req.params.favoritesId;
//  let {id, name, address } = req.body;
  Favorite.findByIdAndDelete(favoritesId)
    .then(() => {
    res.redirect('/favorites');
  });
});

module.exports = router;
