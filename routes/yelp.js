const yelp = require('yelp-fusion');
const express = require('express');
const router  = express.Router();

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'WgRag4zBmo7OTNmEPv_H4JsjK1OhtfSYeCIG99_4-xK7R0Ref9OP0RlVWb_5GssPYF9KucWPXl70qYDIzIGruWthGl3ZgcC9YuxBYOg8T21PmTk6kzRKSTf2InKtX3Yx';


/*
let listOfSupermarketsFromAPI = [];

let filteredSupermarkets = listOfSupermarketsFromAPI.filter((supermarket) => {
  return supermarket.name !== 'pingo doce' || 
}) */


const client = yelp.client(apiKey);


router.get('/yelp', (req, res) =>  {
  //console.log('usr location', req.session.currentUser.location)
  const searchRequest = {
    term:'Farmers market',
    location: req.session.currentUser.location,
    //latitude: 38.7600325,   //input {{LAT}} data here
    //longitude: -9.1400807, //input {{LONG}} data here
    radius: 5000, 
    limit: 8
  };
  
client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses;
//  const prettyJson = JSON.stringify(firstResult, null, 4);
//  console.log(firstResult);
  res.render('private/profile', {print: firstResult})
}).catch(e => {
  console.log(e);
});
});

//app.listen(3000, () => console.log('My Yelp project running on port 3000 🎧 🥁 🎸 🔊'));
module.exports = router;