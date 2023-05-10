const presence = new Presence({
		clientId: "784067980086607952",
	}),
	startTimestamp: number = Math.floor(Date.now() / 1000);
	
async function getStrings(){
	return presence.getStrings({
		browsing: "general.browsing",
	});
}
let strings: Awaited<ReturnType<typeof getStrings>>;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/wFmlFjg.png",
		startTimestamp,
	};
	const pathnameArray = document.location.pathname.split("/");
	const page = pathnameArray[1];
	const episode = pathnameArray[3];
	const [showCover] = await Promise.all([
		presence.getSetting<boolean>("cover"),
	]);
	strings = await getStrings();

	switch (page) {
		case "anime": {
			presenceData.details = `Watching an anime`;
			presenceData.state = document
				.querySelector("h3.titleA")
				.textContent.trim();
			if (showCover) {
				presenceData.largeImageKey = document
					.querySelector(".cover")
					.getAttribute("src");
			}
			if (episode) {
				presenceData.state += ` - Episode ${episode}`;
			}
			break;
		}
		default:
			presenceData.details = "Looking for an anime to watch";
			presenceData.state = "Home";
	}

	presence.setActivity(presenceData, true);
});
