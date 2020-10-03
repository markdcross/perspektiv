const form = document.querySelector('#js-search-form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    // prevent page from reloading when form is submitted
    event.preventDefault();
    // get the value of the input field
    const inputValue = document.querySelector('#js-search-input').value;
    // remove whitespace from the input
    const searchQuery = inputValue.trim();
    // print `searchQuery` to the console
    console.log(searchQuery);
    searchWikipedia(searchQuery);
/*
    try {
  
        const results = await searchWikipedia(searchQuery);
    
        console.log(results);
    
      } catch (err) {
    
        console.log(err);
    
        alert('Failed to search wikipedia');
    
    }
    */
}


// searching wikipedia
async function searchWikipedia(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    $.ajax({
        url: endpoint,
        method: "get"
    }).then(function(response){
        console.log(response);
    });

    /*
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    console.log(json);
*/

}

document.addEventListener('DOMContentLoaded', function () {
    $(document).ready(function () {
        $('.collapsible').collapsible();
    });

    $(document).ready(function () {
        $('.modal').modal();
    });

    // Map marker test
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

$(document).ready(function () {
    // ---------------------
    // Pull values from murals.json for API calls
    // ---------------------
    var muralData = murals;
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

    $('#artist-info').text(`Artist: ${artistName}`);
    // Capture and display artist website
    var artistWebsite = muralData[1].ExtendedData.Data[5].value;
    // Capture and display mural image
    var muralImg = muralData[1].ExtendedData.Data[6].value.__cdata;

    // --------------
    // Populate DOM
    // --------------
    $('#artist-info').text(`Artist: ${artistName}`);
    $('#mural-img').attr('src', muralImg);

    // -- -- Lat/Lon

    // --------------------------
    // Call Yelp API
    // --------------------------
    // function yelpAPI() {
    var yelpSettings = {
        url: `https://api.yelp.com/v3/businesses/search?location=${address}&radius=500`,
        method: 'GET',
        headers: {
            Authorization:
                'Bearer VJmUSOlUKe1A9ZWkT-vaXD5r7SBOaEQij7d33Tjlcmw6yNPqInDhIVGoPXeLvMA8TSHWRGQEenRv0mKtq4CmxUKbWSOAh30oAtt71oAwLYg-xJNUulBSvIE6IXZzX3Yx',
        },
    };

    $.ajax(yelpSettings).done(function (yelpResponse) {
        // for (var j = 0; j < muralData.length; i++)
        var yelpData = yelpResponse;
        console.log(yelpResponse);
        var nearbyName = yelpData.businesses[0].name;
        console.log('nearby: ' + nearbyName);
        var nearbyType = yelpData.businesses[0].categories[0].title;
        var nearbyAddress = yelpData.businesses[0].location.display_address[0];
    });
    // Request nearby attractions based on filters
    // }
    // yelpAPI();
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


$("favbutton").on("click", function(){
    alert("hello");
}) 



