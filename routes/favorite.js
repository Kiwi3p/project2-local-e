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

//get favorites from Back-end
router.get('/favorites', requireLogin, (req, res) => {
  
  Favorite.find({user: req.session.currentUser._id})
  .then((allFavoritesFromDB) => {
    res.render('private/favorite', {favorites: allFavoritesFromDB, user: req.session.currentUser});
  });
});

router.get('/favorites/create', requireLogin, (req, res) => {
  User.find()
  .then((allTheUsersFromDB) => {
    res.render('private/favorite-create', {users: allTheUsersFromDB})
  })

});

//WORKING!!!
//Create favorites(delete later as this is just to get database going)
router.post('/favorites/create', requireLogin,(req, res) => {
  let {place_id, name, address} = req.body;
  console.log('req.body',req.body);
  Favorite.create({
    user: req.session.currentUser._id,
    id: place_id,
    name: name,
    address: address
  }).then(() => {
    res.redirect('/profile')
  });
});


router.post('/favorites/:favoritesId/delete', requireLogin, (req, res) => {
  let favoritesId = req.params.favoritesId;
  let {id, name, address } = req.body;
  Favorite.findByIdAndDelete(favoritesId)
    .then(() => {
    res.redirect('/favorites');
  });
});

module.exports = router;
