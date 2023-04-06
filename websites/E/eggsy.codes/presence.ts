const presence = new Presence({
	clientId: "653220659887079434",
});

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
