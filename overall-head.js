

// Load Memberstack User Id into Session variable
MemberStack.onReady.then(function(member) {
	LoggedUserID = member.id;
	console.log(LoggedUserID);
	sessionStorage.setItem("LoggedUserID", LoggedUserID);
});

// Add links to NavBar
var Webflow = Webflow || [];
Webflow.push(function () {
	// DOMready has fired
	// May now use jQuery and Webflow api
	LoggedUserID = sessionStorage.getItem("LoggedUserID");
	console.log(LoggedUserID);
	if (LoggedUserID) {
		document.getElementById("navbar-profile").href="https://crewmates.webflow.io/users/" + LoggedUserID + "#user-profile";
  		document.getElementById("navbar-listings").href="https://crewmates.webflow.io/users/" + LoggedUserID;
  	};
});

