document.addEventListener('DOMContentLoaded', function() {

  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left',
    hoverEnabled: false
  });

  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);

  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);

  // var elems = document.querySelectorAll('.materialboxed');
  // var instances = M.Materialbox.init(elems);

  console.log(murals);

  localStorage.setItem('clickedMural', 0);

  //Variable assignment
  var muralImgs = new Object();
  muralGenerate();
  var elems = document.querySelectorAll('.materialboxed');
  var instances = M.Materialbox.init(elems);

  function muralGenerate() {
    for (var i = 0; i < murals.length; i++) {
        //* Pull values from murals.json for API calls
        muralImgs[i] = murals[i].ExtendedData.Data[6].value.__cdata;

        $("#muralGallery").prepend("<li><img class='materialboxed' src='"+muralImgs[i]+"' loading='lazy'><a data-id='"+i+"' href='mapview.html' class='btn-floating imgBtn'><img src='assets/images/PinDrip3circle.png'></a></li>");
        // $('#muralMapShow').attr("src", muralImgs[murIndex])
        console.log(muralImgs[i]);

    }
  }

  $('.imgBtn').click(function () {
    localStorage.setItem('clickedMural', $(this).data("id"));

  });

  //    //Initialization and pulling initial data
  //    Init();

  //    function Init() {
  //        var storedHistSearch = JSON.parse(localStorage.getItem("histSearch"));
  //        if (storedHistSearch !== null) {
  //            histSearch = storedHistSearch;
  //        }
 
  //        $.each( histSearch, function( key, value ) {
  //            $("#prevSearch").prepend(
  //                "<div class='col-12 mb-1'><button class='btn btn-secondary w-100 stored'>"+value+"</button></div>"
  //            );
  //            locHistory++;
  //            histStoredFirst = true;
  //        });
 
  //        queryParams = { "q": "Richmond"};
  //        var queryURL = buildQuery();
  //        $.ajax({
  //            url: queryURL,
  //            method: "GET"
  //        }).then(updateFirstRun);
  //    }

  //            //This will populate the page with the data from a stored item
  //   function searched(WeatherData) {
  //     weatherInfo = WeatherData;
  //     updateCurrent();
  //     var currentCity = WeatherData.name;
  //     var cityCheck = $("button:contains('"+currentCity+"')");
  //     if (histClick === false && currentCity !== $(cityCheck).html() || histStoredFirst === false) {

  //         $("#prevSearch").prepend(
  //             "<div class='col-12 mb-1'><button class='btn btn-secondary w-100 stored'>"+currentCity+"</button></div>"
  //         );
  //         histStoredFirst = true;
  //         histSearch[locHistory] = currentCity;
  //         localStorage.setItem('histSearch', JSON.stringify(histSearch));
  //         locHistory++;
  //     }
  //     histClick = false;
  // }

 






});