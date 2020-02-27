let presence = new Presence({
	clientId: "639208971806310441",
	mediaKeys: false
});

var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {

	let presenceData = {
		largeImageKey: "logo",
		startTimestamp: browsingStamp,
		state: document.getElementById("page-title").textContent.trim()
	};

	if (document.location.hostname == "scp-int.wikidot.com") presenceData.largeImageKey = "logo-int";
	if (document.location.hostname == "scp-sandbox-3.wikidot.com") presenceData.largeImageKey = "logo-sandbox";

	if (document.location.pathname == "/" || !document.location.pathname) presenceData.state = "Main";

	presence.setActivity(presenceData);
}));
