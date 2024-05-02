/* eslint-disable unicorn/prefer-query-selector */
/* eslint-disable camelcase */
/* eslint-disable no-one-time-vars/no-one-time-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const presence = new Presence({
		clientId: "861582205028794418",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "masuru",
	Bot = "logo",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname, href } = document.location;
	switch (hostname.replace("www.", "")) {
		case "masuru.in.th": {
			const title = document.querySelector("title").textContent;
			if (title) {
				presenceData.details = title;
				(presenceData.largeImageKey = Assets.Logo),
					// Add Button View Page
					(presenceData.buttons = [
						{
							label: "View Page",
							url: href,
						},
					]);
				presence.setActivity(presenceData);
			}
			break;
		}
		case "bot.masuru.in.th": {
			const title = document.querySelector("title").textContent;
			if (title) {
				presenceData.details = title;
				presenceData.largeImageKey = Assets.Bot;
				const pathname_ = pathname.replace("/th", "").replace("/en", "");
				switch (pathname_) {
					case "/":
						presenceData.details = `Home - ${title}`;
						break;
					case "/status":
						presenceData.details = `Status - ${title}`;
						break;
					default:
						if (pathname_.startsWith("/dashboard")) {
							presenceData.details = `Dashboard - ${title}`;
							presenceData.state = pathname_.split("/").reverse()[0];
							if (presenceData.state === "discovery") {
								const link_code = document.getElementById("link_code") as HTMLInputElement;
								presenceData.buttons = [
									{
										label: "Discovery Page",
										url: "https://masuru.in.th/discovery",
									},
								];
								if (link_code.value) {
									presenceData.state = `Link Code: ${link_code.value}`;
									presenceData.buttons[1] = {
										label: "Invite",
										url: `https://www.masuru.in.th/s/${link_code.value}`,
									};
								}
							}
						}
				}
				presence.setActivity(presenceData);
			}
			break;
		}
	}
});
