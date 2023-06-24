const presence = new Presence({
		clientId: "1074706064609656852",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/S/Songsterr/assets/logo.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location,
		{ role } = document.querySelector("#apptab"),
		searchvar = (<HTMLInputElement>(
			document.querySelector("#sticky-list-header > div.Ccm27v > div > input")
		))?.value,
		obj: { [key: string]: string } = {
			plus: "Viewing Plans",
			mytabs: "Checking submitted tabs",
			submit: "Submitting Tabs",
			help: "Reading FAQ",
			howtoreadtab: "Learning how to read a tab",
			account: "Viewing Account Settings",
			favorites: "Viewing Favorite Tabs",
			payment: "Buying Songsterr Plus",
		};

	if (role === "complementary")
		presenceData.details = obj[pathname.split("/").at(-1)];
	else if (typeof searchvar !== "undefined")
		presenceData.details = `Searching tabs for ${searchvar}`;
	else {
		presenceData.state = `Author: ${
			document.querySelector('[aria-label="artist"]').textContent
		}`;
		presenceData.details = `Title: ${
			document.querySelector('[aria-label="title"]').textContent
		}`;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
