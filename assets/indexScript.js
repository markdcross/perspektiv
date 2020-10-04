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


  //Variable assignment
  var muralImgs = new Object();
  muralGenerate();
  var elems = document.querySelectorAll('.materialboxed');
  var instances = M.Materialbox.init(elems);

  function muralGenerate() {
    for (var i = 0; i < murals.length; i++) {
        //* Pull values from murals.json for API calls
        muralImgs[i] = murals[i].ExtendedData.Data[6].value.__cdata;

        $("#muralGallery").prepend("<li><img class='materialboxed' src='"+muralImgs[i]+"' loading='lazy'><a class='btn-floating imgBtn'><i class='material-icons'>place</i></a></li>");
        // $('#muralMapShow').attr("src", muralImgs[murIndex])
        console.log(muralImgs[i]);

    }
  }

});