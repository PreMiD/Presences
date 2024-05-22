const presence = new Presence({
		clientId: "1231219953789571163",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	params = "?fit=fill&fill=solid&h=512&w=512&fm=png";

const enum Assets {
	Logo = "https://i.imgur.com/nR0RcuW.png",
}

let video = {
	currentTime: 0,
	duration: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: { currentTime: number; duration: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const [buttons, images, timestamps] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("images"),
			presence.getSetting<boolean>("timestamps"),
		]),
		presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ href, pathname, hostname } = document.location;

	if (hostname.split(".")[0] === "store")
		presenceData.details = "Browsing store";
	else if (document.querySelector("#watch-embed") && video.duration) {
		presenceData.details = document.querySelector(".series-title");
		presenceData.state = `S${
			document.querySelector("h5 > a").textContent.match(/[0-9]+/g)[0]
		} E${document.querySelector("h5 > a").textContent.match(/[0-9]+/g)[1]}${
			document.querySelector(".video-title").textContent
		}`;
		presenceData.endTimestamp = presence.getTimestamps(
			video.currentTime,
			video.duration
		)[1];
		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused ? "Paused" : "Playing";
		if (images) {
			presenceData.largeImageKey = `${
				document
					.querySelector<HTMLMetaElement>("meta[property='og:image']")
					.content.split("?")[0]
			}${params}`;
		}
		presenceData.buttons = [
			{
				label: "View Episode",
				url: href,
			},
		];
	} else if (document.querySelector(".collection-title")) {
		presenceData.details = "Viewing collection";
		presenceData.state = document.querySelector(".collection-title");
		if (images && document.querySelector(".cover-art")) {
			presenceData.largeImageKey = `${
				document
					.querySelector<HTMLImageElement>(".cover-art img")
					.src.split("?")[0]
			}${params}`;
		}

		presenceData.buttons = [
			{
				label: "View Collection",
				url: href,
			},
		];
	} else {
		switch (pathname.split("/")[1]) {
			case "browse": {
				presenceData.details = "Browsing Dropout";
				break;
			}
			case "settings": {
				presenceData.details = "Viewing account settings";
				break;
			}
			case "help": {
				presenceData.details = "Viewing knowledge base";
				break;
			}
		}
	}

	if (!timestamps) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (!buttons && presenceData.buttons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
