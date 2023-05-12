const presence = new Presence({
		clientId: "631122124630654979",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/y9Bj4mt.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname === "/") {
		presenceData.details = "Browing Homepage";
		presenceData.state = "at Homepage";
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = "browsing";
	} else if (
		[
			"/flavors",
			"/recipes",
			"/users",
			"/contests",
			"/vendors",
			"/top100",
		].includes(document.location.pathname)
	) {
		let dstate;

		if (document.location.search !== "") {
			dstate = `searching for ${new URLSearchParams(
				document.location.search
			).get("name_like")}`;
		} else dstate = "browsing list";

		presenceData.details = `Browing ${document.location.pathname.replace(
			"/",
			""
		)} `;
		presenceData.state = dstate;
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = "browsing";
	} else if (
		[
			"/getting_started",
			"/help/how_to_mix",
			"/go_pro",
			"/help/report_recipe",
		].includes(document.location.pathname)
	) {
		presenceData.details = "Browing help ";
		presenceData.state = `on ${document.location.pathname
			.replace("/help", "")
			.split("_")
			.join(" ")
			.replace("/", "")}`;
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = "browsing";
	} else if (document.location.pathname.startsWith("/flavors/")) {
		presenceData.details = "Browing Flavors ";
		presenceData.state = `flavor: ${document.location.pathname
			.replace(/\d/, "")
			.replace(/\d/, "")
			.split("_")
			.join(" ")
			.replace("/flavors/", "")
			.split("-")
			.join(" ")
			.replace("/", "")}`;
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = "browsing";
	} else if (document.location.pathname.startsWith("/recipes/")) {
		const data = document.location.hash
			.replace(/\d/, "")
			.replace("#", "")
			.split("_by_");
		presenceData.details = `Recipe : ${data[0].split("_").join(" ")} `;
		presenceData.state = `Creator: ${data[1].split("_").join(" ")}`;
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = "browsing";
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
