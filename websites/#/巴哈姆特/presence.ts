const presence = new Presence({
		clientId: "647973934603567130",
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
let title: HTMLElement | Element | string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/k5XqKom.png",
	};

	if (document.location.hostname === "forum.gamer.com.tw") {
		if (document.location.pathname === "/") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing home page";
		} else if (document.querySelector(".BH-menu")) {
			if (document.location.pathname.includes("A.php")) {
				title = document
					.querySelector("div.BH-menu > ul.BH-menuE > li > a[title]")
					.getAttribute("title");
				presenceData.details = title;
				presenceData.state = "首頁";
				presence.setActivity(presenceData);
				presenceData.smallImageKey = "reading";
			}
			if (document.location.pathname.includes("B.php")) {
				title = document
					.querySelector("div.BH-menu > ul.BH-menuE > li > a[title]")
					.getAttribute("title");
				presenceData.details = title as string;
				presenceData.state = "列表";
				presence.setActivity(presenceData);
				presenceData.smallImageKey = "reading";
			}
			if (document.location.pathname.includes("C.php")) {
				title = document
					.querySelector("div.BH-menu > ul.BH-menuE > li > a[title]")
					.getAttribute("title");
				presenceData.details = title;
				presenceData.state = document.querySelectorAll(
					".c-post__header__title"
				)[0].textContent;
				presence.setActivity(presenceData);
				presenceData.smallImageKey = "reading";
			}
		}
	}
	if (!presenceData.details) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing site:";
		presenceData.state = "巴哈姆特";
		presence.setActivity(presenceData);
	} else presence.setActivity(presenceData);
});
