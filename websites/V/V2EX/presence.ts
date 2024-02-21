const presence = new Presence({
	clientId: "699318388270301284",
});

let title: HTMLVideoElement;
const browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/V/V2EX/assets/logo.png",
	Famous = "https://cdn.rcd.gg/PreMiD/websites/V/V2EX/assets/0.png",
	Tongue = "https://cdn.rcd.gg/PreMiD/websites/V/V2EX/assets/1.png",
	Happy = "https://cdn.rcd.gg/PreMiD/websites/V/V2EX/assets/2.png",
	Curious = "https://cdn.rcd.gg/PreMiD/websites/V/V2EX/assets/3.png",
	Famous2 = "https://cdn.rcd.gg/PreMiD/websites/V/V2EX/assets/4.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname;

	if (path === "/") {
		presenceData.state = "Home";
		presenceData.details = "Browsing Thread";
		presenceData.smallImageKey = Assets.Curious;
	} else if (path.includes("/t/")) {
		title = document.querySelector("#Main > div.box > div.header > h1");
		presenceData.state = title.textContent.trim();
		presenceData.smallImageKey = Assets.Famous;

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
		presenceData.smallImageKey = Assets.Happy;
	} else if (path.includes("/go/")) {
		title = document.querySelector("head > title");
		presenceData.state = title.textContent
			.replace("V2EX", "")
			.replace("›", "")
			.trim();
		presenceData.details = "Browsing node";
		presenceData.smallImageKey = Assets.Tongue;
	} else if (path === "/new") {
		presenceData.state = "Compose";
		presenceData.details = "New post";
		presenceData.smallImageKey = Assets.Famous2;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
