$(document).ready(function () {
    // Variable Assignements
    var theMap;
    var muralData = murals;
    var muralImgs = new Object();
    var muralNames = new Object();
    var muralLocs = new Object();
    var muralArtists = new Object();
    var muralCont = new Object();
    var inboundMural = JSON.parse(localStorage.getItem("clickedMural"));
    inboundMural = parseInt(inboundMural);
    // Loads the Materialized Tabs module
    $('.tabs').tabs();

    //Initializes map
    mapInit();
    // Adds museums to the map from RVA Open Data API
    rvaSearchMuseums();
    // Adds parks to the map from RVA Open Data API
    rvaSearchParks();
    // Adds mural markers to the map along with popups
    // Adds click event to each marker to pass lat/lon through to Yelp API call
    muralMarkers();

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

    // Generates map markers
    function muralMarkers() {
        for (var i = 0; i < muralData.length; i++) {
            //* Pull values from murals.json for API calls
            var muralLat = muralData[i].latitude;
            var muralLon = muralData[i].longitude;
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
                    //Populate data in Discover section
                    $('#muralName').html(muralNames[murIndex]);
                    $('#muralLoc').html(muralLocs[murIndex]);
                    $('#muralArtist').html(muralArtists[murIndex]);
                    $('#muralContact').html(muralCont[murIndex]);
                    $('#muralMapShow').attr("src", muralImgs[murIndex])
                })
            .addTo(theMap);
        }
    }

    //API call functions
    //* RVA Open Data Portal - Parks, arts, and entertainment
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
        // Clears the div for Yelp results
        $('#tab3').empty();
        // Uses the lat and long of the clicked pin from Nominatim
        var yelpSettings = {
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
                var nearbyAddress = yelpData.businesses[j].location.display_address[0];
                var nearbyRate = yelpData.businesses[j].rating;
                var nearbyURL = yelpData.businesses[j].url;
                setTimeout(function(){
                    console.log(nearbyName);
                },500);
                var nearbyImg = yelpData.businesses[j].image_url;
                // Displays top five results to the DOM
                $('#tab3').append(
                    `<div class="row"><div class="col s6 m6 l3"><p><img src="${nearbyImg}" width="115px"></p></div><div class="col s6 m6 l3"><p><a href="${nearbyURL}" target="_blank">${nearbyName}</a></p></div><div class="col s6 m6 l3"><p>${nearbyType}</p></div><div class="col s6 m6 l3"><p>${nearbyAddress}</p></div></div><hr>`
                );
            }
        });
    }
});
