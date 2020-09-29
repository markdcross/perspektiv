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
    // ---------------------
    // Pull values from murals.json for API calls
    // ---------------------
    // for (var i = 0; i < muralData.length; i++)
    // Capture and display mural address
    var address = muralData[1].address;
    console.log(address);
    // Capture and display mural name
    var muralName = muralData[1].name;
    // Capture and display mural location
    var muralLoc = muralData[1].ExtendedData.Data[1].value;
    // Capture and display artist name
    var artistName = muralData[1].ExtendedData.Data[3].value;

    // Capture and display artist website
    var artistWebsite = muralData[1].ExtendedData.Data[5].value;
    // Capture and display mural image
    var muralImg = muralData[1].ExtendedData.Data[6].value.__cdata;

    // --------------
    // Populate DOM
    // --------------
    $('#artist-info').text(`Artist: ${artistName}`);
    $('#mural-img').attr('src', muralImg);

    // -------------
    // Call Yelp API
    // -------------
    var settings = {
        // Pass address through as search parameter (along with 500 meters)
        //TODO: Add other filters as parameters
        //! Why is there a CORS error here but it works in Postman?
        url: `https://api.yelp.com/v3/businesses/search?location=${address}&radius=500`,
        method: 'GET',
        timeout: 0,
        headers: {
            Authorization:
                'Bearer VJmUSOlUKe1A9ZWkT-vaXD5r7SBOaEQij7d33Tjlcmw6yNPqInDhIVGoPXeLvMA8TSHWRGQEenRv0mKtq4CmxUKbWSOAh30oAtt71oAwLYg-xJNUulBSvIE6IXZzX3Yx',
        },
    };

    $.ajax(settings).then(function (response) {
        console.log(response);
    });

    // -- Request nearby attractions based on filters
    // Call Wiki API
    // -- Pass artist name through
    // -- Request background
    // Call Clearbit API
    // -- Pass artist website through
    // -- Request logo
});
