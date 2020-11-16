document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);


//GEt location
var x = document.getElementById("demo");
function getLocation() {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else { 
  x.innerHTML = "Geolocation is not supported by this browser.";
}
}

function showPosition(position) {
console.log(position);
x.innerHTML = "Latitude: " + position.coords.latitude + 
"<br>Longitude: " + position.coords.longitude;
}


let map;
function initMap() {
  const lisbon = { lat: 38.7117206, lng: -9.1264315 };
   map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: lisbon
  });
}

