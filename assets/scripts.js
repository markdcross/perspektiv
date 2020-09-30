document.addEventListener('DOMContentLoaded', function () {
    $(document).ready(function () {
        $('.collapsible').collapsible();
    });

    $(document).ready(function () {
        $('.modal').modal();
    });
});

$(document).ready(function () {
    // ---------------------
    // Global variables
    // ---------------------

    // ---------------------
    // Pull values from murals.json for API calls
    // ---------------------
    var muralData = murals;
    // for (var i = 0; i < muralData.length; i++)
    // Capture and display mural address
    var address = muralData[1].address;
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

    // ------------------
    // Populate map pins
    // ------------------
    var mymap = L.map('map-content').setView([51.505, -0.09], 13);

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
    ).addTo(mymap);
    // TODO: Use Nominatim API for geocoding
    // $(".test").click(function () {initMap();});
    // function initMap() {
    //     // for (var i = 0; i < muralData.length; i++) {
    //     var uluru = { lat: -25.363, lng: 131.044 };
    //     var map = new google.maps.Map(document.getElementById('map'), {
    //         zoom: 4,
    //         center: uluru,
    //     });
    //     var marker = new google.maps.Marker({
    //         position: uluru,
    //         map,
    //         title: 'Test marker',
    //     });
    //     // }
    // }
    // initMap();

    // --------------
    // Populate DOM
    // --------------
    $('#artist-info').text(`Artist: ${artistName}`);
    $('#mural-img').attr('src', muralImg);

    // -- -- Lat/Lon

    // --------------------------
    // Call Yelp API
    // TODO: Unsure why we're getting CORS errors sporadically from local and github pages
    // --------------------------
    // TODO: Tuck this in a click event (map pin) to call based on this.address
    function yelpAPI() {
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
        // Request nearby attractions based on filters
    }
    yelpAPI();
    // -------------------------
    // Call Wiki API
    //--------------------------
    // var wikiSettings = {
    //     url: `/https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${artistName} ${muralName} Richmond mural&format=json`,
    //     method: 'GET',
    //     timeout: 0,
    // };

    // $.ajax(wikiSettings).done(function (wikiResponse) {
    //     console.log('wiki: ' + wikiResponse);
    // });
    // -- Pass artist name through
    // -- Request background

    // -------------------------
    // Call Reverse Image Search
    // -------------------------
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

    // -------------------------
    // Bike theft/safety API - https://www.bikewise.org/
    // -------------------------
});
