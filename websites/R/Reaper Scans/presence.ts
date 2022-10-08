const presence = new Presence({
		clientId: "900717839713959967",
	}),
	elapsed = Math.floor(Date.now() / 1e3);

enum Assets {
	logo = "https://i.imgur.com/tPMtbjL.png",
	search = "https://i.imgur.com/08wjeL0.png",
	read = "https://i.imgur.com/Gglu4Tk.png",
	view = "https://i.imgur.com/BMzYEcO.png",
}

presence.on("UpdateData", () => {
	const { pathname, href } = window.location,
		presenceData: PresenceData = {
			startTimestamp: elapsed,
			largeImageKey: Assets.logo,
		},
		pathSplit = pathname.split("/").slice(1);

	if ((pathSplit[0] ?? "") === "") presenceData.details = "Viewing Home Page";
	else if (pathSplit[0] === "comics" || pathSplit[0] === "novels") {
		const captitalized = `${pathSplit[0][0].toUpperCase()}${pathSplit[0].slice(
			1
		)}`;
		if (pathSplit[1]) {
			if (pathSplit[2] === "chapters") {
				let progress =
					(document.documentElement.scrollTop /
						(document.querySelector(
							pathSplit[0] === "comics"
								? "main > div:not([id*='Ads'])"
								: "article"
						).scrollHeight -
							window.innerHeight)) *
					100;
				progress = Math.ceil(progress) > 100 ? 100 : Math.ceil(progress);

				presenceData.details = `Reading ${
					document.querySelector("h2").textContent
				}`;
				presenceData.state = `📖 ${document
					.querySelector("h1")
					.textContent.trim()} 🔸 ${progress}%`;
				presenceData.smallImageKey = Assets.read;
				presenceData.buttons = [
					{
						label: `Visit ${captitalized.slice(captitalized.length - 1)} Page`,
						url: document.querySelector<HTMLAnchorElement>("h2 + div > a").href,
					},
					{
						label: "Visit Chapter",
						url: href,
					},
				];
			} else {
				presenceData.details = `Viewing ${captitalized} Page`;
				presenceData.state = document.querySelector("h1").textContent;
				presenceData.smallImageKey = Assets.view;
				presenceData.buttons = [
					{
						label: `Visit ${captitalized} Page`,
						url: href,
					},
				];
			}
		} else {
			presenceData.details = `Viewing ${captitalized} List`;
			presenceData.state = `📋 ${
				document.querySelectorAll<HTMLLIElement>("h2 + div li").length
			} ${pathSplit[0]}s found`;
		}
	} else if (pathSplit[0] === "account")
		presenceData.details = "Managing Account Settings";
	else {
		presenceData.details = "Browsing Reaper Scans";
		presenceData.state = document.title;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
