
////////////////////////////////////////////////////
// Initialize MixItUp

var containerEl = document.querySelector('.listings-container');

var config = {
    animation: {
        duration: 300
    },
    selectors: {
        target: '.listings-card'
        //target: '[data-ref="mix"]' targeting using data- attributes
    },
    load: {
        filter: 'Europe' ////////// CHANGE THIS TO REFLECT THE RIGHT FILTER BASED ON URL
    },
    //sort: 'default:asc', /////// SORT BY DATE
    //toggleDefault: 'none'
};


var mixer = mixitup(containerEl, config);