const presence = new Presence({
		clientId: "936630095035113522",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

async function getPostNumber() {
	// find <article></article> and get the #post- number
	let postNumber = document.querySelector("article").getAttribute("id");
	postNumber = postNumber.replace(/post-/, "");
	return postNumber;
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		details: "Viewing an unsupported page",
		state: "",
		largeImageKey:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Warrior_Cats_logo.svg/2560px-Warrior_Cats_logo.svg.png",
		startTimestamp: browsingTimestamp,
		buttons: [
			{ label: "Current Page", url: "https://www.warriorcats.com/" },
			{ label: "Warrior Cats Germany", url: "https://www.warriorcats.de/" },
		],
	};

	switch (document.location.pathname) {
		case "/": {
			presenceData.details = "Viewing";
			presenceData.state = "Warrior Cats Home";
			presenceData.largeImageKey =
				"https://www.warriorcats.de/wp-content/uploads/9783407759085-web.jpg";
			presenceData.buttons = [
				{ label: "Current Page", url: document.location.href },
				{ label: "Warrior Cats Germany", url: "https://www.warriorcats.de/" },
			];

			break;
		}
		case "/beutehaufen-uebersicht/": {
			presenceData.details = "Viewing";
			presenceData.buttons = [
				{ label: "Current Page", url: document.location.href },
				{ label: "Warrior Cats Germany", url: "https://www.warriorcats.de/" },
			];
			presenceData.state = "Warrior Cats Book Overview";
			presenceData.largeImageKey =
				"https://www.warriorcats.de/wp-content/uploads/9783407759085-web.jpg";

			break;
		}
		case "/nachrichten-vom-baumgeviert/": {
			presenceData.details = "Viewing";
			presenceData.buttons = [
				{ label: "Current Page", url: document.location.href },
				{ label: "Warrior Cats Germany", url: "https://www.warriorcats.de/" },
			];
			presenceData.state = "Warrior Cats News";
			presenceData.largeImageKey =
				"https://www.warriorcats.de/wp-content/uploads/9783407759085-web.jpg";

			break;
		}
		case "/nutzerkonto/": {
			presenceData.details = "Viewing";
			presenceData.buttons = [
				{ label: "Current Page", url: document.location.href },
				{ label: "Warrior Cats Germany", url: "https://www.warriorcats.de/" },
			];
			presenceData.state = "Warrior Cats Account";
			presenceData.largeImageKey =
				"https://www.warriorcats.de/wp-content/uploads/9783407759085-web.jpg";

			break;
		}
		case "/dein-clanlager/": {
			presenceData.details = "Viewing";
			presenceData.buttons = [
				{ label: "Current Page", url: document.location.href },
				{ label: "Warrior Cats Germany", url: "https://www.warriorcats.de/" },
			];
			presenceData.state = "Warrior Cats Clan Camp";
			presenceData.largeImageKey =
				"https://www.warriorcats.de/wp-content/uploads/9783407759085-web.jpg";

			break;
		}
		case "/deine-clankatze/": {
			presenceData.details = "Viewing";
			presenceData.buttons = [
				{ label: "Current Page", url: document.location.href },
				{ label: "Warrior Cats Germany", url: "https://www.warriorcats.de/" },
			];
			presenceData.state = "own Warrior Cats Clan Cat";
			presenceData.largeImageKey =
				"https://www.warriorcats.de/wp-content/uploads/9783407759085-web.jpg";

			break;
		}
		case "/graphic-novel/": {
			presenceData.details = "Viewing";
			presenceData.buttons = [
				{ label: "Current Page", url: document.location.href },
				{ label: "Warrior Cats Germany", url: "https://www.warriorcats.de/" },
			];
			presenceData.state = "Warrior Cats Graphic Novels";
			presenceData.largeImageKey =
				"https://www.warriorcats.de/wp-content/uploads/9783407759085-web.jpg";
			presence.setActivity(presenceData);

			break;
		}
		case "/alle-baende/": {
			presenceData.details = "Viewing";
			presenceData.buttons = [
				{ label: "Current Page", url: document.location.href },
				{ label: "Warrior Cats Germany", url: "https://www.warriorcats.de/" },
			];
			presenceData.state = "all Warrior Cats Books";
			presenceData.largeImageKey =
				"https://www.warriorcats.de/wp-content/uploads/9783407759085-web.jpg";
			presence.setActivity(presenceData);

			break;
		}
		case "/erin-hunter/": {
			presenceData.details = "Viewing";
			presenceData.buttons = [
				{ label: "Current Page", url: document.location.href },
				{ label: "Warrior Cats Germany", url: "https://www.warriorcats.de/" },
			];
			presenceData.state = "stuff about Erin Hunter";
			presenceData.largeImageKey =
				"https://www.warriorcats.de/wp-content/uploads/9783407759085-web.jpg";
			presence.setActivity(presenceData);

			break;
		}
		case "/welt-der-warrior-cats/": {
			presenceData.details = "Viewing";
			presenceData.buttons = [
				{ label: "Current Page", url: document.location.href },
				{ label: "Warrior Cats Germany", url: "https://www.warriorcats.de/" },
			];
			presenceData.state = "the Warrior Cats World";
			presenceData.largeImageKey =
				"https://www.warriorcats.de/wp-content/uploads/9783407759085-web.jpg";
			presence.setActivity(presenceData);

			break;
		}
		case "/zeitstrahl/": {
			presenceData.details = "Viewing";
			presenceData.state = "the Warrior Cats LORE";
			presenceData.buttons = [
				{ label: "Current Page", url: document.location.href },
				{ label: "Warrior Cats Germany", url: "https://www.warriorcats.de/" },
			];
			presenceData.largeImageKey =
				"https://www.warriorcats.de/wp-content/uploads/9783407759085-web.jpg";

			break;
		}
		case "/wiki/": {
			presenceData.details = "Viewing";
			presenceData.state = "the Warrior Cats Wiki";
			presenceData.buttons = [
				{ label: "Current Page", url: document.location.href },
				{ label: "Warrior Cats Germany", url: "https://www.warriorcats.de/" },
			];
			presenceData.largeImageKey =
				"https://www.warriorcats.de/wp-content/uploads/9783407759085-web.jpg";

			break;
		}
		default: {
			presenceData.details = "Viewing an unsupported page";
			presenceData.buttons = [
				{ label: "Current Page", url: document.location.href },
				{ label: "Warrior Cats Germany", url: "https://www.warriorcats.de/" },
			];
			presenceData.largeImageKey =
				"https://www.warriorcats.de/wp-content/uploads/9783407759085-web.jpg";
		}
	}

	if (document.location.pathname.startsWith("/staffel-")) {
		presenceData.details = `Viewing Staffel ${
			document.location.pathname.split("/")[1].split("-")[1]
		}`;

		presenceData.largeImageKey =
			"https://www.warriorcats.de/wp-content/uploads/9783407759085-web.jpg";
		presenceData.buttons = [
			{ label: "Current Page", url: document.location.href },
			{ label: "Warrior Cats Germany", url: "https://www.warriorcats.de/" },
		];
	}

	// https://www.warriorcats.de/beute/staffel-viii-band-2-wolken/
	// extract Staffel number and book number and book name from URL
	// like this Staffel 8 Band 2 Wolken
	// and then set the presence state to Currently Staffel 8 Band 2 Wolken

	async function getStaffelName(postNumber: string) {
		const staffelName = document.querySelector(
				`#post-${postNumber} > div > div.entry-content > div > div.wc-biblio > div.wc-staffel`
			).textContent,
			// Remove "Warrior Cats |"

			// remove Staffel

			// get staffel number from url e.g

			// for ressult3 match replacethis with result2 and replacce it with nothing
			result3 = staffelName
				.replace(/^Warrior Cats \| /, "")
				.replace(/Staffel /, "")
				.replace(
					document.location.pathname.split("/")[2].split("-")[1].toUpperCase(),
					""
				);
		// now remove everything that is not a letter or a space and trim the start and end
		return result3.replace(/[^a-zA-Z ]/g, "").trim();
	}

	// async function getStaffelNumber(postNumber: string) {
	//   let staffelNumber = document.querySelector(`#post-${postNumber} div > div.entry-content > div > div.wc-biblio > div.wc-staffel`).textContent;
	// replace everything after :
	//    staffelNumber = staffelNumber.replace(/:.*/, "");
	//     return staffelNumber;
	//  }

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
		presenceData.buttons = [
			{ label: "Current Page", url: document.location.href },
			{ label: "Warrior Cats Germany", url: "https://www.warriorcats.de/" },
		];
	}
	presence.clearActivity();
	presence.setActivity(presenceData);
});
