document.addEventListener('DOMContentLoaded', function () {
    $(document).ready(function () {
        $('.collapsible').collapsible();
    });

    $(document).ready(function () {
        $('.modal').modal();
    });
});

$(document).ready(function () {
    //* ---------------------
    //* Global variables
    //* ---------------------

    //* ---------------------
    //* Pull values from murals.json for API calls
    //* ---------------------
    var muralData = murals;
    // Capture and display mural address
    var address = muralData[1].address;
    // Capture and display mural number
    var muralNum = muralData[1].ExtendedData.Data[0].value;
    // Capture and display mural name
    var muralName = muralData[1].name;
    // Capture and display mural location
    var muralLoc = muralData[1].ExtendedData.Data[1].value;
    // Capture and display artist name
    var artistName = muralData[1].ExtendedData.Data[3].value;
    $('#artist-info').text(`Artist: ${artistName}`);
    // Capture and display artist website
    var artistWebsite = muralData[1].ExtendedData.Data[5].value;
    // Capture and display mural image
    var muralImg = muralData[1].ExtendedData.Data[6].value.__cdata;

    //! Using gallery to drive interaction
    // Display all murals in gallery
    // On click, push APIs through
    // --Geocode to populate map markers
    // --Wiki to populate neighborhood info (from geocode)
    // --Yelp to populate nearby attractions
    //--------------------------------------------------------------------------------------------------------------------------------
    //! Using map a primary
    // Populate map pins
    // --Run geoloc API for each mural
    // --Return the lat/lon and create pins
    //
    //* ---------------------
    //* Populate map and pins
    //* ---------------------
    // Creates the map on the page
    var theMap = L.map('map-content').setView([37.5386, -77.4318], 13);
    // Adds tile layer to the map
    L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        {
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
                'pk.eyJ1IjoibWFya2Rjcm9zcyIsImEiOiJja2ZwajI1ZDUyN2I4MnJtandkYXNjNXptIn0.mPbQse36k0Mm_rvvmVMAmQ',
        }
    ).addTo(theMap);

    //* Use forward reverse geocoding for geocoding
    // function mapInit() {
    // Loop through murals.json to call for lat/lon of each mural (from mural address)
    // for (var i = 0; i < muralData.length; i++) {
    // Pulls the address from each mural
    // var address = muralData[i].address;
    // var muralNum = muralData[i].ExtendedData.Data[0].value;
    // var geoSettings = {
    //     async: true,
    //     crossDomain: true,
    //     url: `https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?polygon_geojson=0&state=VA&limit=5&street=21 N. Belmont Ave. Richmond, VA&polygon_svg=0&country=USA&polygon_kml=0&namedetails=0&accept-language=en&city=Richmond&addressdetails=1&polygon_threshold=0.0&polygon_text=0&bounded=0&format=json`,
    //     method: 'GET',
    //     headers: {
    //         'x-rapidapi-host': 'forward-reverse-geocoding.p.rapidapi.com',
    //         'x-rapidapi-key':
    //             'b78b7eaf24mshbb9e20b44638996p182258jsn2d00091715f3',
    //     },
    // };

    // $.ajax(geoSettings).done(function (geoResponse) {
    //     geoData = geoResponse[0];
    //     console.log('geo: ' + geoData);
    //     // Capture lat
    //     var lat = geoData.lat;
    //     console.log('lat: ' + lat);
    //     // Capture lon
    //     var lon = geoData[0].lon;
    //     console.log('lon: ' + lon);
    //     // Place a marker from lat/lon
    //     var marker = L.marker([lat, lon])
    //         .addTo(theMap)
    //         .on('click', function (e) {
    //             console.log(this);
    //         });
    // });

    // //* Use Nominatim API for geocoding
    // function mapInit() {
    //     // Passes each mural address into the query URL
    //     var nominUrl = `https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/search/21 N. Belmont Ave. Richmond, VA?format=json&addressdetails=1`;
    //     // Ajax call to Nominatim
    //     $.ajax({
    //         url: nominUrl,
    //         method: 'GET',
    //     }).then(function (latlonResponse) {
    //         results = latlonResponse;
    //         // Capture lat for each mural
    //         var lat = results[0].lat;
    //         console.log(lat);
    //         // Capture lon for each mural
    //         var lon = results[0].lon;
    //         console.log(lon);
    //         // Place a marker for each mural from lat/lon
    //         var marker = L.marker([lat, lon]).addTo(theMap);
    //         //* --------------------------
    //         //* Click event for map pins
    //         //* --------------------------
    // .on('click', function (e) {
    //     console.log(this);
    // })
    // .bindPopup(muralNum)
    // .openPopup();
    //     });
    // }
    //* mapInit()
    // mapInit();

    //* --------------
    //* Populate DOM
    //* --------------
    // $('#artist-info').text(`Artist: ${artistName}`);
    // $('#mural-img').attr('src', muralImg);

    //* --------------------------
    //* Call Yelp API
    //* --------------------------
    // TODO: Future: Add back-end support to fix CORS error
    // TODO: Tuck this in a click event (map pin) to call based on this.address?
    // TODO: --How to circumvent per second API call limits w/ loop?
    // function yelpAPI() {
    //     var yelpSettings = {
    //         url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${address}&radius=500`,
    //         method: 'GET',
    //         headers: {
    //             Authorization:
    //                 'Bearer VJmUSOlUKe1A9ZWkT-vaXD5r7SBOaEQij7d33Tjlcmw6yNPqInDhIVGoPXeLvMA8TSHWRGQEenRv0mKtq4CmxUKbWSOAh30oAtt71oAwLYg-xJNUulBSvIE6IXZzX3Yx',
    //         },
    //     };

    //     $.ajax(yelpSettings).done(function (yelpResponse) {
    //         for (var j = 0; j < 5; j++) {
    //             var yelpData = yelpResponse;
    //             var nearbyName = yelpData.businesses[j].name;
    //             var nearbyType = yelpData.businesses[j].categories[0].title;
    //             var nearbyAddress =
    //                 yelpData.businesses[j].location.display_address[0];
    //             var nearbyRate = yelpData.businesses[j].rating;
    //             $('#yelpEl').append(
    //                 `<table><tr><td>${nearbyName}</td><td>${nearbyType}</td><td>${nearbyRate}</td><td>${nearbyAddress}</td></tr></table>`
    //             );
    //         }
    //     });
    //     // Request nearby attractions based on filters
    // }
    // yelpAPI();

    //* -------------------------
    //* Call Wiki API
    //* -------------------------
    //TODO: Pass in neighborhood value from geolocation call, or find an API that will accept that as a search param and pass something back
    // var wikiSettings = {
    //     url: `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${} Richmond VA&format=json`,
    //     method: 'GET',
    //     timeout: 0,
    // };

    // $.ajax(wikiSettings).done(function (wikiResponse) {
    //     console.log('wiki: ' + wikiResponse);
    // });
    // -- Pass artist name through
    // -- Request background

    //* -------------------------
    //* Call Reverse Image Search
    //* -------------------------
    // var revImgSettings = {
    //     async: true,
    //     crossDomain: true,
    //     url: `https://google-reverse-image-search.p.rapidapi.com/imgSearch?url=%2524%257B${muralImg}%257D`,
    //     method: 'GET',
    //     headers: {
    //         'x-rapidapi-host': 'google-reverse-image-search.p.rapidapi.com',
    //         'x-rapidapi-key':
    //             'b78b7eaf24mshbb9e20b44638996p182258jsn2d00091715f3',
    //     },
    // };

    // $.ajax(revImgSettings).done(function (revImgResponse) {
    //     console.log(revImgResponse);
    // });
    // -- Pass artist website through
    // -- Request logo

    //* -------------------------
    //* Bike theft/safety API - https://www.bikewise.org/
    //* -------------------------
});
