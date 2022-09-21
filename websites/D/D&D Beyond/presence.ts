const presence = new Presence({
		clientId: "1021922769111351379",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/Phdro5V.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, search } = window.location,
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
			presenceData.details = "Managing preferences";
			presenceData.state = pageTitle;
			break;
		}
		case "backgrounds": {
			if (pathSplit[1]) {
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
			} else {
				presenceData.details = "Browsing list of backgrounds";
			}
			break;
		}
		case "changelog": {
			if (pathSplit[1]) {
				presenceData.details = "Reading a changelog";
				presenceData.state = pageTitle;
			} else {
				presenceData.details = "Browsing the changelog";
			}
			break;
		}
		case "characters": {
			break;
		}
		case "classes": {
			if (pathSplit[1]) {
				presenceData.details = "Viewing a class";
				presenceData.state = pageTitle;
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(".image").src;
				presenceData.buttons = [
					{
						label: "View class",
						url: href,
					},
				];
			} else {
				presenceData.details = "Browsing list of classes";
			}
			break;
		}
		case "encounter-builder": {
			break;
		}
		case "equipment": {
			if (pathSplit[1]) {
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
			} else {
				presenceData.details = "Browsing list of equipment";
			}
			break;
		}
		case "feats": {
			if (pathSplit[1]) {
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
			} else {
				presenceData.details = "Browsing list of feats";
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
			if (pathSplit[1]) {
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
			} else {
				presenceData.details = "Browsing list of magic items";
			}
			break;
		}
		case "marketplace": {
			if (pathSplit[1] === "redeem-key") {
				presenceData.details = "Redeeming a product key";
			} else if (
				pathSplit[1] === "cart" ||
				pathSplit[1] === "address" ||
				pathSplit[1] === "checkout"
			) {
				presenceData.details = "Purchasing materials";
			} else if (!pathSplit[1]) {
				presenceData.details = "Browsing marketplace";
			} else {
				presenceData.details = "Browsing marketplace";
				presenceData.state = pageTitle;
			}
			break;
		}
		case "member": {
			if (pathSplit[1]) {
				const username = (presenceData.state = document
					.querySelector<HTMLLIElement>(".username")
					.textContent.trim());
				presenceData.details = "Viewing a member's profile";
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(".user-avatar img").src;
				if (pathSplit[2] === "posts") {
					presenceData.state = `${username}'s posts`;
				} else {
					presenceData.state = username;
				}
			} else {
				presenceData.details = "Viewing list of members";
			}
			break;
		}
		case "monsters": {
			if (pathSplit[1]) {
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
			} else {
				presenceData.details = "Browsing list of monsters";
			}
			break;
		}
		case "my-encounters": {
			presenceData.details = "Browsing their encounters";
			break;
		}
		case "posts": {
			if (pathSplit[1]) {
				presenceData.details = "Reading a post";
				presenceData.state = pageTitle;
			} else {
				presenceData.details = "Browsing posts";
			}
			break;
		}
		case "private-messages": {
			if (pathSplit[1] === "send") {
				presenceData.details = "Writing a direct message";
			} else {
				presenceData.details = "Viewing direct messages";
			}
			break;
		}
		case "races": {
			if (pathSplit[1]) {
				presenceData.details = "Viewing a race";
				presenceData.state = pageTitle;
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(".image").src;
				presenceData.buttons = [
					{
						label: "View race",
						url: href,
					},
				];
			} else {
				presenceData.details = "Browsing list of races";
			}
			break;
		}
		case "search": {
			presenceData.details = "Searching";
			presenceData.state = new URLSearchParams(search).get("q");
			break;
		}
		case "sources": {
			if (pathSplit[1]) {
				if (pathSplit[2]) {
					presenceData.details = "Viewing a section of a source";
					presenceData.state = document.querySelector<HTMLHeadingElement>(
						".p-article-content > h1"
					).textContent;
					presenceData.buttons = [
						{
							label: "Read section",
							url: href,
						},
					];
				} else {
					presenceData.details = "Viewing table of contents for source";
					presenceData.state = pageTitle;
					presenceData.buttons = [
						{
							label: "View source",
							url: href,
						},
					];
				}
			} else {
				presenceData.details = "Browsing list of sources";
			}
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
		case "tag": {
			presenceData.details = `Browsing posts tagged '${pageTitle}'`;
			break;
		}
		case "vehicles": {
			if (pathSplit[1]) {
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
			} else {
				presenceData.details = "Browsing list of vehicles";
			}
			break;
		}
		default: {
			presenceData.details = "Browsing";
			presenceData.state =
				pageTitle ?? document.title.match(/^(.*?)( - D&D Beyond)?$/)[1];
			break;
		}
	}

	presence.setActivity(presenceData);
});
