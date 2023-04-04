const presence = new Presence({
		clientId: "647973934603567130",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
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
