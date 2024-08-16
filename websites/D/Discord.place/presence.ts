const presence = new Presence({
	clientId: "1273950078142255124",
});

const enum Assets {
	Logo = "https://i.imgur.com/2hIOPb0.png",
}
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Browsing",
			largeImageKey: Assets.Logo,
		},
		{ pathname } = document.location;

	switch (pathname) {
		case "/":
			presenceData.details = "Browsing";
			break;

		case "/profiles": {
			presenceData.details = "Browsing the profiles page";

			if (document.querySelector(".text-tertiary hover:underline hover:text-primary"))
				presenceData.state = "No results found";

			break;
		}
        case "/servers": {
			presenceData.details = "Browsing the servers page";

			if (document.querySelector(".text-tertiary hover:underline hover:text-primary"))
				presenceData.state = "No results found";

			break;
		}
        case "/bots": {
			presenceData.details = "Browsing the bots page";

			if (document.querySelector(".text-tertiary hover:underline hover:text-primary"))
				presenceData.state = "No results found";

			break;
		}
        case "/emojis": {
			presenceData.details = "Browsing the emojis page";

			if (document.querySelector(".text-tertiary hover:underline hover:text-primary"))
				presenceData.state = "No results found";

			break;
		}
        case "/templates": {
			presenceData.details = "Browsing the templates page";

			if (document.querySelector(".text-tertiary hover:underline hover:text-primary"))
				presenceData.state = "No results found";

			break;
		}
        case "/sounds": {
			presenceData.details = "Browsing the wounds page";

			if (document.querySelector(".text-tertiary hover:underline hover:text-primary"))
				presenceData.state = "No results found";

			break;
		}
	}

	if (pathname.startsWith("/profile/")) {
		presenceData.details = "Viewing Profile";
		presenceData.state = document.title.split("Discord.place - ")[1];

		presenceData.buttons = [
			{
				label: "View Profile",
				url: document.location.href,
			},
		];
	}

	if (pathname.startsWith("/servers/")) {
		presenceData.details = "Viewing Servers";
		presenceData.state = document.title.split("Discord.place - ")[1];

		presenceData.buttons = [
			{
				label: "View Server",
				url: document.location.href,
			},
		];
	}
    if (pathname.startsWith("/bots/")) {
		presenceData.details = "Viewing Bots";
		presenceData.state = document.title.split("Discord.place - ")[1];

		presenceData.buttons = [
			{
				label: "View Bots",
				url: document.location.href,
			},
		];
	}
    if (pathname.startsWith("/emojis/")) {
		presenceData.details = "Viewing Emojis";
		presenceData.state = document.title.split("Discord.place - ")[1];

		presenceData.buttons = [
			{
				label: "View Emoji",
				url: document.location.href,
			},
		];
	}
    if (pathname.startsWith("/emojis/packages/")) {
		presenceData.details = "Viewing Emoji Packages";
		presenceData.state = document.title.split("Discord.place - ")[1];

		presenceData.buttons = [
			{
				label: "View Emoji Package",
				url: document.location.href,
			},
		];
	}
    if (pathname.startsWith("/templates/")) {
		presenceData.details = "Viewing Templates";
		presenceData.state = document.title.split("Discord.place - ")[1];

		presenceData.buttons = [
			{
				label: "View Template",
				url: document.location.href,
			},
		];
	}

    if (pathname.startsWith("/sounds/")) {
		presenceData.details = "Viewing Sounds";
		presenceData.state = document.title.split("Discord.place - ")[1];

		presenceData.buttons = [
			{
				label: "View Sound",
				url: document.location.href,
			},
		];
	}
	presence.setActivity(presenceData);
});
