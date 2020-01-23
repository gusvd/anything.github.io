////////////////////////////////////////////////////
// Creating dynamic elements classes:

 var locationArray = document.querySelectorAll('.locationgroup');
 
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


 /// Logic for dropdown

 // To keep our code clean and modular, all custom functionality will be contained inside a single object literal called "dropdownFilter".

var dropdownFilter = {
  
  // Declare any variables we will need as properties of the object
  
  $filters: null,
  $contribution: null,
  groups: [],
  outputArray: [],
  outputString: '',
  
  // The "init" method will run on document ready and cache any jQuery objects we will need.
  
  init: function(){
    var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "dropdownFilter" object so that we can share methods and properties between all parts of the object.
    
    self.$filters = $('#filters');
    self.$contribution = $('#contribution');
    self.$container = $('#listings-container');
    
    self.$filters.find('.fieldset').each(function(){
      self.groups.push({
        $dropdown: $(this).find('select'),
        active: ''
      });
    });
    
    self.bindHandlers();
  },
  
  // The "bindHandlers" method will listen for whenever a select is changed. 
  
  bindHandlers: function(){
    var self = this;
    
    // Handle select change
    
    self.$filters.on('change', 'select', function(e){
      e.preventDefault();
      
      self.parseFilters();
    });
    
    // Handle contribution check box
    
    self.$contribution.on('click', function(e){
      e.preventDefault();
      
      self.parseFilters();
    });
  },
  
  // The parseFilters method pulls the value of each active select option
  
  parseFilters: function(){
    var self = this;
 
    // loop through each filter group and grap the value from each one.
    
    for(var i = 0, group; group = self.groups[i]; i++){
      group.active = group.$dropdown.val();
    }
    
    self.concatenate();
  },
  
  // The "concatenate" method will crawl through each group, concatenating filters as desired:
  
  concatenate: function(){
    var self = this;
    
    self.outputString = ''; // Reset output string
    
    for(var i = 0, group; group = self.groups[i]; i++){
      self.outputString += group.active;
    }
    
    // If the output string is empty, show all rather than none:
    
    !self.outputString.length && (self.outputString = 'all'); 
    
    console.log(self.outputString); 
    
    // ^ we can check the console here to take a look at the filter string that is produced
    
    // Send the output string to MixItUp via the 'filter' method:
    
    if(self.$container.mixItUp('isLoaded')){
      self.$container.mixItUp('filter', self.outputString);
    }
  }
};
  
// On document ready, initialise our code.

$(function(){
      
  // Initialize dropdownFilter code
      
  dropdownFilter.init();
      


////////////////////////////////////////////////////
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
        filter: '.Europe', ////////// CHANGE THIS TO REFLECT THE RIGHT FILTER BASED ON URL
        sort: 'default:asc' 
    },
    controls: {
        enable: false // we won't be needing these
    },
    callbacks: {
      onMixFail: function(){
        alert('No items were found matching the selected filters.');
      }
    }
};

var mixer = mixitup(containerEl, config);