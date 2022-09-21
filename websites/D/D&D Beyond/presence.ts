const presence = new Presence({
		clientId: "1021922769111351379",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/Phdro5V.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = window.location,
		pathSplit = pathname.split("/").slice(1),
		pageTitle = document
			.querySelector<HTMLHeadingElement>(".page-title")
			?.textContent.trim();

	switch (pathSplit[0] ?? "") {
		case "": {
			presenceData.details = "Browsing home page";
			break;
		}
		case "account": {
			break;
		}
		case "articles": {
			break;
		}
		case "backgrounds": {
			if ((pathSplit[1] ?? "") === "") {
				presenceData.details = "Browsing list of backgrounds";
			} else {
				presenceData.details = "Viewing a background";
				presenceData.state = pageTitle;
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(".image").src;
				presenceData.buttons = [
					{
						label: "View background",
						url: href,
					},
				];
			}
			break;
		}
		case "changelog": {
			break;
		}
		case "characters": {
			break;
		}
		case "classes": {
			break;
		}
		case "equipment": {
			if ((pathSplit[1] ?? "") === "") {
				presenceData.details = "Browsing list of equipment";
			} else {
				presenceData.details = "Viewing an equipment";
				presenceData.state = pageTitle;
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(".image").src;
				presenceData.buttons = [
					{
						label: "View equipment",
						url: href,
					},
				];
			}
			break;
		}
		case "feats": {
			if ((pathSplit[1] ?? "") === "") {
				presenceData.details = "Browsing list of feats";
			} else {
				presenceData.details = "Viewing a feat";
				presenceData.state = pageTitle;
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(".image").src;
				presenceData.buttons = [
					{
						label: "View feat",
						url: href,
					},
				];
			}
			break;
		}
		case "forums": {
			break;
		}
		case "homebrew": {
			break;
		}
		case "magic-items": {
			if ((pathSplit[1] ?? "") === "") {
				presenceData.details = "Browsing list of magic items";
			} else {
				presenceData.details = "Viewing a magic item";
				presenceData.state = pageTitle;
				presenceData.smallImageKey =
					document.querySelector<HTMLImageElement>(".image").src;
				presenceData.smallImageText = document
					.querySelector<HTMLDivElement>(".item-info")
					.textContent.trim();
				presenceData.buttons = [
					{
						label: "View magic item",
						url: href,
					},
				];
			}
			break;
		}
		case "marketplace": {
			break;
		}
		case "member": {
			break;
		}
		case "monsters": {
			if ((pathSplit[1] ?? "") === "") {
				presenceData.details = "Browsing list of monsters";
			} else {
				presenceData.details = "Viewing a monster";
				presenceData.state = pageTitle;
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(".image").src;
				presenceData.buttons = [
					{
						label: "View monster",
						url: href,
					},
				];
			}
			break;
		}
		case "posts": {
			break;
		}
		case "private-messages": {
			break;
		}
		case "races": {
			if ((pathSplit[1] ?? "") === "") {
				presenceData.details = "Browsing list of races";
			} else {
				const raceTitleNodes =
					document.querySelector<HTMLHeadingElement>(
						"h1[data-text]"
					).childNodes;
				presenceData.details = "Viewing a race";
				presenceData.state = (
					raceTitleNodes.length === 5 ? raceTitleNodes[2] : raceTitleNodes[0]
				).textContent.trim();
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(".image").src;
				presenceData.buttons = [
					{
						label: "View race",
						url: href,
					},
				];
			}
			break;
		}
		case "search": {
			break;
		}
		case "sources": {
			break;
		}
		case "spells": {
			switch (pathSplit[1] ?? "") {
				case "": {
					presenceData.details = "Browsing list of spells";
					break;
				}
				case "class":
				case "school": {
					presenceData.details = "Browsing list of spells";
					presenceData.state = pageTitle;
					break;
				}
				default: {
					presenceData.details = "Viewing a spell";
					presenceData.state = pageTitle;
					presenceData.smallImageKey =
						document.querySelector<HTMLImageElement>(".spell-image").src;
					presenceData.smallImageText = `School of ${document
						.querySelector<HTMLDivElement>(
							".ddb-statblock-item-school > .ddb-statblock-item-value"
						)
						.textContent.trim()}`;
					presenceData.buttons = [
						{
							label: "View spell",
							url: href,
						},
					];
				}
			}
			break;
		}
		case "store": {
			break;
		}
		case "tag": {
			break;
		}
		case "vehicles": {
			if ((pathSplit[1] ?? "") === "") {
				presenceData.details = "Browsing list of vehicles";
			} else {
				presenceData.details = "Viewing a vehicle";
				presenceData.state = pageTitle;
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(".image").src;
				presenceData.buttons = [
					{
						label: "View vehicle",
						url: href,
					},
				];
			}
			break;
		}
		default: {
			presenceData.details = "Browsing";
			presenceData.state = document.title.match(/^(.*?)( - D&D Beyond)?$/)[1];
			break;
		}
	}

	presence.setActivity(presenceData);
});
