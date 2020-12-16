const presence = new Presence({
    clientId: "751981945881231430"
});


presence.on("UpdateData", async () => {
    let state,
	details,
	smallImageText = "Bubblez.app | v1.0.0",
	smallImageKey = "rebrand",
	largeImageKey = "bubblez-logo",
	dreading = "Reading...";

    const path = window.location.pathname;
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	
	state = "Reading some posts.";
	details = "Browsing...";
	
	if (path.match("/home")) {
		state = "Some posts.";
		details = dreading;
	}
	
	if (path.match("/postedit")) {
		state = "A post.";
		details = "Editing..";
	}
	else if (path.match("/post")) {
		state = "A post.";
		details = dreading;
	}
	else if (path.match("/p")) {
		let trimstring = urlParams.toString().substring(0, urlParams.toString().length - 1)
		state = trimstring + "'s profile.";
	}
	
	if (path.match("likedby")) {
		state = "Likes.";
		details = dreading;
	}
	
	if (path.match("/settings/")) {
		state = "Settings " + path.split("/")[2] + ".";
	}
	
	if (path.match("/following")) {
		state = "Following list.";
		details = dreading;
	}
	
	if (path.match("/followers")) {
		state = "Followers list.";
		details = dreading;
	}
	
	if (path.match("/leaderboard")) {
		state = "Leaderboard.";
		details = dreading;
	}
	
	if (path.match("/blogs")) {
		state = "Devlogs.";
		details = dreading;
	}
	
	if (path.match("/tos")) {
		state = "TOS.";
		details = dreading;
	}
	
	if (path.match("/adminpanel/")) {
		state = "Admin";
		details = "Browsing...";
	}
	
	if (path.match("/secret")) {
		state = "Secret";
		details = "Found a";
	}
	
	
	const PresenceData: PresenceData = {
        largeImageKey: largeImageKey,
        smallImageKey: smallImageKey,
        smallImageText: smallImageText,
        details: details,
		state: state
    };
	presence.setActivity(PresenceData);
});