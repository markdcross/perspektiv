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
    var theMap;
    //* Pull values from murals.json for API calls
    var muralData = murals;
    // Capture and display mural address
    var address = muralData[26].address;
    // Capture and display mural number
    var muralNum = muralData[26].ExtendedData.Data[0].value;
    // Capture and display mural name
    var muralName = muralData[26].name;
    // Capture and display mural location
    var muralLoc = muralData[26].ExtendedData.Data[1].value;
    // Capture and display artist name
    var artistName = muralData[26].ExtendedData.Data[3].value;
    // Capture and display artist website
    var artistWebsite = muralData[26].ExtendedData.Data[5].value;
    // Capture and display mural image
    var muralImg = muralData[26].ExtendedData.Data[6].value.__cdata;

    //* ---------------------
    //* Populate map and pins
    //* ---------------------
    // Creates the map on the page
    function mapInit() {
        theMap = L.map('map-content').setView([37.5386, -77.4318], 13);
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
    }
    mapInit();

    //* Use Nominatim API for geocoding
    function generatePins() {
        // Passes each mural address into the query URL
        var nominUrl = `https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/search/${address}?format=json&addressdetails=1`;
        // Ajax call to Nominatim
        $.ajax({
            url: nominUrl,
            method: 'GET',
        }).then(function (latlonResponse) {
            results = latlonResponse;
            // Capture lat for each mural
            var lat = results[0].lat;
            console.log(lat);
            // Capture lon for each mural
            var lon = results[0].lon;
            console.log(lon);
            // Place a marker for each mural from lat/lon
            console.log(muralImg);
            var marker = L.marker([lat, lon])
                .addTo(theMap)
                // * Click event for map pins
                .on('click', function (e) {
                    // Accesses the mural number
                    console.log(this._popup._content);
                })
                //TODO: Image overflows popup, img is larger than map div
                .bindPopup(
                    `<img src=${muralImg}> Artist: ${artistName}; <br> Location: ${muralLoc};`
                );
        });
    }
    generatePins();
    //* ALTERNATIVE - Use forward reverse geocoding for geocoding
    // function generatePins() {
    //     // Loop through murals.json to call for lat/lon of each mural (from mural address)
    //     for (var i = 0; i < muralData.length; i++) {
    //         // Pulls the address from each mural
    //         var address = muralData[i].address;
    //         var muralNum = muralData[i].ExtendedData.Data[0].value;
    //         var geoSettings = {
    //             async: true,
    //             crossDomain: true,
    //             url: `https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?polygon_geojson=0&state=VA&limit=5&street=${address}&polygon_svg=0&country=USA&polygon_kml=0&namedetails=0&accept-language=en&city=Richmond&addressdetails=1&polygon_threshold=0.0&polygon_text=0&bounded=0&format=json`,
    //             method: 'GET',
    //             headers: {
    //                 'x-rapidapi-host':
    //                     'forward-reverse-geocoding.p.rapidapi.com',
    //                 'x-rapidapi-key':
    //                     'b78b7eaf24mshbb9e20b44638996p182258jsn2d00091715f3',
    //             },
    //         };

    //         $.ajax(geoSettings).done(function (geoResponse) {
    //             geoData = geoResponse[0];
    //             console.log('geo: ' + geoData);
    //             // Capture lat
    //             var lat = geoData.lat;
    //             console.log('lat: ' + lat);
    //             // Capture lon
    //             var lon = geoData[0].lon;
    //             console.log('lon: ' + lon);
    //             // Place a marker from lat/lon
    //             var marker = L.marker([lat, lon])
    //                 .addTo(theMap)
    //                 .on('click', function (e) {
    //                     console.log(this);
    //                 })
    //                 .bindPopup(muralNum)
    //                 .openPopup();
    //         });
    //     }
    // }

    //* --------------------------
    //* Populate DOM
    //* --------------------------
    $('#artist-info').text(`Artist: ${artistName}`);
    $('#mural-img').attr('src', muralImg);
    $('#artist-info').text(`Artist: ${artistName}`);

    //* --------------------------
    //* APIs
    //* --------------------------
    //! CORS-anywhere proxy causes notable lag
    // TODO: Future: Add back-end support to fix CORS error
    // TODO: Tuck this in a click event (map pin) to call based on this.address?
    // TODO: --How to circumvent per second API call limits w/ loop?

    //* Call Yelp API
    function yelpSearch() {
        //! CORS-anywhere proxy causes notable lag here - takes a second to load this div
        var yelpSettings = {
            url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${address}&radius=500`,
            method: 'GET',
            headers: {
                Authorization:
                    'Bearer VJmUSOlUKe1A9ZWkT-vaXD5r7SBOaEQij7d33Tjlcmw6yNPqInDhIVGoPXeLvMA8TSHWRGQEenRv0mKtq4CmxUKbWSOAh30oAtt71oAwLYg-xJNUulBSvIE6IXZzX3Yx',
            },
        };

        $.ajax(yelpSettings).done(function (yelpResponse) {
            for (var j = 0; j < 5; j++) {
                var yelpData = yelpResponse;
                var nearbyName = yelpData.businesses[j].name;
                var nearbyType = yelpData.businesses[j].categories[0].title;
                var nearbyAddress =
                    yelpData.businesses[j].location.display_address[0];
                var nearbyRate = yelpData.businesses[j].rating;
                $('#yelpEl').append(
                    `<table><tr><td>${nearbyName}</td><td>${nearbyType}</td><td>${nearbyRate}</td><td>${nearbyAddress}</td></tr></table>`
                );
            }
        });
        // --Request nearby attractions based on filters
    }
    yelpSearch();

    //* Call Wiki API
    //TODO: Pass in neighborhood value from geolocation call, or find an API that will accept that as a search param and pass something back
    function wikiSearch() {
        var wikiSettings = {
            url: `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${neighborhood} Richmond VA&format=json`,
            method: 'GET',
            timeout: 0,
        };
        $.ajax(wikiSettings).done(function (wikiResponse) {
            console.log('wiki: ' + wikiResponse);
        });
    }
    // --Pass artist name through?
    // --Request background

    //* Call Reverse Image Search
    // Uses the mural image from the JSON file as the search parameter
    //TODO: URL is broken, needs debugging
    // function reverseImgSearch() {
    //     var revImgSettings = {
    //         async: true,
    //         crossDomain: true,
    //         url: `https://google-reverse-image-search.p.rapidapi.com/imgSearch?url=${muralImg}`,
    //         method: 'GET',
    //         headers: {
    //             'x-rapidapi-host': 'google-reverse-image-search.p.rapidapi.com',
    //             'x-rapidapi-key':
    //                 'b78b7eaf24mshbb9e20b44638996p182258jsn2d00091715f3',
    //         },
    //     };
    //     $.ajax(revImgSettings).done(function (revImgResponse) {
    //         console.log(revImgResponse);
    //     });
    // }

    // --Pass artist website through
    // --Request logo

    //* Bike theft/safety API - https://www.bikewise.org/
    // Deleted by mistake but only got as specific as "Richmond" (unless I was missing something)
});
