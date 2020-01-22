var Webflow = Webflow || [];
Webflow.push(function () {
	MemberStack.onReady.then(function(member) {
		if (member.loggedIn) {
			LoggedUserID = member.id;
			document.getElementById("navbar-profile").href="..//users/" + LoggedUserID + "#user-profile";
		  	document.getElementById("navbar-listings").href="..//users/" + LoggedUserID;
		  	sessionStorage.setItem('LoggedUserID', LoggedUserID);
		} else {
			sessionStorage.setItem('LoggedUserID', null);
		};
	})
});