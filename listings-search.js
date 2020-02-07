
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

// Initial Filtering

// Get initial filter from URL
var searchLocation = "." + getParameterByName('search-location');

if (getParameterByName('search-date')) {
    searchDate = "." + getParameterByName('search-date')
} else {
    searchDate = ""
};

var initFilter = searchLocation + searchDate;

console.log(searchLocation);
console.log(searchDate);
console.log(initFilter);


// Initialize MixItUp
var containerEl = document.querySelector('.listings-container');
var config = {
    animation: {
        enable: false
    },
    selectors: {
        target: '.listings-card'
    },
    load: {
        filter: initFilter,
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


// // Pass initial filters to Select inputs

mixer.setFilterGroupSelectors('location', searchLocation);
mixer.setFilterGroupSelectors('date', searchDate);

mixer.parseFilterGroups();

mixer.configure({
    animation: {
        enable: true,
        duration: 300
    }
});