
// Load Memberstack User Id into variable
MemberStack.onReady.then(function(member) {
	if (member.loggedIn) {
		LoggedUserID = member.id

		// Add links to NavBar
		var Webflow = Webflow || [];
		Webflow.push(function () {
			// DOMready has fired
			// May now use jQuery and Webflow; api
			document.getElementById("navbar-profile").href="https://crewmates.webflow.io/users/" + LoggedUserID + "#user-profile";
	  		document.getElementById("navbar-listings").href="https://crewmates.webflow.io/users/" + LoggedUserID;
	  		sessionStorage.setItem('LoggedUserID', LoggedUserID);
		});

	} else {
		sessionStorage.setItem('LoggedUserID', null);
	};
});