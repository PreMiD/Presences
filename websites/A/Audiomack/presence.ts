const presence = new Presence({
	clientId: "958483511310974977"
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/c0y4XDa.png"
		},
		song = document.querySelector(
			"div.player.player--wide.player--active > div > div.PlayerArtistInfo-module__container--1r4wG > p > a > span:nth-child(2)"
		).textContent,
		title = document.querySelector(
			"div.player.player--wide.player--active > div > div.PlayerArtistInfo-module__container--1r4wG > p > a > span:nth-child(1)"
		).textContent;

	if (song && title) presenceData.details = `${song} - ${title}`;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.clearActivity();
});
