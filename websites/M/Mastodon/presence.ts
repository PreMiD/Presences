const presence = new Presence({
		clientId: "1107321415243415574",
	});


// checks if user is logged from textarea
function checkPositionAccountAvatar() {
	if (document.querySelectorAll(".autosuggest-textarea__textarea").length < 1)
		return 1;
	return 2;
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/jlQv2if.png",
	};
	
	if (document.location.pathname === "/home") {
		presenceData.smallImageText = "Home";
		presenceData.details = "On the homepage";

	} else if (document.location.pathname === "/notifications") {
		presenceData.smallImageText = "Notifications";
		presenceData.details = "Checking notifications";

	} else if (document.location.pathname.startsWith("/explore")) {
		presenceData.smallImageKey = "https://i.imgur.com/WhzGXp1.png";
		presenceData.smallImageText = "Explore";
		presenceData.details = "On the explore";

	} else if (document.location.pathname === "/public/local") {
		presenceData.smallImageText = "Local timeline";
		presenceData.details = "Looking in local timeline";

	} else if (document.location.pathname === "/public") {
		presenceData.largeImageKey = "https://i.imgur.com/rHkwnMe.png";
		presenceData.smallImageText = "Fediverse";
		presenceData.details = "Looking in fediverse";

	} else if (
		document.location.pathname === "/bookmarks" ||
		document.location.pathname === "/favourites" ||
		document.location.pathname === "/lists"
	) {
		const pathName = document.location.pathname.split("/")[1];
		presenceData.smallImageText = pathName;
		presenceData.details = `Looking their ${pathName}`;

	} else if (document.location.pathname === "/search") {
		const searchInput = document.querySelector(".search__input").getAttribute("value");
		presenceData.smallImageText = "Search";
		presenceData.details = `Searching ${searchInput}`;

	} else if (document.location.pathname.startsWith("/@")) {
		const userName = document.location.pathname.split(/[@,/]+/)[1];
		presenceData.smallImageKey = document.querySelectorAll(".account__avatar")[checkPositionAccountAvatar()].querySelector("img").getAttribute("src");
		presenceData.smallImageText = `${document.location}`;
		
		presenceData.details = `Viewing ${userName}'s profile`;

	} else if (document.location.pathname.startsWith("/settings")) {
		presenceData.smallImageText = "Settings";
		presenceData.details = "Viewing their settings";

	} else if (document.location.pathname === "/relationships") {
		presenceData.smallImageText = "Relationships";
		presenceData.details = "Viewing their followers";

	} else if (document.location.pathname.startsWith("/tags")) {
		const tag = document.location.pathname.split("/")[2];
		presenceData.smallImageText = "tags";
		presenceData.details = `Searching ${tag} tag`;

	} else if (document.location.pathname === ("/about")) {
		const instanceName = document.location.hostname;
		presenceData.smallImageKey = document.querySelectorAll(".account__avatar")[checkPositionAccountAvatar()].querySelector("img").getAttribute("src");
		presenceData.largeImageKey = document.querySelectorAll(".about__header__hero")[0].querySelector("img").getAttribute("src");
		presenceData.smallImageText = `About ${instanceName}`;
		presenceData.details = `About ${instanceName}`;

	} else if (document.location.pathname === ("/directory")) {
		presenceData.smallImageText = "Directory";
		presenceData.details = "On the directory";

	} else if (document.location.pathname === ("/privacy-policy")) {
		presenceData.smallImageText = "Privacy and Policy";
		presenceData.details = "Reading Privacy and Policy";

	}

	presence.setActivity(presenceData);
});
