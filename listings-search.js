
////////////////////////////////////////////////////
// Creating dynamic elements classes:

 var locationArray = document.querySelectorAll('.LocationGroup');
 
 locationArray.forEach( function(elem) {
    var text = elem.innerText || elem.innerContent;
    if (!text) { 
      var text = 'empty';
    }
    var conv = text.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '');
    var className = conv.replace (/ /g, "-")
                        .toLowerCase()
                        .trim();
    if (!isNaN(parseInt(className.charAt(0), 10))) {
              className = ("_" + className);
            }
    elem.parentElement.classList.add(className);
 
 });



////////////////////////////////////////////////////
// Initialize MixItUp

var containerEl = document.querySelector('.listings-container');

// Get initial filter from URL
var initialFilter = 'none';
var hash = window.location.hash.replace(/^#/g, '');

if (hash) {
    initialFilter = '.' + hash;
};

var config = {
    animation: {
        duration: 300
    },
    selectors: {
        target: '.listings-card'
    },
    load: {
        filter: '.Europe', ////////// CHANGE THIS TO REFLECT THE RIGHT FILTER BASED ON URL
        sort: 'default:asc' 
    },
    controls: {
        toggleDefault: 'none'
    },
};


var mixer = mixitup(containerEl, config);