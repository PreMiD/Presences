const presence = new Presence({
	clientId: "1224473731070689331",
});

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/E/EWAIFU/assets/logo.png",
	Home = "https://cdn.rcd.gg/PreMiD/websites/E/EWAIFU/assets/0.png",
}

const timestampCheck: {
		hash: string;
		timestamp: number;
	} = {
		hash: "",
		timestamp: Math.floor(Date.now() / 1000),
	},
	staticPages: Record<string, PresenceData> = {
		"/": {
			details: "Discovering Ewaifus",
			smallImageKey: Assets.Home,
		},
		"/login": { details: "Sign In", smallImageKey: Assets.Logo },
		"/register": { details: "Sign Up" },
		"/wallet": { details: "Wallet" },
	};

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: timestampCheck.timestamp,
	};
	const { href, pathname } = document.location,
		ewaifuName = document.querySelector(
			'[class*="text-2xl xl:text-3xl font-raleway capitalize"]'
		)?.textContent,
		avatar = document
			.querySelector(
				'[class="h-full w-full rounded-full object-cover profile-pfp img-animation"]'
			)
			.getAttribute("src"),
		hash: string = href;
	if (timestampCheck.hash !== hash) {
		timestampCheck.hash = hash;
		timestampCheck.timestamp = Math.floor(Date.now() / 1000);
	}
	switch (true) {
		case pathname.includes("/profile/"): {
			if (!ewaifuName) presenceData.details = "Loading";
			else {
				presenceData.details = `Viewing ${ewaifuName}'s profile`;

				presenceData.largeImageKey = avatar ?? Assets.Logo;

				presenceData.smallImageKey = Assets.Logo;
			}
			presenceData.buttons = [{ label: "View EWAIFU", url: href }];
			break;
		}
		default: {
			if (Object.keys(staticPages).includes(pathname))
				presenceData = { ...presenceData, ...staticPages[pathname] };
			else presenceData.details = "Unknown page";
		}
	}

	presence.setActivity(presenceData);
});
