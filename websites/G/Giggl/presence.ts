const presence = new Presence({
		clientId: "876239113307709493",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

async function getStrings() {
	return presence.getStrings(
		{
			home: "general.viewHome",
			user: "general.viewUser",
			call: "general.inCall",
			reading: "general.readingAbout",
			browsing: "general.browsing",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/G/Giggl/assets/logo.jpg",
		},
		privacy = await presence.getSetting<boolean>("privacy"),
		newLang = await presence.getSetting<string>("lang").catch(() => "en"),
		timestamps = await presence.getSetting<boolean>("time");

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	switch (document.location.hostname) {
		case "giggl.app": {
			switch (document.location.pathname) {
				case "/":
					presenceData.details = (await strings).home;
					break;
				case "/jobs":
					presenceData.details = `${(await strings).reading} Jobs`;
					break;
				case "/isp":
					presenceData.details = `${(await strings).reading} Giggl Networking`;
					break;
			}

			break;
		}
		case "canary.giggl.app": {
			presenceData.details = (await strings).browsing;

			if (document.location.pathname.startsWith("/portal")) {
				presenceData.details = "In a Portal";
				[presenceData.state] = document
					.querySelector("title")
					.textContent.split(" • ");
			} else if (document.querySelector("svg.feather.feather-phone-missed")) {
				presenceData.smallImageKey = Assets.Call;
				presenceData.smallImageText = (await strings).call;
			} else if (document.querySelector(".feather.feather-map-pin")) {
				presenceData.details = (await strings).user;
				presenceData.state = document.querySelector("p").textContent;
			}

			break;
		}
		case "status.giggl.app":
			{
				presenceData.details = "Viewing the status page";
				// No default
			}
			break;
	}

	if (privacy) delete presenceData.state;
	if (timestamps) presenceData.startTimestamp = browsingTimestamp;

	presence.setActivity(presenceData);
});
