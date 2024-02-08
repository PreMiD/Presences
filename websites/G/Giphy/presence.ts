const presence = new Presence({
	clientId: "630507230852022273",
});

const enum Assets {
  Browsing = "https://cdn.discordapp.com/app-assets/630507230852022273/630510627965894676.png?size=512",
  Creating = "https://cdn.discordapp.com/app-assets/630507230852022273/630511145509453865.png?size=512",
  Logo = "https://cdn.rcd.gg/PreMiD/websites/G/Giphy/assets/logo.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/G/Giphy/assets/logo.png",
	};

	if (document.location.pathname === "/") {
		presenceData.details = "Browsing Gifs...";
		presenceData.state = "at Homepage";
		presenceData.smallImageKey = Assets.Browsing;
		presenceData.smallImageText = "browsing";
	} else if (document.location.pathname.includes("create/gifmaker")) {
		presenceData.details = "Creating a Gif";
		presenceData.state = "at Creation page";
		presenceData.smallImageKey = Assets.Creating;
		presenceData.smallImageText = "creating";
	} else {
		const at = document.location.pathname;
		let doing;
		if (at.includes("entertainment")) doing = "Entertainment";
		else if (at.includes("sports")) doing = "Sports";
		else if (at.includes("stickers")) doing = "Stickers";
		else if (at.includes("artist")) doing = "Artists";
		else if (at.includes("reaction")) doing = "Reactions";

		presenceData.details = "Browsing Gifs...";
		presenceData.state = `at ${doing} page`;
		presenceData.smallImageKey = Assets.Browsing;
		presenceData.smallImageText = "browsing";
	}

	presence.setActivity(presenceData);
});
