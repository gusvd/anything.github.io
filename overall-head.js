var Webflow = Webflow || [];
Webflow.push(function () {
	MemberStack.onReady.then(function(member) {
		if (member.loggedIn) {
			LoggedUserID = member.id;
			userProfilePicture = member["profile-picture"];
			console.log(userProfilePicture);
			document.getElementById("navbar-profile").href="/users/" + LoggedUserID + "#user-profile";
		  	document.getElementById("navbar-listings").href="/users/" + LoggedUserID;
		  	sessionStorage.setItem('LoggedUserID', LoggedUserID);
		} else {
			sessionStorage.setItem('LoggedUserID', null);
		};
	})
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}