const presence = new Presence({
		clientId: "640146822257573928",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let user: HTMLElement, title: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/V/Valtox%20Gaming%20Group/assets/logo.png",
	};

	switch (document.location.hostname) {
		case "valtoxgaminggroup.com": {
			if (document.location.pathname === "/") {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "🌐 Viewing home page";
			} else if (
				document.location.pathname.includes("/profile/") ||
				document.location.pathname.includes("/user/")
			) {
				presenceData.startTimestamp = browsingTimestamp;
				user = document.querySelector(".title.m-0");
				presenceData.details = "🌐 Viewing user:";
				presenceData.state = `📰 ${user.textContent}`;
			} else if (document.location.pathname.includes("/logistics")) {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "📰 Reading about the logistics";
				presenceData.smallImageKey = Assets.Reading;
			} else if (document.location.pathname.includes("/about")) {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "📰 Reading about Valtox";
				presenceData.smallImageKey = Assets.Reading;
			} else if (document.location.pathname.includes("/fivem")) {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "🌐 Reading about";
				presenceData.state = "📰 Valtox FiveM";
				presenceData.smallImageKey = Assets.Reading;
			} else if (document.location.pathname.includes("/minecraft")) {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "🌐 Reading about";
				presenceData.state = "📰 Valtox Minecraft";
				presenceData.smallImageKey = Assets.Reading;
			}

			break;
		}
		case "vtc.valtoxgaminggroup.com": {
			if (document.location.pathname.includes("/truckinglive")) {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "🌐 Viewing Live Tracker";
				presenceData.state = "🌍 Tracking Info";
			}

			break;
		}
		case "hub.valtoxgaminggroup.com": {
			if (document.location.pathname.includes("/logbook")) {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "🌐 Viewing their logbook";
				presenceData.state = `📰 ${
					document.querySelector("#jobskm").textContent
				} ${
					document.querySelector(
						"#page-content-wrapper > div > div.row > div:nth-child(1) > div > span.count-name.white"
					).textContent
				} | ${document.querySelector("#jobscount").textContent} ${
					document.querySelector(
						"#page-content-wrapper > div > div.row > div:nth-child(2) > div > span.count-name"
					).textContent
				}`;
			} else if (document.location.pathname.includes("/downloads")) {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "🌐 Viewing the";
				presenceData.state = "📰 downloads page";
			} else if (document.location.pathname.includes("/events")) {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "🌐 Viewing the";
				presenceData.state = "📰 upcoming events";
			} else if (document.location.pathname.includes("/rules")) {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "🌐 Viewing the";
				presenceData.state = "📰 VTC rules";
			} else if (document.location.pathname.includes("/login")) {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "🌐 Logging in...";
			} else {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "🌐 Viewing their";
				presenceData.state = "📰 VTC dashboard";
			}

			break;
		}
		case "panel.valtoxgaminggroup.com": {
			if (document.location.pathname === "/") {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "🌐 Staff Panel";
				presenceData.state = "📰 Viewing panel home";
			} else if (document.location.pathname.includes("/account")) {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "🌐 Staff Panel";
				presenceData.state = "📰 Viewing their account";
			} else if (document.location.pathname.includes("/server/")) {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "🌐 Staff Panel - Editing";
				title =
					document.querySelector(".card-title") ||
					document.querySelector(
						"body > div > div.content-wrapper > section.content-header > ol > li:nth-child(2) > a"
					);
				presenceData.state = `📰 Server: ${title.textContent}`;
			}

			break;
		}
		// No default
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
