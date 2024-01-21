const presence = new Presence({
		clientId: "1195258708368822312",
	}),
	getStrings = async () => {
		return presence.getStrings(
			{
				play: "general.playing",
				pause: "general.paused",
				upload: "youtube.upload",
			},
			await presence.getSetting<string>("lang").catch(() => "en")
		);
	},
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/QIxjVEX.png",
}

let data,
	audioTimestamps,
	audioElement,
	strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		newLang = await presence.getSetting<string>("ID").catch(() => "en");

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	switch (document.location.pathname) {
		case "/upload": {
			presenceData.details = "Uploading an audio";
			presenceData.smallImageKey = Assets.Uploading;
			presenceData.smallImageText = strings.upload;
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
						presenceData.smallImageText = strings.pause;
					} else {
						presenceData.smallImageKey = Assets.Play;
						presenceData.smallImageText = strings.play;
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
