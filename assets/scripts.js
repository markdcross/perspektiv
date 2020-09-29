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
    console.log(muralData);
    // Display map
    // User clicks on map
    // -- For each mural, see if name/address matches
    // -- -- If so:
    // -- Capture values for subsequent API calls
    // for (var i=0; i < muralData.length; i++)
    // Capture and display mural address
    var address = muralData[1].address;
    console.log('address:' + address);
    // Capture and display mural name
    var muralName = muralData[1].name;
    console.log('name: ' + muralName);
    // Capture and display 
    var muralLoc = muralData[1].ExtendedData.Data[1].value;
    console.log('loc: ' + muralLoc);
    // Capture and display
    var artistName = muralData[1].ExtendedData.Data[3].value;
    console.log('artist: ' + artistName);
    $('#artist-info').text(`Artist: ${artistName}`);
    // Capture and display
    var artistWebsite = muralData[1].ExtendedData.Data[5].value;
    console.log('website: ' + artistWebsite);
    // Capture and display
    var muralImg = muralData[1].ExtendedData.Data[6].value.__cdata;
    console.log('Img: ' + muralImg);
    $('#mural-img').attr('src', muralImg);

    // -- -- Lat/Lon
    // -- -- Artist name
    // -- -- Artist website
    // Call Yelp API
    // -- Pass lat/lon through
    // -- Request nearby attractions based on filters
    // Call Wiki API
    // -- Pass artist name through
    // -- Request background
    // Call Clearbit API
    // -- Pass artist website through
    // -- Request logo
});
