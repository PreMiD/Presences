const presence = new Presence({
		clientId: "622436057866043434",
	}),
	presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/oSYAi8F.png",
	};

presence.on("UpdateData", async () => {
	const audio: HTMLAudioElement = document.querySelector("#jp_audio_0");
	if (audio) {
		const title: HTMLElement = document.querySelector(".brg-player-title");

		presenceData.details = title
			? (title as HTMLElement).textContent
			: "Title not found...";
		presenceData.largeImageKey = "https://i.imgur.com/oSYAi8F.png";

		if (title) presence.setActivity(presenceData, !audio.paused);
	} else {
		presence.setActivity({
			details: "Browsing..",
			largeImageKey: "https://i.imgur.com/oSYAi8F.png",
		});
	}
});
