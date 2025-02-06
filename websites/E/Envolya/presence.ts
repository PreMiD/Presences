const presence = new Presence({
		clientId: "1334576902081351761",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	adressedToTable: { [key: string]: string } = {}; // Table to store AdressedTo by letter ID

function isModalOpen(): boolean {
	return !!document.querySelector("#modalCreateLetter");
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/WCHQje8.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname.includes("/letters")) {
		const currentLetterValueElement = document.querySelector(
				"#currentLetterValue"
			),
			maxLetterValueElement = document.querySelector("#maxLetterValue"),
			letterCount = `${
				currentLetterValueElement ? currentLetterValueElement.textContent : "0"
			}/${maxLetterValueElement ? maxLetterValueElement.textContent : "5"}`;
		presenceData.state = `Viewing letters${
			letterCount ? ` (${letterCount})` : ""
		}`;

		if (isModalOpen()) presenceData.state = "Creating a new letter";
	} else if (document.location.pathname.includes("/letter/")) {
		const letterTitle = document.querySelector(
			"#letterEditPageTitle"
		)?.textContent;
		presenceData.state = `Writing a letter${
			letterTitle ? `: “${letterTitle}”` : ""
		}`;
		presenceData.smallImageKey = Assets.Writing;

		if (isModalOpen()) presenceData.state = "Creating a new letter";
	} else if (document.location.pathname.includes("/l/")) {
		const letterId = document.location.pathname.split("/l/")[1],
			letterAuthor = document.title
				.split(" - ")[1]
				?.split(" sent you a letter!")[0],
			AdressedToElement = document.querySelector("#letterAdressedTo"),
			AdressedTo = AdressedToElement
				? AdressedToElement.textContent
				: adressedToTable[letterId];
		presenceData.smallImageKey = Assets.Reading;

		if (AdressedToElement)
			adressedToTable[letterId] = AdressedToElement.textContent || "";

		if (letterAuthor && AdressedTo)
			presenceData.state = `Reading a letter from ${letterAuthor}: “${AdressedTo}”`;
		else if (letterAuthor)
			presenceData.state = `Reading a letter from ${letterAuthor}`;
		else if (AdressedTo)
			presenceData.state = `Reading a letter: “For: ${AdressedTo}”`;
		else presenceData.state = "Reading a letter";
	} else if (document.location.pathname === "/")
		presenceData.state = "Viewing the homepage";
	else if (document.location.pathname.includes("/register"))
		presenceData.state = "Registering";
	else if (document.location.pathname.includes("/login"))
		presenceData.state = "Logging in";
	else if (document.location.pathname.includes("/upgrade"))
		presenceData.state = "Buying prenium";
	else if (document.location.pathname.includes("/settings"))
		presenceData.state = "Account settings";

	if (presenceData.state) presence.setActivity(presenceData);
});
