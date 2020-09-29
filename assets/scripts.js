$(document).ready(function () {
    var muralData = murals;
    console.log(muralData);
    // Display map
    // User clicks on map
    // -- For each mural, see if name/address matches
    // -- -- If so:
    // -- Capture values for subsequent API calls

    var address = muralData[1].address;
    console.log('address:' + address);
    var muralName = muralData[1].name;
    console.log('name: ' + muralName);
    var muralLoc = muralData[1].ExtendedData.Data[1].value;
    console.log('loc: ' + muralLoc);
    var artistName = muralData[1].ExtendedData.Data[3].value;
    console.log('artist: ' + artistName);
    var artistWebsite = muralData[1].ExtendedData.Data[5].value;
    console.log('website: ' + artistWebsite);
    var muralImg = muralData[1].ExtendedData.Data[6].value._cdata;
    console.log('Img: ' + muralImg);
    var img = $(`<img src=${muralImg}>`);
    $('.display').append(img);
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
