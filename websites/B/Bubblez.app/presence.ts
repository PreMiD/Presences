const presence = new Presence({
    clientId: "751981945881231430" //The client ID of the Application created at https://discordapp.com/developers/applications
});

const capitalize = (text: string): string => {
  var texts = text.replace(/[[{(_)}\]]/g, " ").split(" ");
  return texts
    .map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join(" ");
};


presence.on("UpdateData", async () => {
    var state,
		details,
		smallImageText = "Bubblez.app | v1.1.6",
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
        largeImageKey: largeImageKey, /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/
        smallImageKey: smallImageKey, /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/
        smallImageText: smallImageText, //The text which is displayed when hovering over the small image
        details: details, //The upper section of the presence text
		state: state //"Reading some posts" //The lower section of the presence text

    };
		presence.setActivity(PresenceData); //Update the presence with all the values from the presenceData object
});