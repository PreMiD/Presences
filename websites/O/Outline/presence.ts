const presence = new Presence({
	clientId: "715602476249776239",
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

let currentURL = new URL(document.location.href),
	currentPath = currentURL.pathname.replace(/^\/|\/$/g, "").split("/");
const browsingTimestamp = Math.floor(Date.now() / 1000);
let presenceData: PresenceData = {
	details: "Viewing an unsupported page",
	largeImageKey: "https://i.imgur.com/Mvhpsh0.png",
	startTimestamp: browsingTimestamp,
};
const updateCallback = {
		_function: null as () => void,
		get function(): () => void {
			return this._function;
		},
		set function(parameter) {
			this._function = parameter;
		},
		get present(): boolean {
			return this._function !== null;
		},
	},
	/**
	 * Initialize/reset presenceData.
	 */
	resetData = (
		defaultData: PresenceData = {
			details: "Viewing an unsupported page",
			largeImageKey: "https://i.imgur.com/Mvhpsh0.png",
			startTimestamp: browsingTimestamp,
		}
	): void => {
		currentURL = new URL(document.location.href);
		currentPath = currentURL.pathname.replace(/^\/|\/$/g, "").split("/");
		presenceData = { ...defaultData };
	};

((): void => {
	if (document.querySelector("outline-not-found"))
		presenceData.details = "On a non-existent page";
	else {
		switch (currentPath[0]) {
			case "terms.html": {
				presenceData.details = "Reading the terms";
				break;
			}
			case "privacy.html": {
				presenceData.details = "Reading the privacy policy";
				break;
			}
			case "dmca.html": {
				presenceData.details = "Reading the DMCA page";
				break;
			}
			case "report.html": {
				presenceData.details = "Reporting an article";
				break;
			}
			default: {
				let loadedPath: string,
					forceUpdate = false,
					presenceDataPlaced: PresenceData = {};
				updateCallback.function = (): void => {
					if (loadedPath !== currentURL.pathname || forceUpdate) {
						loadedPath = currentURL.pathname;
						try {
							if (document.querySelector("outline-not-found"))
								presenceData.details = "On a non-existent page";
							else if (currentPath[0] === "")
								presenceData.details = "On the home page";
							else {
								presenceData.details = document.querySelector("h1").textContent;
								[presenceData.state] = document
									.querySelector(".publication")
									.textContent.trim()
									.split(" ›");
							}
						} catch (error) {
							forceUpdate = true;
							resetData();
							presenceData.details = "Loading...";
						}
						presenceDataPlaced = presenceData;
						forceUpdate = false;
					} else presenceData = presenceDataPlaced;
				};
			}
		}
	}
})();

if (updateCallback.present) {
	const defaultData = { ...presenceData };
	presence.on("UpdateData", async () => {
		resetData(defaultData);
		updateCallback.function();
		presence.setActivity(presenceData);
	});
} else {
	presence.on("UpdateData", async () => {
		presence.setActivity(presenceData);
	});
}
