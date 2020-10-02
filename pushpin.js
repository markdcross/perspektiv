// $(document).ready(function(){
//     $('.pushpin').pushpin();

//     $('.pushpin-demo-nav').each(function() {
//         var $this = $(this);
//         var $target = $('#' + $(this).attr('data-target'));
//         $this.pushpin({
//           top: $target.offset().top,
//           bottom: $target.offset().top + $target.outerHeight() - $this.height()
//         });
//     });

//   });

// PUSHPIN
// $(document).ready(function(){
//     $('.target').pushpin({
//       top: 0,
//       bottom: 1000,
//       offset: 0
//     });
//   });

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

});