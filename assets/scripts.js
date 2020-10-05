document.addEventListener('DOMContentLoaded', function () {
    // $(document).ready(function () {
    //     $('.collapsible').collapsible();
    // });

    // $(document).ready(function () {
    //     $('.modal').modal();
    // });

    $(document).ready(function () {
        $('.tabs').tabs();
    });
});

$(document).ready(function () {
    //* ---------------------
    //* Global variables
    //* ---------------------
    var theMap;
    var muralData = murals;
    console.log(muralData);
    // muralNames = [];
    var muralImgs = new Object();
    var muralNames = new Object();
    var muralLocs = new Object();
    var muralArtists = new Object();
    var muralCont = new Object();
    var inboundMural = JSON.parse(localStorage.getItem("clickedMural"));
    inboundMural = parseInt(inboundMural);


    //* ---------------------
    //* Call functions
    //* ---------------------
    //Initializes map
    mapInit();
    // Adds museums to the map from RVA Open Data API
    rvaSearchMuseums();
    // Adds parks to the map from RVA Open Data API
    rvaSearchParks();
    // Adds mural markers to the map along with popups
    // Adds click event to each marker to pass lat/lon through to Yelp API call
    muralMarkers();
console.log(inboundMural);
    //This is for a default mural on page load
    if (inboundMural === 0 || !inboundMural === NaN) {
    yelpSearch(37.553722, -77.45656);
    $('#muralName').html(muralNames[79]);
    $('#muralLoc').html(muralLocs[79]);
    $('#muralArtist').html(muralArtists[79]);
    $('#muralContact').html(muralCont[79]);
    $('#muralMapShow').attr("src", muralImgs[79]);
    }

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
            //* Pull values from murals.json for API calls
            var address = muralData[i].address;
            var muralNum = muralData[i].ExtendedData.Data[0].value;
            // muralNames.push(muralName);
            var muralLat = muralData[i].latitude;
            var muralLon = muralData[i].longitude;
            var cdata = muralData[i].description.__cdata;
            muralImgs[i] = muralData[i].ExtendedData.Data[6].value.__cdata;
            muralNames[i] = muralData[i].name;
            muralLocs[i] = muralData[i].ExtendedData.Data[1].value;
            muralArtists[i] = muralData[i].ExtendedData.Data[3].value;
            muralCont[i] = muralData[i].ExtendedData.Data[5].value;

            if (inboundMural !== 0 && inboundMural === i) {
                yelpSearch(muralLat, muralLon);
                $('#muralName').html(muralNames[inboundMural]);
                $('#muralLoc').html(muralLocs[inboundMural]);
                $('#muralArtist').html(muralArtists[inboundMural]);
                $('#muralContact').html(muralCont[inboundMural]);
                $('#muralMapShow').attr("src", muralImgs[inboundMural])
                localStorage.setItem('clickedMural', 0);
            }

            // Place a marker for each mural from lat/lon
            var myIcon = L.icon({
                iconUrl: 'assets/images/PinDrip3.png',
                iconSize: [25, 35],
            });
            L.marker([muralLat, muralLon], {id: i, icon: myIcon})

                //TODO: Image overflows popup, img is larger than map div
                // .bindPopup(popup)
                // * Click event for map pins
                .on('click', function (e) {
                    console.log(this.options.id);
                    var murIndex = this.options.id;
                    console.log(muralImgs[murIndex]);
                    // Capture lat/long from clicked pin
                    var pinLat = this._latlng.lat;
                    var pinLon = this._latlng.lng;
                    //* Pass pin lat/long to Yelp and Wiki API calls
                    yelpSearch(pinLat, pinLon);
                    // wikiSearch(pinLat, pinLon);
                    //* --------------------------
                    //* Populate DOM?
                    //* --------------------------
                    $('#muralName').html(muralNames[murIndex]);
                    $('#muralLoc').html(muralLocs[murIndex]);
                    $('#muralArtist').html(muralArtists[murIndex]);
                    $('#muralContact').html(muralCont[murIndex]);
                    $('#muralMapShow').attr("src", muralImgs[murIndex])
                    console.log(this);
                    // $('#muralLoc').text(muralLoc);
                    // $('#muralArtist').text(artistName);
                    // $('#muralContact').text(artistWebsite);
                })
                .addTo(theMap);
        }
    }

    //* --------------------------
    //* APIs
    //* --------------------------
    //* RVA Open Data Portal - Parks
    // Key - 434uziup973kgkl6n6xqsplhf
    // key secret - 6bz7211gl06qj6z80bwdopeomuwnbrtv70ewemrhc9jjvla8c8
    function rvaSearchParks() {
        $.ajax({
            url:
                'https://data.richmondgov.com/resource/f7vy-k94i.json?functn=5000: Arts, entertainment, and recreation',
            type: 'GET',
            data: {
                $limit: 5000,
                $$app_token: 'doEdXY4IrCn9anJakbK3Pgbpz',
            },
        }).done(function (rvaParkResponse) {
            rvaPData = rvaParkResponse;
            // Loop through each response and create a map marker for it, with a tooltip with its name
            for (var r = 0; r < rvaPData.length; r++) {
                // Capture name, lat and lon of each response
                var lat = rvaPData[r].location_1.latitude;
                var lon = rvaPData[r].location_1.longitude;
                var name = rvaPData[r].name;
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

    //* RVA Open Data Portal - Museums
    function rvaSearchMuseums() {
        $.ajax({
            url:
                'https://data.richmondgov.com/resource/f7vy-k94i.json?functn=5200: Museums and other special purpose recreational institutions',
            type: 'GET',
            data: {
                $limit: 5000,
                $$app_token: 'doEdXY4IrCn9anJakbK3Pgbpz',
            },
        }).done(function (rvaMuseumResponse) {
            rvaMData = rvaMuseumResponse;
            // Loop through each response and create a map marker for it, with a tooltip with its name
            for (var r = 0; r < rvaMData.length; r++) {
                // Capture name, lat and lon of each response
                var lat = rvaMData[r].location_1.latitude;
                var lon = rvaMData[r].location_1.longitude;
                var name = rvaMData[r].name;
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

    //* Call Yelp API
    function yelpSearch(lat, lon) {
        //! CORS-anywhere proxy causes notable lag here - takes a second to load this div
        // TODO: Future: Add back-end support to fix CORS error
        // Clears the div for Yelp results
        $('#tab3').empty();
        // Uses the lat and long of the clicked pin from Nominatim
        var yelpSettings = {
            //TODO: Put a type filter here? Adjust URL based on input?
            url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}&radius=500&categories=bakeries,wineries,breweries,brewpubs,coffee,foodtrucks&sort_by=rating`,
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
                var nearbyURL = yelpData.businesses[j].url;
                // Other data to use?
                // var nearbyPhone = yelpData.businesses[j].display_phone;
                var nearbyImg = yelpData.businesses[j].image_url;
                // Displays top five results to the DOM
                //! This isn't to say that this format works, more so just to show the data we can pull
                $('#tab3').append(
                    `<div class="row"><div class="col s6 m6 l3"><p><img src="${nearbyImg}" width="115px"></p></div><div class="col s6 m6 l3"><p><a href="${nearbyURL}" target="_blank">${nearbyName}</a></p></div><div class="col s6 m6 l3"><p>${nearbyType}</p></div><div class="col s6 m6 l3"><p>${nearbyAddress}</p></div></div><hr>`
                );
            }
        });
    }

    //* Call Wiki API
    //TODO: Pass in neighborhood value from geolocation call, or find an API that will accept that as a search param and pass something back
    // function wikiSearch(lat, lon) {
    //     var wikiSettings = {
    //         url: `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&generator=geosearch&prop=coordinates|pageimages&ggscoord=${lat}|${lon}&format=json`,
    //         method: 'GET',
    //         timeout: 0,
    //     };
    //     $.ajax(wikiSettings).done(function (wikiResponse) {
    //         var wikiData = wikiResponse;
    //         // TODO: iframe the wiki page in?
    //         var wikiURL = wikiData.query.pages;
    //         $('#muralWiki').attr('src', muralImg);
    //         for (var k = 0; k < 5; k++) {
    //             var wikiName = wikiData.query.search[k].title;
    //             var wikiSnippet = wikiData.query.search[k].snippet;

    //             $('#tab3').append(
    //                 `<table><tr><th><a href="${nearbyURL}" target="_blank">${nearbyName}<a></th><td><img src="${nearbyImg}" width="150" height="auto"></td><td>${nearbyType}</td><td>${nearbyRate}</td><td>${nearbyAddress}</td></tr></table>`
    //             );
    //         }
    //     });
    // }

    // --Pass artist name through?
    // --Request background

    // for (var i = 0; i < muralData.length; i++) {
    //     var muralImg = muralData[i].ExtendedData.Data[6].value.__cdata;
    //     $('#unorderedList').append(
    //         `<li><img src="${muralImg}"></li>`
    //     );

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
