const presence = new Presence({
	clientId: "1051342250870853702",
}),
	elapsed = Math.floor(Date.now() / 1000),
	getElement = (query: string): HTMLElement => {
		return document.querySelector(query);
	},
	getEndTime = (): number => {
		const [h, m] = getElement(".control-end-time")
			.textContent.split(":")
			.map(x => parseInt(x));
		return Math.floor(new Date().setHours(h, m, 0, 0) / 1000);
	},
	getAssets = async ({
		coloredLogos = false,
	}): Promise<{
		logo: string;
		title: string;
		channel: string;
	}> => {
		const logo: HTMLImageElement = document.querySelector(
			"li.btn-channel.active > div.channel-image > img"
		);
		return {
			logo: coloredLogos
				? logo.src.replace("white", "color").replace("png", "jpg")
				: logo.src,
			title: getElement(".control-title").textContent.trim(),
			channel: getElement(
				"li.btn-channel.active > div.channel-data > div.name"
			).textContent.trim(),
		};
	};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		smallImageKey: "1x1",
		smallImageText: "Zapping TV",
	},
		coloredLogos: boolean = await presence.getSetting("coloredLogos"),
		splitPathname = document.location.pathname.split("/");

	switch (splitPathname[1]) {
		case "player": {
			const { logo, title, channel } = await getAssets({ coloredLogos });
			if (channel !== "" && title !== "" && logo !== "") {
				presenceData.details = `${title}`;
				presenceData.state = `En ${channel}`;
				presenceData.largeImageKey = logo;
				presenceData.endTimestamp = getEndTime();
				presence.setActivity(presenceData);
			} else presence.clearActivity();
			break;
		}

		case "dashboard": {
			presenceData.details = "En el Dashboard";
			presenceData.largeImageKey = "1x1";
			presenceData.startTimestamp = elapsed;
			presence.setActivity(presenceData);
			break;
		}

		default: {
			presence.clearActivity();
		}
	}
});
