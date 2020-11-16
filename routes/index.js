const express = require('express');
const router  = express.Router();
const yelp = require('yelp-fusion');

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
  
      console.log(storedLocation)

    });

    
    router.get('/profile', requireLogin, (req, res) => {
      const apiKey = 'WgRag4zBmo7OTNmEPv_H4JsjK1OhtfSYeCIG99_4-xK7R0Ref9OP0RlVWb_5GssPYF9KucWPXl70qYDIzIGruWthGl3ZgcC9YuxBYOg8T21PmTk6kzRKSTf2InKtX3Yx';
      const client = yelp.client(apiKey);
      const storedLocation = req.session.currentUser.location;
      const searchRequest = {
      term:'Farmers market',
      location: storedLocation,
      //latitude: 38.7600325,   //input {{LAT}} data here
      //longitude: -9.1400807, //input {{LONG}} data here
      radius: 5000, 
      limit: 8
    };
      client.search(searchRequest).then(response => {
        const firstResult = response.jsonBody.businesses;
      //  const prettyJson = JSON.stringify(firstResult, null, 4);
        console.log(firstResult);
      res.render('private/profile', {print: firstResult});
      console.log(currentLocation);
    }).catch(e => {
      console.log(e);
    });
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
