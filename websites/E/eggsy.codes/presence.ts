const presence = new Presence({
	clientId: "653220659887079434",
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
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	if (document.location.pathname !== "/projects/premid/custom-status") {
		const details = document.querySelector("[name~=premid-details][content]")
				? document.querySelector<HTMLMetaElement>(
						"[name~=premid-details][content]"
				  ).content
				: null,
			state = document.querySelector("[name~=premid-state][content]")
				? document.querySelector<HTMLMetaElement>(
						"[name~=premid-state][content]"
				  ).content
				: null,
			smallImage = document.querySelector("[name~=premid-smallImage][content]")
				? document.querySelector<HTMLMetaElement>(
						"[name~=premid-smallImage][content]"
				  ).content
				: null;

		if (state && details) {
			presence.setActivity({
				largeImageKey: "https://i.imgur.com/MziDVWO.png",
				details,
				state,
				smallImageKey: smallImage ?? "SOMETHING-SKETCHY",
				startTimestamp: Math.floor(Date.now() / 1000),
			});
		} else {
			presence.setActivity({
				largeImageKey: "https://i.imgur.com/MziDVWO.png",
				details: "Viewing a page:",
				state: "Homepage",
				startTimestamp: Math.floor(Date.now() / 1000),
			});
		}
	}
});
