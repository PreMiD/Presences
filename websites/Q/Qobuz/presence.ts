const presence = new Presence({
	clientId: "921861694190407730"
});

async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
			viewAlbum: "general.buttonViewAlbum",
			viewPlaylist: "general.buttonViewPlaylist"
		},
		await presence.getSetting("lang").catch(() => "en")
	);
}

let strings = getStrings(),
	oldLang: string = null;

presence.on("UpdateData", async () => {
	if (!document.querySelector("#root")) return presence.setActivity({ largeImageKey: "logo" });

	const newLang = await presence.getSetting("lang").catch(() => "en");
	oldLang ??= newLang;
	if (oldLang !== newLang) {
		oldLang = newLang;
		strings = getStrings();
	}

	const presenceData: PresenceData = {
			largeImageKey: "logo"
		},
		songTitle = document.querySelector("a.player__track-name") as HTMLAnchorElement,
		songArtist = document.querySelector('div[class="player__track-album"] > a'),
		fromPlaylist = document.querySelectorAll('div[class="player__track-album"] a')[2] !== null,
		currentTime = (document.querySelector("span.player__track-time-text") as HTMLElement).innerText.split(":"),
		endTime = (document.querySelectorAll('span[class="player__track-time-text"]')[1] as HTMLElement).innerText.split(":"),
		currentTimeSec = (parseFloat(currentTime[0]) * 60 + parseFloat(currentTime[1])) * 1000,
		endTimeSec = (parseFloat(endTime[0]) * 60 + parseFloat(endTime[1]) + 1) * 1000,
		endTimestamp = Date.now() + (endTimeSec - currentTimeSec),
		paused = document.querySelector('span[class="player__action-play pct pct-player-play "] ') !== null;

	const elm = document.querySelector(".player__action-repeat.pct");
	const obj = {
		repeatType: elm.classList.contains("pct-repeat-once")
			? "loopTrack"
			: elm.classList.contains("player__action-repeat--active")
			? "loopQueue"
			: "deactivated",
		songPlaylist: document.querySelectorAll('div[class="player__track-album"] a')[2] as HTMLAnchorElement
	};

  let playliststring = "";
	if (fromPlaylist === true)
		playliststring = ` | From: ${obj.songPlaylist.textContent}`;
	

	presenceData.details = songTitle.textContent;
	presenceData.state = songArtist.textContent + playliststring;

	if (currentTimeSec > 0 || !paused) {
		presenceData.endTimestamp = endTimestamp;
		presenceData.smallImageKey = paused ? "pause" : "play";
		presenceData.smallImageText = paused ? (await strings).pause : (await strings).play;
	}

	if (obj.repeatType !== "deactivated" && !paused) {
		presenceData.smallImageKey = obj.repeatType === "loopQueue" ? "repeat" : "repeat-one";
		presenceData.smallImageText = obj.repeatType === "loopQueue" ? "Repeat" : "Repeat Once";
        
		//delete presenceData.endTimestamp;
	}

	presenceData.buttons = [
		{
			label: (await strings).viewAlbum,
			url: songTitle.href
		}
	];
	if (fromPlaylist === true) {
        presenceData.buttons.push({
			label: (await strings).viewPlaylist,
			url: obj.songPlaylist.href
		});
    }
	presence.setActivity(presenceData);
});
