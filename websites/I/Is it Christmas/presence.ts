const presence = new Presence({
		clientId: "1188891443817889822",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/I/Is%20it%20Christmas/assets/logo.png",
}

interface MyChristmasData {
	christmas: boolean;
	country: string;
}

const christmasData: { me: MyChristmasData; others: Record<string, unknown> } =
	{
		me: {
			christmas: false,
			country: "US",
		},
		others: {},
	};

async function getChristmasData() {
	const { me, others } = await presence.getPageVariable<{
		me: MyChristmasData;
		others: Record<string, unknown>;
	}>("me", "others");
	if (!me.christmas) clearInterval(interval);

	christmasData.me = me;
	christmasData.others = others;
}

// eslint-disable-next-line no-one-time-vars/no-one-time-vars
const interval = setInterval(getChristmasData, 3000);
getChristmasData();

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	};
	presenceData.details = document.querySelector<HTMLAnchorElement>("#answer");

	if (christmasData.me.christmas) {
		presenceData.state = `${
			Object.keys(christmasData.others).length + 1
		} people celebrating Christmas`;
		presenceData.smallImageKey =
			document.querySelector<HTMLImageElement>(".flag.me img")?.src ??
			Assets.Question;
		presenceData.smallImageText = christmasData.me.country;
	}

	presence.setActivity(presenceData);
});
