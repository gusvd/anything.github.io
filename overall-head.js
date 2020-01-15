var Webflow = Webflow || [];
Webflow.push(function () {
	MemberStack.onReady.then(function(member) {
		if (member.loggedIn) {
			LoggedUserID = member.id;
			document.getElementById("navbar-profile").href="https://crewmates.webflow.io/users/" + LoggedUserID + "#user-profile";
		  	document.getElementById("navbar-listings").href="https://crewmates.webflow.io/users/" + LoggedUserID;
		  	sessionStorage.setItem('LoggedUserID', LoggedUserID);
		} else {
			sessionStorage.setItem('LoggedUserID', null);
		};
	})
});