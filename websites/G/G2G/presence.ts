const presence = new Presence({
		clientId: "1073167802296438875",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/XkzTOsp.png",
		startTimestamp: browsingTimestamp,
	};

	switch (document.location.pathname.split("/")[1]) {
		case "search": {
			presenceData.details = "Searching something to buy";
			presenceData.state = new URLSearchParams(document.location.search).get(
				"q"
			);
			presenceData.startTimestamp = browsingTimestamp;
			break;
		}
		case "categories": {
			presenceData.details = "Browsing a category";
			presenceData.state =
				document.querySelector<HTMLHeadingElement>("title").textContent;
			presenceData.buttons = [
				{
					label: "View Category",
					url: document.location.href,
				},
			];
			presenceData.startTimestamp = browsingTimestamp;
			break;
		}
		case "offer": {
			presenceData.details = "Viewing an offer";
			presenceData.state =
				document.querySelector<HTMLHeadingElement>("title").textContent;
			presenceData.buttons = [
				{
					label: "View Offer",
					url: document.location.href,
				},
			];
			presenceData.startTimestamp = browsingTimestamp;
			break;
		}
		case "seller": {
			presenceData.details = "Want to sell something";
			presenceData.state = "Browsing...";
			presenceData.startTimestamp = browsingTimestamp;
			break;
		}
		case "chat": {
			presenceData.details = "Chatting with a sellet";
			presenceData.state = "Browsing...";
			presenceData.startTimestamp = browsingTimestamp;
			break;
		}
		case "account": {
			presenceData.details = "Viewing their account";
			presenceData.state = "Browsing...";
			presenceData.startTimestamp = browsingTimestamp;
			break;
		}
		case "trending": {
			presenceData.details = "Viewing a trending offer";
			presenceData.state =
				document.querySelector<HTMLBodyElement>("div.text-h4").textContent;
			presenceData.buttons = [
				{
					label: "View Trending",
					url: document.location.href,
				},
			];
			presenceData.startTimestamp = browsingTimestamp;
			break;
		}
		case "secure": {
			const item: string =
				document.querySelector<HTMLBodyElement>("div.col-8.row").textContent;
			presenceData.details = `Buying ${item}`;
			presenceData.startTimestamp = browsingTimestamp;
			break;
		}
		default: {
			const elem = document.location.pathname.split("/")[1];
			if (elem === "") {
				presenceData.details = "Viewing the homepage";
				presenceData.state = "Browsing...";
				presenceData.startTimestamp = browsingTimestamp;
			} else {
				presenceData.details = `Viewing ${elem}'s profile`;
				presenceData.buttons = [
					{
						label: "View Profile",
						url: document.location.href,
					},
				];
				presenceData.startTimestamp = browsingTimestamp;
			}
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
