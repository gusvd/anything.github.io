

// Load Memberstack User Id into Session variable
function GetUserID() {
	MemberStack.onReady.then(function(member) {
		if (member.loggedIn) {
			memberid = member.id
		} else {
			memberid =  null;
		};
	});
	return memberid;
};

// Add links to NavBar
var Webflow = Webflow || [];
Webflow.push(function () {
	// DOMready has fired
	// May now use jQuery and Webflow; api
	console.log(GetUserID());
	if (GetUserID()) {
		LoggedUserID = GetUserID();
		document.getElementById("navbar-profile").href="https://crewmates.webflow.io/users/" + LoggedUserID + "#user-profile";
  		document.getElementById("navbar-listings").href="https://crewmates.webflow.io/users/" + LoggedUserID;
  	};
});

