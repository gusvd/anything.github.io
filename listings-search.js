
////////////////////////////////////////////////////
// Initialize Isotype

// var elem = document.querySelector('.listings-container');
// var iso = new Isotope( elem, {
//   // options
//   itemSelector: '.listings-card',
//   layoutMode: 'fitRows'
// });

$('.listings-container').isotope({
  // options
  itemSelector: '.listings-card',
  layoutMode: 'fitRows'
});

// filter functions
var filterFns = {
  // show if number is greater than 50
  filterEurope: function() {
    var location = $(this).find('.location-group').text().toLowerCase();
    var locationIndex = location.indexOf('Europe');
    return locationIndex > 0
  },
  // show if name ends with -ium
  ium: function() {
    var name = $(this).find('.name').text();
    return name.match( /ium$/ );
  }
};

// bind filter on select change
$('.filter-location').on( 'change', function() {
  // get filter value from option value
  var filterValue = this.value;
  // use filterFn if matches value
  filterValue = filterFns[ filterValue ] || filterValue;
  $grid.isotope({ filter: filterValue });
});