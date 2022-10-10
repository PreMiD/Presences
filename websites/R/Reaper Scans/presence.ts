const presence = new Presence({
		clientId: "900717839713959967",
	}),
	elapsed = Math.floor(Date.now() / 1e3);

enum Assets {
	Logo = "https://i.imgur.com/tPMtbjL.png",
	Search = "https://i.imgur.com/08wjeL0.png",
	Read = "https://i.imgur.com/Gglu4Tk.png",
	View = "https://i.imgur.com/BMzYEcO.png",
}

presence.on("UpdateData", () => {
	const { pathname, href } = window.location,
		presenceData: PresenceData = {
			startTimestamp: elapsed,
			largeImageKey: Assets.Logo,
		},
		pathSplit = pathname.split("/").slice(1);

	switch (pathSplit[0] ?? "") {
		case "": {
			const searchInput = document.querySelector<HTMLInputElement>("#search");
			if (searchInput === document.activeElement) {
				presenceData.details = "Searching";
				presenceData.state = searchInput.value;
				presenceData.smallImageKey = Assets.Search;
			} else presenceData.details = "Viewing Home Page";
			break;
		}
		case "comics":
		case "novels": {
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

					presenceData.details = `Reading ${document
						.querySelector<HTMLParagraphElement>("main p")
						.textContent.trim()}`;
					presenceData.state = `📖 ${document
						.querySelector<HTMLDivElement>("nav > div:nth-child(2)")
						.textContent.trim()} 🔸 ${progress}%`;
					presenceData.smallImageKey = Assets.Read;
					presenceData.buttons = [
						{
							label: `Visit ${captitalized.slice(
								captitalized.length - 1
							)} Page`,
							url: document.querySelector<HTMLAnchorElement>("h2 + div > a")
								.href,
						},
						{
							label: "Visit Chapter",
							url: href,
						},
					];
				} else {
					presenceData.details = `Viewing ${captitalized} Page`;
					presenceData.state = document.querySelector("h1").textContent;
					presenceData.smallImageKey = Assets.View;
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

			break;
		}
		case "account": {
			presenceData.details = "Managing Account Settings";
			break;
		}
		case "blog": {
			presenceData.details = "Reading a Blog Post";
			presenceData.state = document.querySelector("h1").textContent.trim();
			break;
		}
		default: {
			presenceData.details = "Browsing Reaper Scans";
			presenceData.state = document.title;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
