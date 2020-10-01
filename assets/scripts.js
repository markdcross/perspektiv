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
    var address = muralData[1].address;
    // Capture and display mural number
    var muralNum = muralData[1].ExtendedData.Data[0].value;
    // Capture and display mural name
    var muralName = muralData[1].name;
    // Capture and display mural location
    var muralLoc = muralData[1].ExtendedData.Data[1].value;

    // Capture and display artist website
    var artistWebsite = muralData[1].ExtendedData.Data[5].value;

    mapInit();
    rvaSearch();
    muralMarkers();

    //* ---------------------
    //* Initialize map
    //* ---------------------
    // Creates the map on the page
    function mapInit() {
        // Map centers on Monroe Park
        theMap = L.map('map-content').setView([37.5465622, -77.4504768], 13);
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
    //* ---------------------
    //* Add mural markers
    //* ---------------------
    function muralMarkers() {
        for (var i = 0; i < muralData.length; i++) {
            var muralLat = muralData[i].latitude;
            var muralLon = muralData[i].longitude;
            var muralImg = muralData[i].ExtendedData.Data[6].value.__cdata;
            var artistName = muralData[i].ExtendedData.Data[3].value;
            var cdata = muralData[i].description.__cdata;
            // Create popup
            var popup = L.popup({
                maxWidth: 5000,
                keepInView: true,
                className: 'mapPop',
            }).setContent(`${cdata}`);
            // Place a marker for each mural from lat/lon
            L.marker([muralLat, muralLon], { riseOnHover: true })
                //TODO: Image overflows popup, img is larger than map div
                .bindPopup(popup)
                // * Click event for map pins
                .on('click', function (e) {
                    // Capture lat/long from clicked pin
                    var pinLat = this._latlng.lat;
                    var pinLon = this._latlng.lng;
                    //* Pass pin lat/long to Yelp API call
                    yelpSearch(pinLat, pinLon);
                    //* --------------------------
                    //* Populate DOM?
                    //* --------------------------
                })
                .addTo(theMap);
        }
    }

    //* --------------------------
    //* APIs
    //* --------------------------
    //* RVA Open Data Portal
    // Key - 434uziup973kgkl6n6xqsplhf
    // key secret - 6bz7211gl06qj6z80bwdopeomuwnbrtv70ewemrhc9jjvla8c8
    function rvaSearch() {
        $.ajax({
            url:
                'https://data.richmondgov.com/resource/f7vy-k94i.json?functn=5500: Natural and other recreational parks',
            type: 'GET',
            data: {
                $limit: 5000,
                $$app_token: 'doEdXY4IrCn9anJakbK3Pgbpz',
            },
        }).done(function (rvaResponse) {
            rvaData = rvaResponse;
            // Loop through each response and create a map marker for it, with a tooltip with its name
            for (var r = 0; r < rvaData.length; r++) {
                // Capture name, lat and lon of each response
                var lat = rvaData[r].location_1.latitude;
                var lon = rvaData[r].location_1.longitude;
                var name = rvaData[r].name;
                var myIcon = L.icon({
                    iconUrl: 'assets/images/map-marker-icon.png',
                    iconSize: [15, 15],
                });
                // Create a map marker for each response
                L.marker([lat, lon], { icon: myIcon })
                    .addTo(theMap)
                    // Add a tooltip with the name of the response
                    .bindTooltip(name);
            }
        });
    }
    // TODO: Tuck this in a click event (map pin) to call based on this.lat/lon
    //* Call Yelp API
    function yelpSearch(lat, lon) {
        //! CORS-anywhere proxy causes notable lag here - takes a second to load this div
        // TODO: Future: Add back-end support to fix CORS error
        // Clears the div for Yelp results
        $('#yelpEl').empty();
        // Uses the lat and long of the clicked pin from Nominatim
        var yelpSettings = {
            //TODO: Put a type filter here?
            url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}&radius=500`,
            method: 'GET',
            headers: {
                Authorization:
                    'Bearer VJmUSOlUKe1A9ZWkT-vaXD5r7SBOaEQij7d33Tjlcmw6yNPqInDhIVGoPXeLvMA8TSHWRGQEenRv0mKtq4CmxUKbWSOAh30oAtt71oAwLYg-xJNUulBSvIE6IXZzX3Yx',
            },
        };

        $.ajax(yelpSettings).done(function (yelpResponse) {
            // Captures top five results
            for (var j = 0; j < 5; j++) {
                var yelpData = yelpResponse;
                var nearbyName = yelpData.businesses[j].name;
                var nearbyType = yelpData.businesses[j].categories[0].title;
                var nearbyAddress =
                    yelpData.businesses[j].location.display_address[0];
                var nearbyRate = yelpData.businesses[j].rating;
                // Displays top five results to the DOM
                $('#yelpEl').append(
                    `<table><tr><td>${nearbyName}</td><td>${nearbyType}</td><td>${nearbyRate}</td><td>${nearbyAddress}</td></tr></table>`
                );
            }
        });
        // --Request nearby attractions based on filters
    }

    //! -----------------
    //! -----------------
    //! UNUSED APIS BELOW
    //! -----------------
    //! -----------------

    //* Use Nominatim API for geocoding
    // function generatePins() {
    // Loop through murals.json to populate map pins
    // for (var i = 0; i < 2; i++) {
    //     var address = muralData[i].address;
    //     // Capture and display mural number
    //     var muralNum = muralData[i].ExtendedData.Data[0].value;
    //     // Capture and display mural name
    //     var muralName = muralData[i].name;
    //     // Capture and display mural location
    //     var muralLoc = muralData[i].ExtendedData.Data[1].value;
    //     // Capture and display artist name
    //     var artistName = muralData[i].ExtendedData.Data[3].value;
    //     // Capture and display artist website
    //     var artistWebsite = muralData[i].ExtendedData.Data[5].value;
    //     // Capture and display mural image
    //     var muralImg = muralData[i].ExtendedData.Data[6].value.__cdata;
    // // Capture and display the data to display in popup
    // var cdata = muralData[1].description.__cdata;
    //     // Passes each mural address into the query URL
    //     var nominUrl = `https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/search/${address}?format=json&addressdetails=1`;
    //     // Ajax call to Nominatim
    //     $.ajax({
    //         url: nominUrl,
    //         method: 'GET',
    //     }).then(function (latlonResponse) {
    //         results = latlonResponse;
    //         // var neighborhood = results[0].address.suburb;
    //         // if (!results[0].address.neighbourhood) {
    //         //     neighborhood = '';
    //         // }
    //         // Capture lat for each mural
    //         var lat = results[0].lat;
    //         // Capture lon for each mural
    //         var lon = results[0].lon;
    //         // Create popup
    //         var popup = L.popup({
    //             maxWidth: 5000,
    //             keepInView: true,
    //             className: 'mapPop',
    //         }).setContent(`${cdata}`);
    //         // Place a marker for each mural from lat/lon
    //         L.marker([lat, lon], { riseOnHover: true })
    //             .addTo(theMap)
    //             //TODO: Image overflows popup, img is larger than map div
    //             .bindPopup(popup)
    //             // * Click event for map pins
    //             .on('click', function (e) {
    //                 // Capture lat/long from clicked pin
    //                 var pinLat = this._latlng.lat;
    //                 var pinLon = this._latlng.lng;
    //                 console.log(this);
    //                 console.log(pinLat);
    //                 console.log(pinLon);
    //                 //* Pass pin lat/long to Yelp API call
    //                 yelpSearch(pinLat, pinLon);
    //             });
    //     });
    //     // }
    // }

    //TODO: Image overflows popup, img is larger than map div

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

    //* Call Wiki API
    //TODO: Pass in neighborhood value from geolocation call, or find an API that will accept that as a search param and pass something back
    // function wikiSearch(neighborhood) {
    //     var wikiSettings = {
    //         url: `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&titles=${neighborhood}, Richmond, Virginia&format=json`,
    //         method: 'GET',
    //         timeout: 0,
    //     };
    //     $.ajax(wikiSettings).done(function (wikiResponse) {
    //         console.log(wikiResponse);
    //         var wikiData = wikiResponse;
    //TODO: iframe the wiki page in?
    // var wikiURL = wikiData.query.pages
    // $('#wikiFrame').attr('src', muralImg);
    // for (var k = 0; k < 5; k++) {

    // var wikiName = wikiData.query.search[k].title;
    // var wikiSnippet = wikiData.query.search[k].snippet;
    // var nearbyAddress =
    //     yelpData.businesses[j].location.display_address[0];
    // var nearbyRate = yelpData.businesses[j].rating;
    // Displays top five results to the DOM
    // $('#wikiEl').append(
    // `<table><tr><td>${wikiName}</td><td>${wikiSnippet}</td></tr></table>`
    // );
    // }
    //     });
    // }

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
