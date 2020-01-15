
var Webflow = Webflow || [];
Webflow.push(function() {

    ////////////////////////////////////////
    // GET VARIABLES FROM SCRIPT TAG
    ////////////////////////////////////////

    var script_tag = document.getElementById('create-listing-body');
    var CMStitle = script_tag.getAttribute("CMStitle");
    var CMSdescription = script_tag.getAttribute("CMSdescription");
    var CMSlistingImage = script_tag.getAttribute("CMSlistingImage");
    var CMSdepartureLocation = script_tag.getAttribute("CMSdepartureLocation");
    var CMSdestination = script_tag.getAttribute("CMSdestinationx");
    var CMScategory = script_tag.getAttribute("CMScategory");
    var CMSlanguageOnboard = script_tag.getAttribute("CMSlanguageOnboard");
    var CMSexpensesCurrency = script_tag.getAttribute("CMSexpensesCurrency");
    var CMSexpensesOnboard = script_tag.getAttribute("CMSexpensesOnboard");
    var CMSboatName = script_tag.getAttribute("CMSboatName");
    var CMSboatModel = script_tag.getAttribute("CMSboatModel");
    var CMSboatSize = script_tag.getAttribute("CMSboatSize");
    var CMSboatHullType = script_tag.getAttribute("CMSboatHullType");
    var CMSboatBuiltYear = script_tag.getAttribute("CMSboatBuiltYear");
    var CMSboatBerths = script_tag.getAttribute("CMSboatBerths");
    var CMSboatDescription = script_tag.getAttribute("CMSboatDescription");
    var CMSwebflowListingId = script_tag.getAttribute("CMSwebflowListingId");
    var CMSexpensesCommute = script_tag.getAttribute("CMSexpensesCommute");
    var CMSdepartureDate = script_tag.getAttribute("CMSdepartureDate");
    var CMSlistingOwner = script_tag.getAttribute("CMSlistingOwner");

    ////////////////////////////////////////
    // EDIT OR VIEW MODE - HIDE/SHOW RELEVANT SECTION
    ////////////////////////////////////////

    // Grab query string
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    }

    ////////////////////////////////////////
    // Check querystring to see if it's an edit request

    if (getQueryVariable('managelisting')) {

        // Grab Memberstack User Id
        MemberStack.onReady.then(function(member) {
            if (member.loggedIn) {
                LoggedUserID = member.id
            } else {
                LoggedUserID =  null;
            };
   
            ////////////////////////////////////////
            // Check if the logged in user is the listing owner

            if (LoggedUserID == CMSlistingOwner) {

                // Show/hide relevant section
                $('#view-listing-section').hide();
                $('#edit-listing-section').show();

                // Add date picker to form field
                var picker = new Pikaday({
                    field: document.getElementById('departure-date'),
                    format: 'DD/MM/YYYY',
                    minDate: moment().toDate()
                });

                ////////////////////////////////////////
                // PARSLEY MULTI-STEP FORM
                $(function() {
                    var $sections = $('.form-section');

                    function navigateTo(index) {
                        // Mark the current section with the class 'current'
                        $sections
                            .removeClass('current')
                            .eq(index)
                            .addClass('current');
                        // Show only the navigation buttons that make sense for the current section:
                        $('.form-navigation .previous').toggle(index > 0);
                        var atTheEnd = index >= $sections.length - 1;
                        $('.form-navigation .next').toggle(!atTheEnd);
                        $('.form-navigation [type=submit]').toggle(atTheEnd);
                    }

                    function curIndex() {
                        // Return the current index by looking at which section has the class 'current'
                        return $sections.index($sections.filter('.current'));
                    }

                    // Previous button is easy, just go back
                    $('.form-navigation .previous').click(function() {
                        navigateTo(curIndex() - 1);
                    });

                    // Next button goes forward iff current block validates
                    $('.form-navigation .next').click(function() {
                        $('.multi-step-form').parsley().whenValidate({
                            group: 'block-' + curIndex()
                        }).done(function() {
                            navigateTo(curIndex() + 1);
                        });
                    });

                    // Prepare sections by setting the `data-parsley-group` attribute to 'block-0', 'block-1', etc.
                    $sections.each(function(index, section) {
                        $(section).find(':input').attr('data-parsley-group', 'block-' + index);
                    });
                    navigateTo(0); // Start at the beginning
                });

                ////////////////////////////////////////
                // PREFILL FORM WITH CMS ITEMS FOR EDITING
                ////////////////////////////////////////

                // Function to unescape special characters to be displayed on form fields
                function htmlDecode(input) {
                    var doc = new DOMParser().parseFromString(input, "text/html");
                    return doc.documentElement.textContent;
                }

                // Pre-fill expenses filed with 0.00just in case
                document.getElementById('expenses-onboard').value = "0.00";

                // Pre-fill form
                document.getElementById('title').value = htmlDecode(CMStitle);
                document.getElementById('description').value = htmlDecode(CMSdescription);
                document.getElementById('listing-image').value = CMSlistingImage;
                document.getElementById('departure-location').value = CMSdepartureLocation;
                document.getElementById('destination').value = htmlDecode(CMSdestination);
                document.getElementById('category').value = CMScategory;
                document.getElementById('language-onboard').value = CMSlanguageOnboard;
                document.getElementById('expenses-currency').value = CMSexpensesCurrency;
                document.getElementById('expenses-onboard').value = CMSexpensesOnboard;
                document.getElementById('boat-name').value = htmlDecode(CMSboatName);
                document.getElementById('boat-model').value = htmlDecode(CMSboatModel);
                document.getElementById('boat-size').value = CMSboatSize;
                document.getElementById('boat-hull-type').value = CMSboatHullType;
                document.getElementById('boat-built-year').value = CMSboatBuiltYear;
                document.getElementById('boat-berths').value = CMSboatBerths;
                document.getElementById('boat-description').value = htmlDecode(CMSboatDescription);
                                    
                // Fill form-name hidden field to tell Inegromat this form is to update listing
                document.getElementById('form-name').value = 'update-listing';
                
                 // Fill memberstack ID hidden field
                document.getElementById('memberstack-id').value = LoggedUserID;
                
                 // Fill webflow-listing-ider hidden field
                document.getElementById('webflow-listing-id').value = CMSwebflowListingId;
                
                // Expenses commute radio buttons
                if (CMSexpensesCommute == 'Skipper') {
                    document.getElementById('expenses-commute-skipper').checked = true;
                } else {
                    document.getElementById('expenses-commute-crew').checked = true;
                }

                // Convert date format add to date field
                var msec = Date.parse(CMSdepartureDate);
                var d = new Date(msec);
                var curr_date = ("0" + (d.getDate())).slice(-2) // Add 0 if the day has single digit.
                                    var curr_month = ("0" + (d.getMonth() + 1)).slice(-2) // Months are zero based - add 0 if the month has single digit
                var curr_year = d.getFullYear();
                let formatted_date = curr_date + "/" + curr_month + "/" + curr_year
                document.getElementById('departure-date').value = formatted_date;
             }
        });
    }

});