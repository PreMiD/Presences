const presence = new Presence({
		clientId: "1017866651053596795",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

/**
 * Applies state and detail changes to presenceData based on the type of action being carried out.
 *
 * @param presenceData
 * @param path The subpath for the item
 * @param type The item's type name
 */
function applySubPathState(
	presenceData: PresenceData,
	path = "",
	type: string
) {
	const n = /^[aiueo]/i.test(type) ? "n" : "";
	switch (path) {
		case "": {
			presenceData.details = `Viewing a${n} ${type}`;
			presenceData.state = document.querySelector("h1").textContent;
			presenceData.buttons = [
				{
					label: `View ${type}`,
					url: window.location.href,
				},
			];
			break;
		}
		case "create": {
			presenceData.details = `Creating a${n} ${type}`;
			presenceData.state =
				document.querySelector<HTMLInputElement>(".card-body input").value;
			break;
		}
		case "edit": {
			presenceData.details = `Editing a${n} ${type}`;
			presenceData.state =
				document.querySelector<HTMLInputElement>(".card-body input").value;
			break;
		}
		case "revisions": {
			presenceData.details = `Viewing revisions for a${n} ${type}`;
			presenceData.state =
				document.querySelector<HTMLAnchorElement>("h3 a").lastChild.textContent;
			break;
		}
		case "delete": {
			presenceData.details = `Deleting a${n} ${type}`;
			presenceData.state =
				document.querySelector<HTMLHeadingElement>(
					".card-body h4"
				).childNodes[7].textContent;
			break;
		}
	}
}

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/ja94dWW.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = window.location,
		pathSplit = pathname.split("/").slice(1);

	switch (pathSplit[0]) {
		case "": {
			presenceData.details = "Browsing homepage";
			break;
		}
		case "author":
		case "collection":
		case "edition":
		case "edition-group":
		case "publisher":
		case "series":
		case "work": {
			if (pathSplit[1] === "create")
				applySubPathState(presenceData, pathSplit[1], pathSplit[0]);
			else applySubPathState(presenceData, pathSplit[2], pathSplit[0]);
			break;
		}
		case "editor": {
			if (pathSplit[1] === "edit")
				presenceData.details = "Editing their profile";
			else {
				const username = document.querySelector("h1").textContent;
				switch (pathSplit[2] ?? "") {
					case "": {
						presenceData.details = "Viewing profile";
						presenceData.state = username;
						break;
					}
					case "revisions": {
						presenceData.details = `Viewing ${username}'s revisions`;
						break;
					}
					case "achievements": {
						presenceData.details = `Viewing ${username}'s achievements`;
						break;
					}
					case "collections": {
						presenceData.details = `Viewing ${username}'s collections`;
						break;
					}
				}
			}
			break;
		}
		case "help": {
			presenceData.details = "Reading help page";
			break;
		}
		case "revisions": {
			presenceData.details = "Browsing revisions";
			break;
		}
		case "revision": {
			presenceData.details = "Viewing a revision";
			presenceData.state = `#${
				document.querySelector<HTMLHeadingElement>("h1").lastChild.textContent
			}`;
			break;
		}
		default: {
			presenceData.details = "Browsing";
			presenceData.state =
				document.querySelector("h1")?.textContent ??
				document.title.match(/^(.*?)(?: \u2013 BookBrainz)?$/)[1];
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
