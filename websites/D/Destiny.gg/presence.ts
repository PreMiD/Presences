const browsingTimestamp = Math.floor(Date.now() / 1000),
	presence = new Presence({
		clientId: "759921592926339072",
	});

	const enum Assets {  Logo= "https://cdn.rcd.gg/PreMiD/websites/D/Destiny.gg/assets/logo.png",
	SmallImage = "https://cdn.discordapp.com/app-assets/759921592926339072/759922832066609192.png?size=512",
  Money = "https://cdn.discordapp.com/app-assets/759921592926339072/760209604239687700.png?size=512",
  Profile = "https://cdn.discordapp.com/app-assets/759921592926339072/760211012531781632.png?size=512",
  Chat = "https://cdn.discordapp.com/app-assets/759921592926339072/765406610913755148.png?size=512",
}
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		smallImageKey: Assets.SmallImage,
		startTimestamp: browsingTimestamp,
	};

	if (
		document.location.pathname === "/" ||
		document.location.pathname === "/home/"
	)
		presenceData.details = "Viewing the homepage.";
	else if (document.location.pathname.includes("/bigscreen")) {
		presenceData.details = "Watching Destiny.";
		presenceData.smallImageKey = Assets.Play;
	} else if (document.location.pathname.includes("/donate")) {
		presenceData.details = "Donating to Destiny.";
		presenceData.smallImageKey = Assets.Money;
	} else if (document.location.pathname.includes("/subscribe")) {
		presenceData.details = "Subscribing to Destiny.";
		presenceData.smallImageKey = Assets.Money;
	} else if (document.location.pathname.includes("/profile")) {
		presenceData.details = "Editing D.gg profile.";
		presenceData.smallImageKey = Assets.Profile;
	} else if (document.location.pathname.includes("/embed/chat")) {
		presenceData.details = "Chatting";
		presenceData.smallImageKey = Assets.Chat;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
