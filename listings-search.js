var Webflow = Webflow || [];
Webflow.push(function () {


////////////////////////////////////////////////////
// Creating dynamic elements classes and attributes:

 function textToClass(locationArray, tag) {
     locationArray.forEach( function(elem) {
        var text = elem.innerText || elem.innerContent;
        if (!text) { 
          var text = 'empty';
        }

        // var conv = text.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '');
        var conv = text.replace(/[!\"#$%&'\(\)\*\+\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, ''); // removed comma to split
        var conv = conv.replace (/ /g, "-")
              .toLowerCase()
              .trim();

        if (tag=="class"){
            var classes = conv.split(",");
            classes.forEach( function(className) {
                if (!isNaN(parseInt(className.charAt(0), 10))) {
                      className = ("_" + className);
                    }
                    elem.parentElement.classList.add(className);
                });
        } else if (tag=="data") {
            elem.parentElement.setAttribute("data-departure-date", conv);
        }
     
     });
};

textToClass(document.querySelectorAll('.locationgroup'), 'class');
textToClass(document.querySelectorAll('.departuredategroup'), 'class');
textToClass(document.querySelectorAll('.departuredatesort'), 'data');



////////////////////////////////////////////////////
// MixItUp

// Get initial filter from URL
var searchLocation = getParameterByName('search-location');
var searchDate = getParameterByName('search-date');

var initialFilter = "." + searchLocation + ", " + "." + searchDate;

console.log(initialFilter);

// Initialize MixItUp
var containerEl = document.querySelector('.listings-container');
var config = {
    animation: {
        duration: 300
    },
    selectors: {
        target: '.listings-card'
    },
    load: {
        filter: initialFilter,
        sort: 'departure-date:asc' 
    },
    controls: {
        toggleDefault: 'none'
    },
    multifilter: {
        enable: true // enable the multifilter extension for the mixer
    }
};
var mixer = mixitup(containerEl, config);

}); // close webflow wraper