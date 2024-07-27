const presence = new Presence({
	clientId: "1143161714293080104",
});

const enum Assets {
	Logo = "https://i.imgur.com/QPYMT04.png",
}

async function getStrings() {
	return presence.getStrings(
		{
			paused: "general.paused",
			play: "general.playing",
			search: "general.searchFor",
			viewCategory: "general.viewCategory",
			viewHome: "general.viewHome",
			viewShow: "general.viewShow",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null,
	current: number,
	duration: number,
	paused: boolean;

presence.on(
	"iFrameData",
	(data: { current: number; duration: number; paused: boolean }) => {
		({ current, duration, paused } = data);
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		},
		[newLang] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			//presence.getSetting<boolean>("cover"),
		]),
		{ pathname } = document.location;

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}
	if (pathname === "/") presenceData.details = strings.viewHome;
	else if (pathname.startsWith("/search")) {
		presenceData.smallImageKey = Assets.Search;
		presenceData.details = `${strings.search} ${
			document.querySelector<HTMLInputElement>(".search-input > input")?.value
		}`;
	} else presenceData.details = `${current} ${duration} ${paused}`; // TO DELETE

	presence.setActivity(presenceData);
});
