const presence = new Presence({
	clientId: "970081844391473192"
});

let currentURL = new URL(document.location.href),
	currentPath = currentURL.pathname
		.replace(/^\/|\/$|\/index\.html$|.html$/g, "")
		.split("/"),
	lastPathname = "-no-";

const browsingTimestamp = Math.floor(Date.now() / 1000),
	defaultData: PresenceData = {
		details: "Viewing an unsupported page",
		largeImageKey: "lg",
		startTimestamp: browsingTimestamp
	};

let presenceData: PresenceData = { ...defaultData };

/**
 * Known paths
 * /user-challenges/find
 * /local-lobby
 * /online-lobby
 * /user-page/:user_id
 * /matchmaking-lobby
 * /squad/list
 * /squad/player-list
 * /squad/details/:squadname
 */
const pathMap = new Map<string, string>([
	["home", "On the home page"],
	["community-map", "Looking at the community map"]
]);

presence.on("UpdateData", async () => {
	currentURL = new URL(document.location.href);
	currentPath = currentURL.pathname
		.replace(/^\/|\/$|\/index\.html$|.html$/g, "")
		.split("/");
	presenceData = { ...defaultData };

	if (lastPathname !== currentURL.pathname) {
		lastPathname = currentURL.pathname;

		presenceData.details = document.title.slice("Geotastic - ".length);
		if (pathMap.has(currentPath[0]))
			presenceData.details = pathMap.get(currentPath[0]);

		if (currentPath[0] === "home") presenceData.details = "On the home page";

		presence.setActivity(presenceData);
	}
});
