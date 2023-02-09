const presence = new Presence({
		clientId: "1073167802296438875",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/XkzTOsp.png",
		startTimestamp: browsingTimestamp,
	};

	switch (window.location.hostname) {
		case "www.g2g.com": {
			const path = document.location.pathname.split("/");
			if (document.location.pathname === "/") {
				presenceData.details = "Viewing the homepage";
				presenceData.state = "Browsing...";
				presenceData.startTimestamp = browsingTimestamp;
			} else if (document.location.pathname.includes("search")) {
				presenceData.details = "Searching something to buy";
				presenceData.state = new URLSearchParams(document.location.search).get(
					"q"
				);
				presenceData.startTimestamp = browsingTimestamp;
			} else if (document.location.pathname.includes("categories")) {
				presenceData.details = "Browsing a category";
				presenceData.state =
					document.querySelector<HTMLHeadingElement>("title").textContent;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (document.location.pathname.includes("offer")) {
				presenceData.details = "Viewing an offer";
				presenceData.state =
					document.querySelector<HTMLHeadingElement>("title").textContent;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (document.location.pathname.includes("seller")) {
				presenceData.details = "Want to sell something";
				presenceData.state = "Browsing...";
				presenceData.startTimestamp = browsingTimestamp;
			} else if (document.location.pathname.includes("chat")) {
				presenceData.details = "Chatting with a seller";
				presenceData.state =
					document.querySelector<HTMLHeadingElement>("title").textContent;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (document.location.pathname.includes("account")) {
				presenceData.details = "Viewing their account";
				presenceData.startTimestamp = browsingTimestamp;
			} else if (document.location.pathname.includes("trending")) {
				presenceData.details = "Viewing trending offers";
				presenceData.state =
					document.querySelector<HTMLBodyElement>("div.text-h4").textContent;
			} else if (document.location.pathname.includes("secure")) {
				const item: string =
					document.querySelector<HTMLBodyElement>("div.col-8.row").textContent;
				presenceData.details = `Buying ${item}`;
				presenceData.startTimestamp = browsingTimestamp;
			} else if (path[1] !== "") {
				presenceData.details = `Viewing ${path[1]}'s profile`;
				presenceData.startTimestamp = browsingTimestamp;
			}
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
