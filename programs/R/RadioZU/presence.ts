const presence = new Presence({
	clientId: "959069119012028467"
}),

strings = presence.getStrings({
	play: "presence.playback.playing",
	pause: "presence.playback.paused"
});

let startTimestamp = 0;

presence.on("UpdateData", async () => {
	const path = window.location.pathname.split("/").slice(1);
	switch(path[0]) {
		case "live": {
			const isPlaying = document.getElementsByClassName("jp-state-playing")[0];
			if(!isPlaying) {
				startTimestamp = 0;
				presence.setActivity();
			} else {
				if(!startTimestamp) startTimestamp = Date.now();
				const jpTitle = document.getElementsByClassName("jp-title")[0];
				let titleName = "Unknown title";
				const title = jpTitle.getElementsByTagName("strong")[0];
				if(title) titleName = title.innerText;
				presence.setActivity({
					largeImageKey: "logo",
					smallImageKey: "live",
					smallImageText: "Live",
					details: "LIVE",
					state: titleName,
					buttons: [{label: "Play", url: "https://radiozu.ro/live"}],
					startTimestamp: startTimestamp
				});
			}
			break;
		}
		default: {
			presence.setActivity({
				largeImageKey: "logo",
				details: "Browsing homepage",
			});
		}
	}
});