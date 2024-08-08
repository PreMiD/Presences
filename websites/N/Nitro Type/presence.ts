const PREMID_DEBUG_LOGGING = false,
	presence = new Presence({
		clientId: "676560908578717702",
	});

function getNumberWithOrdinal(n: number): string {
	const s = ["th", "st", "nd", "rd"],
		v = n % 100;
	return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/N/Nitro%20Type/assets/logo.png",
	User = "https://cdn.rcd.gg/PreMiD/websites/N/Nitro%20Type/assets/0.png",
	Guest = "https://cdn.rcd.gg/PreMiD/websites/N/Nitro%20Type/assets/1.png",
	NitroCash = "https://i.imgur.com/c5wVq4i.png",
}

presence.on("UpdateData", () => {
	try {
		//log("UpdateData called")
		const { pathname } = document.location,
			loggedIn =
				!!document.querySelector(".dropdown--account") ||
				!pathname.includes("/race"),
			presenceData: PresenceData = {
				largeImageKey: Assets.Logo,
				smallImageKey: loggedIn ? Assets.User : Assets.Guest,
				smallImageText: loggedIn
					? document
							.querySelector(".dropdown--account")
							?.querySelector(".bucket-content")?.textContent
					: "Racing as a guest",
			},
			vehiclePreview = document.querySelector(".vehicle-cruise-preview");

		try {
			if (pathname === "/") presenceData.details = "On the Homepage";
			else if (pathname.startsWith("/login") || pathname.startsWith("/signup"))
				presenceData.details = "Logging in";
			else if (document.querySelector(".modal--mysterybox.is-active"))
				presenceData.details = "Opening Mystery Box";
			else if (pathname.startsWith("/garage"))
				presenceData.details = "Hanging in the Garage";
			else if (pathname.startsWith("/leagues"))
				presenceData.details = "Viewing League standings";
			else if (pathname.startsWith("/team/create"))
				presenceData.details = "Creating a team";
			else if (pathname.startsWith("/team/")) {
				presenceData.details = "Looking at Team Info";
				presenceData.state =
					document.querySelector(".card-teamTag")?.parentElement?.textContent;
			} else if (pathname.startsWith("/team"))
				presenceData.details = "Looking at Teams";
			else if (pathname.startsWith("/achievements")) {
				presenceData.details = "Browsing Achievements";
				const pName = document.querySelector(
					".has-btn--vertical .btn.is-active"
				)?.textContent;
				presenceData.state = `${pName} (${(pName === "Summary"
					? document.querySelector(".prog-points")?.textContent
					: document.querySelector(".twb")?.textContent
				)?.replace(/ /gm, "")})`;
			} else if (pathname.startsWith("/dealership"))
				presenceData.details = "Browsing the Dealership";
			else if (pathname.startsWith("/friends"))
				presenceData.details = "Viewing Friends Page";
			else if (pathname.startsWith("/leaderboards"))
				presenceData.details = "Checking the Leaderboard";
			else if (pathname.startsWith("/news")) {
				presenceData.details = "Browsing the News";
				const header = document.querySelector(".news-header");
				if (header && pathname.startsWith("/news/read")) {
					presenceData.state = header?.textContent;
					presenceData.smallImageKey = Assets.Reading;
				}
			} else if (pathname.startsWith("/profile"))
				presenceData.details = "Updating Racer Profile";
			else if (pathname.startsWith("/support"))
				presenceData.details = "Checking the Support Page";
			else if (pathname.startsWith("/racer")) {
				presenceData.details = "Viewing Racer Profiles";
				presenceData.state =
					document.querySelector(".profile-username")?.textContent;
			} else if (
				pathname.startsWith("/stats") ||
				pathname.startsWith("/racelog")
			)
				presenceData.details = "Viewing Stats";
			else if (pathname.startsWith("/race")) {
				presenceData.details = "Racing";
				presenceData.state = `${getNumberWithOrdinal(
					parseInt(
						document.querySelector(".dash-pos .tsxxl")?.textContent ?? ""
					)
				)} ${document
					.querySelector(".list--xs > li:nth-child(1) > div:nth-child(1) ")
					?.textContent?.split("\n")
					?.reverse()
					?.join("")
					?.toLowerCase()} ${`${
					document.querySelector(
						".list--xs > li:nth-child(2) > div:nth-child(1) > div:nth-child(2)"
					)?.textContent
				}acc`}`;
				if (document.querySelector(".raceLight-status"))
					presenceData.state = "Waiting for the race to start.";

				if (document.querySelector(".race-results")) {
					presenceData.state = `Finished in ${
						document.querySelector("div.raceResults-title")?.textContent
					} ${document
						.querySelector(
							".gridTable-row.is-self > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)"
						)
						?.textContent?.replace(/ /gm, "")
						.replace(/\n/g, " ")}`;
				}
			} else if (pathname.includes("/shop")) {
				if (vehiclePreview) {
					presenceData.details = "Viewing shop item:";
					presenceData.state = document.querySelector(
						".page-shop--modal--title"
					)?.textContent;
					presenceData.smallImageKey = Assets.NitroCash;
					presenceData.smallImageText = document.querySelector(
						".page-shop--modal--price"
					)?.textContent;
				} else {
					const shopTitle = document.querySelector<HTMLImageElement>(
						'[class*="is-selected"] > img'
					)?.alt;
					presenceData.details = shopTitle
						? "Viewing items in shop:"
						: "Viewing items in a shop";
					presenceData.state = shopTitle;
				}
			} else if (PREMID_DEBUG_LOGGING) presenceData.details = pathname;
			else presenceData.details = "Browsing";
		} catch (e) {
			presence.error(e);
		}

		if (!presenceData.details) {
			presence.error("no presence!");

			presence.setActivity();
		} else {
			//log(presenceData)
			presence.setActivity(presenceData);
		}
	} catch (e) {
		presence.error(e);
	}
});
