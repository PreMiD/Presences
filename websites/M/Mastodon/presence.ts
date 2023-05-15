const presence = new Presence({
	clientId: "1107321415243415574",
});

enum Assets {
	Logo = "https://i.imgur.com/njcb4Wp.png",
	FediverseLogo = "https://i.imgur.com/B0HPMOQ.png",
	Search = "https://i.imgur.com/WhzGXp1.png",
}

// checks if user is logged from textarea
function checkPositionAccountAvatar() {
	if (document.querySelectorAll(".autosuggest-textarea__textarea").length < 1)
		return 1;
	return 2;
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		},
		{ pathname } = document.location;

	if (pathname === "/home") {
		presenceData.smallImageText = "Home";
		presenceData.details = "On the homepage";
	} else if (pathname === "/notifications") {
		presenceData.smallImageText = "Notifications";
		presenceData.details = "Checking notifications";
	} else if (pathname.startsWith("/explore")) {
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = "Explore";
		presenceData.details = "On the explore";
	} else if (pathname === "/public/local") {
		presenceData.smallImageText = "Local timeline";
		presenceData.details = "Looking in local timeline";
	} else if (pathname === "/public") {
		presenceData.largeImageKey = Assets.FediverseLogo;
		presenceData.smallImageText = "Fediverse";
		presenceData.details = "Looking in fediverse";
	} else if (
		pathname === "/bookmarks" ||
		pathname === "/favourites" ||
		pathname === "/lists"
	) {
		const pathName = pathname.split("/")[1];
		presenceData.smallImageText = pathName;
		presenceData.details = `Looking their ${pathName}`;
	} else if (pathname === "/search") {
		const searchInput = document
			.querySelector(".search__input")
			.getAttribute("value");
		presenceData.smallImageText = "Search";
		presenceData.details = `Searching ${searchInput}`;
	} else if (pathname.startsWith("/@")) {
		const userName = pathname.split(/[@,/]+/)[1];
		presenceData.smallImageKey = document
			.querySelectorAll(".account__avatar")
			[checkPositionAccountAvatar()].querySelector("img")
			.getAttribute("src");
		presenceData.smallImageText = `${document.location}`;

		presenceData.details = `Viewing ${userName}'s profile`;
	} else if (pathname.startsWith("/settings")) {
		presenceData.smallImageText = "Settings";
		presenceData.details = "Viewing their settings";
	} else if (pathname === "/relationships") {
		presenceData.smallImageText = "Relationships";
		presenceData.details = "Viewing their followers";
	} else if (pathname.startsWith("/tags")) {
		const tag = pathname.split("/")[2];
		presenceData.smallImageText = "tags";
		presenceData.details = `Searching ${tag} tag`;
	} else if (pathname === "/about") {
		const instanceName = document.location.hostname;
		presenceData.smallImageKey = document
			.querySelectorAll(".account__avatar")
			[checkPositionAccountAvatar()].querySelector("img")
			.getAttribute("src");
		presenceData.largeImageKey = document
			.querySelector(".about__header__hero")
			.querySelector("img")
			.getAttribute("src");
		presenceData.smallImageText = `About ${instanceName}`;
		presenceData.details = `About ${instanceName}`;
	} else if (pathname === "/directory") {
		presenceData.smallImageText = "Directory";
		presenceData.details = "On the directory";
	} else if (pathname === "/privacy-policy") {
		presenceData.smallImageText = "Privacy and Policy";
		presenceData.details = "Reading Privacy and Policy";
	}

	presence.setActivity(presenceData);
});
