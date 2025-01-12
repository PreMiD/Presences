const presence = new Presence({
		clientId: "1327078556802482206",
	}),
	getElement = (query: string): string | undefined => {
		return document.querySelector(query)?.textContent;
	},
	browsingTimestamp = Math.floor(Date.now() / 1000),
	BROWSING_TEXTS = new Map<string, string>([
		["following", "their following posts..."],
		["me", "their own posts..."],
		["explore", "users posts..."],
		["tagged", "their tagged posts..."],
	]);

const enum Assets {
	Logo = "https://i.imgur.com/R0nvAIA.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			name: "PikiDiary",
			type: ActivityType.Playing,
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search, href, hostname } = document.location;

	if (pathname === "/") presenceData.details = "Viewing home page";
	else if (pathname.includes("@")) {
		// the @ means that we're in a user page
		if (!document.querySelector(".info > a")) {
			presenceData.details = `Viewing ${getElement(".info > span")} profile`;
			const userImage = document
				.querySelector(".bar > div")
				.querySelector("img");
			if (userImage) presenceData.largeImageKey = userImage;
			presenceData.buttons = [
				{
					label: "View Profile",
					url: href,
				},
			];
		} else {
			// self profile
			let slicedSearch = "";
			search ? (slicedSearch = search.slice(5)) : (slicedSearch = "following");
			presenceData.details = "Browsing through";
			presenceData.state = BROWSING_TEXTS.get(slicedSearch);
		}
	} else if (pathname.includes("live")) {
		if (pathname.includes("studio")) {
			const viewCount = getElement("#view-count");
			if (viewCount === "0") {
				// not streaming yet
				presenceData.details = "Managing their live...";
				presenceData.smallImageKey = Assets.Reading;
				presenceData.smallImageText = "Setting up...";
			} else {
				presenceData.details =
					document.querySelector("#title-text").textContent;
				presenceData.state = `Live on PikiDiary // ${viewCount} viewers`;
				presenceData.largeImageKey = `https://${hostname}${document
					.querySelector(".avatar-small")
					.getAttribute("src")}`; // user avatar
				presenceData.smallImageKey = Assets.Live;
				presenceData.smallImageText = "Live";
				presenceData.buttons = [
					{
						label: "Watch Live",
						url: getElement("#share-link"),
					},
				];
			}
		} else {
			presenceData.type = ActivityType.Watching;
			presenceData.details = getElement("#title-text"); // live name
			presenceData.state = document.querySelectorAll("a")[4].textContent; // user name
			presenceData.largeImageKey = `https://${hostname}${document
				.querySelector(".avatar-small")
				.getAttribute("src")}`; // user avatar
			presenceData.smallImageKey = Assets.Live;
			presenceData.smallImageText = "Live";
			presenceData.buttons = [
				{
					label: "Watch Live",
					url: href,
				},
			];
		}
	} else if (pathname.includes("settings")) {
		presenceData.details = "Setting up";
		presenceData.state = "their profile";
	} else if (pathname.includes("posts")) {
		presenceData.details = `Reading a post of ${getElement(".post-name")}`;
		presenceData.state = `${getElement(".like-count")} likes // ${
			document.querySelectorAll(".post-button")[1].textContent
		} replys`;
		presenceData.buttons = [
			{
				label: "View Post",
				url: href,
			},
		];
	} else if (pathname.includes("login")) presenceData.details = "Logging in";
	else if (pathname.includes("signup")) presenceData.details = "Signing up";

	presence.setActivity(presenceData);
});
