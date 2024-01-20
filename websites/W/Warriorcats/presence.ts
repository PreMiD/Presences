const presence = new Presence({
		clientId: "936630095035113522",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

async function getPostNumber() {
	return document
		.querySelector("article")
		.getAttribute("id")
		.replace(/post-/, "");
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		details: "Stöbert auf der Warrior Cats Seite",
		largeImageKey: "https://i.imgur.com/Ij2BuGr.jpg",
		startTimestamp: browsingTimestamp,
		buttons: [{ label: "Current Page", url: document.location.href }],
	};

	switch (document.location.pathname) {
		case "/": {
			delete presenceData.buttons;
			presenceData.details = "Auf der Startseite";
			break;
		}
		case "/beutehaufen-uebersicht/": {
			presenceData.details = "Beutehaufen Übersicht";
			break;
		}
		case "/nachrichten-vom-baumgeviert/": {
			presenceData.details = "lesen der Nachrichten";

			break;
		}
		case "/nutzerkonto/": {
			delete presenceData.buttons;
			presenceData.details = "im Nutzerkonto";
			break;
		}
		case "/dein-clanlager/": {
			delete presenceData.buttons;
			presenceData.details = "im  Clan Camp";
			break;
		}
		case "/deine-clankatze/": {
			delete presenceData.buttons;
			presenceData.details = "mit der eigenen Katze";
			break;
		}
		case "/graphic-novel/": {
			presenceData.details = "in den Graphic Novels";
			break;
		}
		case "/alle-baende/": {
			presenceData.details = "Liste aller Bände";
			break;
		}
		case "/erin-hunter/": {
			presenceData.details = "Erin Hunter Seite";

			break;
		}
		case "/welt-der-warrior-cats/": {
			presenceData.details = "Welt der Warrior Cats";
			break;
		}
		case "/zeitstrahl/": {
			presenceData.details = "Lore der Warrior Cats";
			break;
		}
		case "/wiki/": {
			presenceData.details = "Stoebert im Wiki";
			break;
		}
		default:
			{
				presenceData.details = "unbekannte Seite";
			}

			if (document.location.pathname.startsWith("/staffel-")) {
				presenceData.details = `Staffel ${
					document.location.pathname.split("/")[1].split("-")[1]
				}`;
			}
	}

	async function getStaffelName(postNumber: string) {
		const staffelName = document.querySelector(
				`#post-${postNumber} > div > div.entry-content > div > div.wc-biblio > div.wc-staffel`
			).textContent,
			result3 = staffelName
				.replace(/^Warrior Cats \| /, "")
				.replace(/Staffel /, "")
				.replace(
					document.location.pathname.split("/")[2].split("-")[1].toUpperCase(),
					""
				);
		return result3.replace(/[^a-zA-Z ]/g, "").trim();
	}

	async function getBuchName(postNumber: string) {
		let buchName = document.querySelector(
			`#post-${postNumber} > div > div.entry-content > div > div.wc-biblio > div.wc-band`
		).textContent;
		// remove everything before :
		buchName = buchName.replace(/.*:/, "");
		return buchName;
	}

	async function getBuchImage(postNumber: string) {
		const buchImage = document
			.querySelector(
				`#post-${postNumber} > div > div.entry-content > div > div.wc-article-thumbnail > a > img`
			)
			.getAttribute("src");
		return buchImage;
	}

	if (
		document.location.pathname.startsWith("/beute/staffel-") ||
		document.location.pathname.startsWith("/beute/")
	) {
		const postNumber = await getPostNumber(),
			staffelName = await getStaffelName(postNumber),
			buchName = await getBuchName(postNumber),
			buchImage = await getBuchImage(postNumber);

		presenceData.state = `Viewing ${buchName}`;
		presenceData.details = `${staffelName}`;
		presenceData.largeImageKey = buchImage;
	}
	presence.setActivity(presenceData);
});
