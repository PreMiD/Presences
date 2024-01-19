const presence = new Presence({
		clientId: "1195258708368822312",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/QIxjVEX.png",
}

let data, audioTimestamps, audioElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	};

	switch (document.location.pathname) {
		case "/upload": {
			presenceData.details = "Uploading an audio";
			presenceData.smallImageKey = Assets.Uploading;
			break;
		}
		case "/signup": {
			presenceData.details = "Creating an account";
			break;
		}
		case "/login": {
			presenceData.details = "Logging in";
			break;
		}
		default:
			if (document.location.pathname.includes("/u/")) {
				data = document.location.pathname.split("/");
				const user = data[2];

				if (data.length === 4) {
					presenceData.details =
						document.querySelector(".jp-title").textContent;
					presenceData.state = user;
					presenceData.buttons = [
						{
							label: "Listen",
							url: `https://soundgasm.net${data.join("/")}`,
						},
						{
							label: `View ${user}'s Audios`,
							url: `https://soundgasm.net${data.slice(0, -1).join("/")}`,
						},
					];
					audioElement =
						document.querySelector<HTMLAudioElement>("#jp_audio_0");
					if (audioElement.paused) {
						presenceData.smallImageKey = Assets.Pause;
						presenceData.smallImageText = (await strings).pause;
					} else {
						presenceData.smallImageKey = Assets.Play;
						presenceData.smallImageText = (await strings).play;
						audioTimestamps = presence.getTimestampsfromMedia(audioElement);
						presenceData.startTimestamp = audioTimestamps[0];
						presenceData.endTimestamp = audioTimestamps[1];
					}
				} else {
					presenceData.details = `Browsing ${user}'s audios`;
					presenceData.buttons = [
						{
							label: `View ${user}'s Audios`,
							url: `https://soundgasm.net${data.join("/")}`,
						},
					];
				}
			}
	}

	presence.setActivity(presenceData);
});
