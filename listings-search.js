
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

var containerEl = document.querySelector('.listings-container');
var targetSelector = '.listings-card';
var activeHash = '';

/**
 * Deserializes a hash segment (if present) into in an object.
 *
 * @return {object|null}
 */

function deserializeHash() {
    var hash    = window.location.hash.replace(/^#/g, '');
    var obj     = null;
    var groups  = [];

    if (!hash) return obj;

    obj = {};
    groups = hash.split('&');

    groups.forEach(function(group) {
        var pair = group.split('=');
        var groupName = pair[0];

        obj[groupName] = pair[1].split(',');
    });

    return obj;
}

/**
 * Serializes a uiState object into a string.
 *
 * @param   {object}    uiState
 * @return  {string}
 */

function serializeUiState(uiState) {
    var output = '';

    for (var key in uiState) {
        var values = uiState[key];

        if (!values.length) continue;

        output += key + '=';
        output += values.join(',');
        output += '&';
    };

    output = output.replace(/&$/g, '');

    return output;
}

/**
 * Constructs a `uiState` object using the
 * `getFilterGroupSelectors()` API method.
 *
 * @return {object}
 */

function getUiState() {
    // NB: You will need to rename the object keys to match the names of
    // your project's filter groups – these should match those defined
    // in your HTML.

    var uiState = {
        location: mixer.getFilterGroupSelectors('location').map(getValueFromSelector),
        date: mixer.getFilterGroupSelectors('date').map(getValueFromSelector),
    };

    return uiState;
}

/**
 * Updates the URL hash whenever the current filter changes.
 *
 * @param   {mixitup.State} state
 * @return  {void}
 */

function setHash(state) {
    var selector = state.activeFilter.selector;

    // Construct an object representing the current state of each
    // filter group

    var uiState = getUiState();

    // Create a URL hash string by serializing the uiState object

    var newHash = '#' + serializeUiState(uiState);

    if (selector === targetSelector && window.location.href.indexOf('#') > -1) {
        // Equivalent to filter "all", and a hash exists, remove the hash

        activeHash = '';

        history.replaceState(null, document.title, window.location.pathname);
    } else if (newHash !== window.location.hash && selector !== targetSelector) {
        // Change the hash

        activeHash = newHash;

        history.replaceState(null, document.title, window.location.pathname + newHash);
    }
}

/**
 * Updates the mixer to a previous UI state.
 *
 * @param  {object|null}    uiState
 * @param  {boolean}        [animate]
 * @return {Promise}
 */

function syncMixerWithPreviousUiState(uiState, animate) {
    var location = (uiState && uiState.location) ? uiState.location : [];
    var date = (uiState && uiState.date) ? uiState.date : [];

    mixer.setFilterGroupSelectors('location', location.map(getSelectorFromValue));
    mixer.setFilterGroupSelectors('date', date.map(getSelectorFromValue));

    // Parse the filter groups (passing `false` will perform no animation)

    return mixer.parseFilterGroups(animate ? true : false);
}

/**
 * Converts a selector (e.g. '.green') into a simple value (e.g. 'green').
 *
 * @param   {string} selector
 * @return  {string}
 */

function getValueFromSelector(selector) {
    return selector.replace(/^./, '');
}

/**
 * Converts a simple value (e.g. 'green') into a selector (e.g. '.green').
 *
 * @param   {string} selector
 * @return  {string}
 */

function getSelectorFromValue(value) {
    return '.' + value;
}

var uiState = deserializeHash();

// Instantiate MixItUp

var mixer = mixitup(containerEl, {
    multifilter: {
        enable: true
    },
    animation: {
        effects: 'fade translateZ(-100px)'
    },
    callbacks: {
        onMixEnd: setHash // Call the setHash() method at the end of each operation
    }
});

if (uiState) {
    // If a valid uiState object is present on page load, filter the mixer

    syncMixerWithPreviousUiState(uiState);
}