const presence = new Presence({
    clientId: "751981945881231430"
});


function pathIncludes(string: string): boolean {
  return document.location.pathname.toLowerCase().includes(string);
}


presence.on("UpdateData", async () => {
	//const details = "..." ? "Logged in as " + document.querySelector("b.user-data").textContent.replace(/[\s\n]+/gi, "") : "...",
    let detailsraw = "";
	
	if (document.querySelector("b.user-data").textContent.replace(/[\s\n]+/gi, "") == "Login") {
		detailsraw = "Not logged in";
	}
	else {
		detailsraw = "Logged in as " + document.querySelector("b.user-data").textContent.replace(/[\s\n]+/gi, "");
	}
	
	const Data: PresenceData = {
        largeImageKey: "bubblez-logo",
        smallImageKey: "rebrand",
        smallImageText: "Bubblez.app | v1.0.0",
		details: detailsraw
    };

    const path = window.location.pathname;
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	
	switch (true) {
		case pathIncludes("/home"):
			Data.state = "Some posts.";
		break;
		case pathIncludes("/postedit"):
			Data.state = "Editing a post.";
		break;
		case pathIncludes("/post"):
			Data.state = "A post.";
		break;
		case pathIncludes("/p"):
			let trimstring = urlParams.toString().substring(0, urlParams.toString().length - 1)
			Data.state = trimstring + "'s profile.";
		break;
		case pathIncludes("/register"):
			Data.details = "User Register.";
		break;
		case pathIncludes("/login"):
			Data.details = "User Login.";
		break;
		case pathIncludes("/likedby"):
			Data.state = "Likes.";
		break;
		case pathIncludes("/settings/"):
			Data.state = "Settings " + path.split("/")[2] + ".";
		break;
		case pathIncludes("/following"):
			Data.state = "Following list.";
		break;
		case pathIncludes("/followers"):
			Data.state = "Followers list.";
		break;
		case pathIncludes("/leaderboard"):
			Data.state = "Leaderboard.";
		break;
		case pathIncludes("/blogs"):
			Data.state = "Devlogs.";
		break;
		case pathIncludes("/tos"):
			Data.state = "TOS.";
		break;
		case pathIncludes("/adminpanel/"):
			Data.state = "Browsing Adminpanel";
		break;
		case pathIncludes("/secret"):
			Data.state = "Found a Secret";
		break;
		default:
			Data.state = "Reading some posts.";
	}
	
	presence.setActivity(Data);
});