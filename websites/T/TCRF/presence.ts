// eslint-disable-next-line no-one-time-vars/no-one-time-vars
const presence = new Presence({
		clientId: "631259475038175232",
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

let x: string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/huRGBxt.png",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.pathname === "/The_Cutting_Room_Floor") {
		presenceData.details = "browsing TCRF";
		presenceData.state = "at Homepage";
	} else if (
		["/Help:Contents", "/Category:To_do", "/Special:RecentChanges"].includes(
			document.location.pathname
		)
	) {
		const [d, d1] = document.location.pathname.replace("/", "").split(":");
		presenceData.details = `browsing ${d}`;
		presenceData.state = `at ${d1}`;
	} else if (document.location.pathname.startsWith("/Help:Contents/")) {
		const help = document.location.pathname.split("/"),
			d = help[1].split(":");
		presenceData.details = `getting ${d[0]}`;
		presenceData.state = `${d[1]}: ${help[2]
			.replace("%26", "&")
			.split("_")
			.join(" ")}`;
	} else {
		const name = document
			.querySelector("#firstHeading")
			.textContent.replace(")", "")
			.split("(");
		if (name[0].startsWith("Prerelease:")) {
			const d = name[0].split(":");
			x = `Game: ${d[1]}(${d[0]})`;
		} else x = `Game: ${name[0]}`;

		let stated;
		if (!name[1]) stated = "Platform: Multiple";
		else stated = `Platform: ${name[1]} `;

		//var year = document.getElementsByClassName("mw-headline")[1].textContent
		presenceData.details = x;
		presenceData.state = stated;
	}
});
