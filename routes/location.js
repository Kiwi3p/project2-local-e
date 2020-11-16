const express = require('express');
const router  = express.Router();

//My Location API
//var x = document.getElementById("demo");




//routes
router.get('/location', (req, res) => {

  let location = JSON.stringify({ lat: '123', long: '123'})
  res.render('location/location', {location : location});
})


module.exports = router;