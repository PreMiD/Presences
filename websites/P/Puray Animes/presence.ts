const presence = new Presence({
		clientId: "972246349917610054"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum PathNames {
	home = "/home",
	watch = "/watch/",
	profile = "/profile/",
	anime = "/anime/"
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://imgur.com/8MP205p.png",
			startTimestamp: browsingTimestamp
		},
		pathName = window.location.pathname
	function DefaultPresence(): void {
		if (!presenceData.details) presence.setActivity();
		else presence.setActivity(presenceData);
	}
	if (pathName.startsWith(PathNames.home)) {
		presenceData.details = "Início:";
		presenceData.state = `Visualizando Animes.`;
		presenceData.startTimestamp = browsingTimestamp;
	} else if (pathName.startsWith(PathNames.profile)) {
		const username = document.querySelector("h3").childNodes[0].textContent;
		presenceData.details = "Visualizando Perfil:";
		presenceData.state = `${username}`;
		presenceData.startTimestamp = browsingTimestamp;
	} else if (pathName.startsWith(PathNames.anime)) {
		const animename = document.querySelector("section div[class^=text-3xl]");
		presenceData.details = "Visualizando Anime:";
		presenceData.state = `${animename.textContent}`;
		presenceData.startTimestamp = browsingTimestamp;
	} else if (pathName.startsWith(PathNames.watch)) {
		const animename = document.querySelector("section div[class^=text-3xl]");
		presenceData.details = "Assistindo Anime:";
		presenceData.state = `${animename.textContent}`;
		presenceData.startTimestamp = browsingTimestamp;
	}
	DefaultPresence();
});
