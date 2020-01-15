// CMSmemberstackid passed on embed

// Load Memberstack User Id into Session variable
MemberStack.onReady.then(function(member) {
	if (member.loggedIn) {
		LoggedUserID = member.id
	} else {
		LoggedUserID =  null;
	};
});

var Webflow = Webflow || [];
Webflow.push(function () {
  // DOMready has fired
  // May now use jQuery and Webflow api
  if (LoggedUserID == CMSmemberstackid) {
  		document.getElementById("user-listings").style.display = "block";
		}
});