const presence = new Presence({
		clientId: "1020099638470127627",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/LDfzrVM.png",
		startTimestamp: browsingTimestamp
	},
	pathSplit = window.location.pathname.split("/").slice(1)

	switch (pathSplit[0]) {
		case "": {
			presenceData.details = "Browsing homepage"
			break
		}
		case "about": {
			presenceData.details = "Browsing"
			presenceData.state = "About"
			break
		}
		case "explore": {
			break
		}
		case "feed": {
			break
		}
		case "profile": {
			break
		}
		case "recommended": {
			break
		}
		case "recent": {
			break
		}
		case "user": {
			break
		}
		default: {
			presenceData.details = "Browsing"
			presenceData.state = document.querySelector<HTMLHeadingElement>(".page-title")?.textContent ?? document.title.match(/^(.*?)(?: - ListenBrainz)?$/)[1];
			break
		}
	}

	if (presenceData.details) presence.setActivity(presenceData)
	else presence.setActivity()
})
