const presence = new Presence({
	clientId: "699318388270301284",
});

let title: HTMLVideoElement;
const browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/kfj4PUe.png",
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname;

	if (path === "/") {
		presenceData.state = "Home";
		presenceData.details = "Browsing Thread";
		presenceData.smallImageKey = "curious";
	} else if (path.includes("/t/")) {
		title = document.querySelector("#Main > div.box > div.header > h1");
		presenceData.state = title.textContent.trim();
		presenceData.smallImageKey = "famous";

		if (
			document
				.querySelector("#reply-box")
				.classList.contains("reply-box-sticky")
		)
			presenceData.details = "Replying post";
		else presenceData.details = "Reading post";
	} else if (path.includes("/member/")) {
		title = document.querySelector("#Main > div.box h1");
		presenceData.state = title.textContent.trim();
		presenceData.details = "Viewing Profile";
		presenceData.smallImageKey = "happy";
	} else if (path.includes("/go/")) {
		title = document.querySelector("head > title");
		presenceData.state = title.textContent
			.replace("V2EX", "")
			.replace("›", "")
			.trim();
		presenceData.details = "Browsing node";
		presenceData.smallImageKey = "tongue";
	} else if (path === "/new") {
		presenceData.state = "Compose";
		presenceData.details = "New post";
		presenceData.smallImageKey = "famous_2";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
