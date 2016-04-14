//Created by matthewthoms on 2016-03-15.


//DOCUMENT READY!!!!!!!!!!
$( document ).ready(function() {
    //Checking to see if the document is ready.
    console.log( "The DOM is ready!" );


    //Calling the function to get the location.
    //getLocation();

    var x = document.getElementById("warning");

    //The Location is set to Orillia, ON, Canada by default.
    var lat = 44.6055708;
    var long = -79.4575288;

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
    function success(pos) {
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log('Latitude : ' + crd.latitude);
        console.log('Longitude: ' + crd.longitude);
        console.log('More or less ' + crd.accuracy + ' meters.');

        lat = crd.latitude;
        long = crd.longitude;
        console.log('Lat: ' + lat);
        console.log('Long: ' + long);
        return lat, long;
    };

    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    };
    /*
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    //showPosition(position);
    function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);

        var coords = [];
        coords['lat'] = position.coords.latitude;
        coords['long'] = position.coords.longitude;
        return coords;

        lat = position.coords.latitude;
        long = position.coords.longitude;
        //console.log(lat + ', ' + long);
    } */







    console.log('Lat: ' + lat);
    console.log('Long: ' + long);

    //Setting the View to the current area.


    var map = L.map('map').setView([lat, long], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.light',
        //Importing the AccessToken for Mapbox to import the map into the API.
        accessToken: 'pk.eyJ1IjoibWJ0aG9tcyIsImEiOiJjaWthZG5wNWkwbDlwdm9tNDNqMWExa203In0.aGp3MFkSijj0MXt6YPVR4Q'
    }).addTo(map);
//Pin is dropped into the map.


    var marker = L.marker([51.5, -0.09]).addTo(map);


    var circle = L.circle([44.6055708, -79.4575289], 100, {
        color: 'red',
        fillColor: 'red',
        fillOpacity: 0.5
    }).addTo(map);


//Creates popup on the map when you click on the map.
    var popup = L.popup();

//On click for the popup.
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick);



});

