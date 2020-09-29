// Berto's initial JS

document.addEventListener('DOMContentLoaded', function () {
    $(document).ready(function () {
        $('.collapsible').collapsible();
    });

    $(document).ready(function () {
        $('.modal').modal();
    });

    // $(".test").click(function () {initMap();});

    // function initMap() {
    //   var uluru = {lat: -25.363, lng: 131.044};
    //   var map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 4,
    //     center: uluru
    //   });
    //   var marker = new google.maps.Marker({
    //     position: uluru,
    //     map: map
    //   });
    // }
});

// Mark's JS start
$(document).ready(function () {
    var muralData = murals;
    // Display map
    // User clicks on map
    // -- For each mural, see if name/address matches
    // -- -- If so:
    // -- Capture values for subsequent API calls

    // ---------------------
    // Pull values from murals.json for API calls
    // ---------------------
    // for (var i = 0; i < muralData.length; i++)
    // Capture and display mural address
    var address = muralData[1].address;
    // Capture and display mural name
    var muralName = muralData[1].name;
    // Capture and display
    var muralLoc = muralData[1].ExtendedData.Data[1].value;
    // Capture and display
    var artistName = muralData[1].ExtendedData.Data[3].value;
    $('#artist-info').text(`Artist: ${artistName}`);
    // Capture and display
    var artistWebsite = muralData[1].ExtendedData.Data[5].value;
    // Capture and display
    var muralImg = muralData[1].ExtendedData.Data[6].value.__cdata;
    $('#mural-img').attr('src', muralImg);
    // -- -- Lat/Lon
    // -- -- Artist name
    // -- -- Artist website
    // Call Yelp API
    var settings = {
        url: `https://api.yelp.com/v3/businesses/search?location=${address}&radius=500`,
        method: 'GET',
        // timeout: 0,
        headers: {
            Authorization:
                'Bearer VJmUSOlUKe1A9ZWkT-vaXD5r7SBOaEQij7d33Tjlcmw6yNPqInDhIVGoPXeLvMA8TSHWRGQEenRv0mKtq4CmxUKbWSOAh30oAtt71oAwLYg-xJNUulBSvIE6IXZzX3Yx',
        },
    };

    $.ajax(settings).done(function (yelpResponse) {
        console.log(yelpResponse);
    });
    // -- Pass lat/lon through
    // -- Request nearby attractions based on filters
    // Call Wiki API
    // -- Pass artist name through
    // -- Request background
    // Call Clearbit API
    // -- Pass artist website through
    // -- Request logo
});
