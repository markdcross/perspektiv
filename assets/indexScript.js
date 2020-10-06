document.addEventListener('DOMContentLoaded', function() {

  //Variable assignment
  localStorage.setItem('clickedMural', 0);
  var muralImgs = new Object();

  //Intializtion of gallery
  muralGenerate();
    //Materialized module for "light box" effect
  var elems = document.querySelectorAll('.materialboxed');
  var instances = M.Materialbox.init(elems);


  //Gallery Generator
  function muralGenerate() {
    for (var i = 0; i < murals.length; i++) {
        //* Pull values from murals.json
        muralImgs[i] = murals[i].ExtendedData.Data[6].value.__cdata;
        $("#muralGallery").prepend("<li><img class='materialboxed' src='"+muralImgs[i]+"' loading='lazy'><a data-id='"+i+"' href='mapview.html' class='btn-floating imgBtn'><img src='assets/images/PinDrip3circle.png'></a></li>");

    }
  }
  
  //Tracks which Mural pin was pushed
  $('.imgBtn').click(function () {
    localStorage.setItem('clickedMural', $(this).data("id"));

  });
});