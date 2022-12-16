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
	getChannelData = async ({
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
enum Assets {
	ZappingLogo = "https://i.imgur.com/5gyFfcd.png",
	ZappingSleep = "https://i.imgur.com/gWBjy43.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		smallImageText: "Zapping TV",
		largeImageKey: Assets.ZappingLogo,
		startTimestamp: elapsed,
	},
		coloredLogos: boolean = await presence.getSetting("coloredLogos"),
		{ pathname } = document.location;

	switch (pathname.split("/")[1]) {
		case "player": {
			const { logo, title, channel } = await getChannelData({ coloredLogos });
			if (channel && title && logo) {
				presenceData.details = `${title}`;
				presenceData.state = `En ${channel}`;
				presenceData.largeImageKey = logo;
				presenceData.smallImageKey = Assets.ZappingLogo;
				presenceData.endTimestamp = getEndTime();
			}
			break;
		}

		case "dashboard": {
			presenceData.details = "En el Dashboard";
			presenceData.smallImageKey = Assets.ZappingSleep;
			presenceData.smallImageText = "AFK";
			break;
		}

		case "login": {
			presenceData.details = "Iniciando sesión";
			break;
		}

		case "": {
			presenceData.details = "En la página principal";
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
