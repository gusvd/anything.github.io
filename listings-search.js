
////////////////////////////////////////////////////
// Initialize MixItUp

var containerEl = document.querySelector('.listings-container');

var config = {
    toggleDefault: 'all',
    animation: {
        duration: 300
    },
    selectors: {
        target: '.listings-card'
    },
    load: {
        filter: '.Europe' ////////// CHANGE THIS TO REFLECT THE RIGHT FILTER BASED ON URL
    },
    //sort: 'default:asc', /////// SORT BY DATE
};


var mixer = mixitup(containerEl, config);