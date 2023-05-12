class WeTV extends Presence {
	constructor(options: PresenceOptions) {
		super(options);
	}

	getTitle() {
		// eslint-disable-next-line no-one-time-vars/no-one-time-vars
		const JSONData: {
			"@graph": {
				name: string;
			}[];
		} = JSON.parse(
			document.querySelector('[type="application/ld+json"]').textContent
		);

		return JSONData["@graph"][0].name;
	}

	getMovieTitle() {
		return document.querySelector(".play-relevant__link").getAttribute("title");
	}

	getEpisodeTitle() {
		const Element = document.querySelector(
			".play-relevant__item.play-relevant__item--selected"
		);

		if (Element) return Element.children[2].textContent;
	}

	getEpisodeNumber() {
		return document
			.querySelector(".play-video__item.play-video__item--selected")
			?.textContent.match(/[1-9][0-9]?[0-9]?/)[0];
	}

	isMovie() {
		return this.getTitle() === this.getMovieTitle();
	}

	isClip() {
		return this.getTitle() !== this.getEpisodeTitle();
	}
}

const presence = new WeTV({
	clientId: "840271335183351902",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		details: "Browsing...",
		largeImageKey: "https://i.imgur.com/Cjnky1h.png",
		smallImageKey: "browse",
	};

	if (document.location.pathname.includes("/play/")) {
		const video = document.querySelector("video");

		if (video) {
			presenceData.details = presence.getTitle();
			presenceData.endTimestamp = presence.getTimestampsfromMedia(video).pop();

			presenceData.smallImageKey = video.paused ? "pause" : "play";
			presenceData.smallImageText = video.paused ? "Paused" : "Playing";

			if (video.paused) delete presenceData.endTimestamp;

			if (presence.isMovie()) {
				presenceData.state = "Movie";

				if (presence.isClip()) presenceData.state = "Clip";
			} else if (presence.getEpisodeNumber())
				presenceData.state = `Episode ${presence.getEpisodeNumber()}`;
			else presenceData.state = presence.getEpisodeTitle();
		} else {
			presenceData.details = "Viewing:";
			presenceData.state = presence.getTitle();
		}
	} else if (document.location.pathname.endsWith("/search")) {
		presenceData.details = "Searching for:";
		presenceData.state = document.querySelector("input").value;
	}

	presence.setActivity(presenceData);
});
