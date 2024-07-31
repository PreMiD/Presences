const PREMID_DEBUG_LOGGING = true,
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
}

presence.on("UpdateData", () => {
	try {
		//log("UpdateData called")
		const loggedIn = !!document.querySelector(".dropdown--account span"),
			presenceData: PresenceData = {
				largeImageKey: Assets.Logo,
				smallImageKey: loggedIn ? Assets.User : Assets.Guest,
				smallImageText: loggedIn
					? document.querySelector(".dropdown--account span").textContent
					: "Racing as a guest",
			},
			path = location.pathname;
		try {
			if (path === "/") presenceData.details = "On the Homepage";
			else if (path.startsWith("/login") || path.startsWith("/signup"))
				presenceData.details = "Logging in";
			else if (document.querySelector(".modal--mysterybox.is-active"))
				presenceData.details = "Opening Mystery Box";
			else if (path.startsWith("/garage"))
				presenceData.details = "Hanging in the Garage";
			else if (path.startsWith("/leagues"))
				presenceData.details = "Viewing League standings";
			else if (path.startsWith("/team/create"))
				presenceData.details = "Creating a team";
			else if (path.startsWith("/team/")) {
				presenceData.details = "Looking at Team Info";
				presenceData.state =
					document.querySelector(".card-teamTag").parentElement.textContent;
			} else if (path.startsWith("/team"))
				presenceData.details = "Looking at Teams";
			else if (path.startsWith("/achievements")) {
				presenceData.details = "Browsing Achievements";
				const pName = document.querySelector(
					".has-btn--vertical .btn.is-active"
				).textContent;
				presenceData.state = `${pName} (${(pName === "Summary"
					? document.querySelector(".prog-points").textContent
					: document.querySelector(".twb").textContent
				).replaceAll(" ", "")})`;
			} else if (path.startsWith("/dealership"))
				presenceData.details = "Browsing the Dealership";
			else if (path.startsWith("/friends"))
				presenceData.details = "Viewing Friends Page";
			else if (path.startsWith("/leaderboards"))
				presenceData.details = "Checking the Leaderboard";
			else if (path.startsWith("/news")) {
				presenceData.details = "Browsing the News";
				const header = document.querySelector(".news-header");
				if (header && path.startsWith("/news/read"))
					presenceData.state = header.textContent;
			} else if (path.startsWith("/profile"))
				presenceData.details = "Updating Racer Profile";
			else if (path.startsWith("/support"))
				presenceData.details = "Checking the Support Page";
			else if (path.startsWith("/racer")) {
				presenceData.details = "Viewing Racer Profiles";
				presenceData.state =
					document.querySelector(".profile-username").textContent;
			} else if (path.startsWith("/stats") || path.startsWith("/racelog"))
				presenceData.details = "Viewing Stats";
			else if (path.startsWith("/race")) {
				presenceData.details = "Racing";
				presenceData.state = `${getNumberWithOrdinal(
					parseInt(document.querySelector(".dash-pos .tsxxl").textContent)
				)} ${document
					.querySelector(".list--xs > li:nth-child(1) > div:nth-child(1) ")
					.textContent.split("\n")
					.reverse()
					.join("")
					.toLowerCase()} ${`${
					document.querySelector(
						".list--xs > li:nth-child(2) > div:nth-child(1) > div:nth-child(2)"
					).textContent
				}acc`}`;
				if (document.querySelector(".raceLight-status"))
					presenceData.state = "Waiting for the race to start.";

				if (document.querySelector(".race-results")) {
					presenceData.state = `Finished in ${
						document.querySelector("div.raceResults-title").textContent
					} ${document
						.querySelector(
							".gridTable-row.is-self > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)"
						)
						.textContent.replaceAll(" ", "")
						.replace(/\n/g, " ")}`;
				}
			} else if (PREMID_DEBUG_LOGGING) presenceData.details = path;
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
