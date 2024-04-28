const presence = new Presence({
		clientId: "1234183805380857907",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://www.writerduet.com/script/wd-logo-square.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	};

	presenceData.details = document.title;
	presenceData.state = document.querySelector(".Mui-selected").querySelector("[data-tip]").textContent;
	presence.setActivity(presenceData);
});
