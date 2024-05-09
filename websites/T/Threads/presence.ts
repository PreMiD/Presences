const presence = new Presence({
		clientId: "1237798561739968513",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	capitalize = (text: string): string => {
		return text
			.replace(/[[{(_)}\]]/g, " ")
			.replace(/^\w/, c => c.toUpperCase());
	};

presence.on("UpdateData", async () => {
	const [privacy, time] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("time"),
		]),
		{ pathname, href, search } = document.location,
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/bzknrFr.png",
		};

	let details: string, state: string;

	details = "Browsing...";

	if (pathname.match("/following")) state = "Following feed";
	else if (pathname.match("/saved")) state = "Saved threads";
	else if (pathname.match("/liked")) state = "Liked threads";
	else if (pathname.match("/login") || pathname.match("/nonconsent"))
		details = "Logging in";
	else if (pathname.match("/search") && !privacy) {
		details = "Searching for:";
		state = new URLSearchParams(search).get("q");

		if (!state) details = "Search";
	} else if (pathname.startsWith("/@")) {
		state = pathname.split("/")[1];

		if (!privacy) {
			presenceData.smallImageKey = (
				document.querySelector(
					`img[alt*="${state.split("@")[1]}"]`
				) as HTMLImageElement
			).src;

			presenceData.smallImageText = state.split("@")[1];
		}

		if (pathname.split("/")[2] === "post") {
			details = "Viewing a thread";

			if (!privacy) {
				presenceData.buttons = [
					{
						label: "View Thread",
						url: href,
					},
				];
			}
		} else {
			details = "Viewing a profile";

			if (!privacy) {
				presenceData.buttons = [
					{
						label: "View Profile",
						url: href,
					},
				];
			}
		}
	} else if (pathname.split("/")[1]) {
		details = capitalize(pathname.split("/")[1]);
		state = capitalize(pathname.split("/")[2] || "");
	} else state = "For You feed";

	presenceData.details = details;

	if (!privacy) presenceData.state = state;

	if (time) presenceData.startTimestamp = browsingTimestamp;

	presence.setActivity(presenceData);
});
