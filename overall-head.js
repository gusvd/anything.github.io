

// Load Memberstack User Id into Session variable
function GetUserID() {
	MemberStack.onReady.then(function(member) {
		if (member.loggedIn) {
			LoggedUserID = member.id;
			sessionStorage.setItem("LoggedUserID", LoggedUserID);
			return LoggedUserID;
		} else {
			return null;
		};
	});
};

console.log(GetUserID());

// Add links to NavBar
var Webflow = Webflow || [];
Webflow.push(function () {
	// DOMready has fired
	// May now use jQuery and Webflow api
	if (GetUserID()) {
		LoggedUserID = GetUserID();
		document.getElementById("navbar-profile").href="https://crewmates.webflow.io/users/" + LoggedUserID + "#user-profile";
  		document.getElementById("navbar-listings").href="https://crewmates.webflow.io/users/" + LoggedUserID;
  	};
});

