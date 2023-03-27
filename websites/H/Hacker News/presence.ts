const presence = new Presence({
		clientId: "1089948109225861200",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/xWtIX5I.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, search } = document.location,
		searchParams = new URLSearchParams(search);

	switch (pathname) {
		case "/":
		case "/news": {
			presenceData.details = "Browsing the main feed";
			break;
		}
		case "/newest": {
			presenceData.details = "Browsing the newest threads";
			break;
		}
		case "/threads": {
			presenceData.details = "Browsing threads by a user";
			presenceData.state = searchParams.get("id");
			break;
		}
		case "/front": {
			presenceData.details = "Browsing past threads";
			presenceData.state = document.querySelector<HTMLDivElement>(
				"#pagespace + tr div"
			).firstChild.textContent;
			break;
		}
		case "newcomments": {
			presenceData.details = "Browsing new comments";
			break;
		}
		case "ask": {
			presenceData.details = "Browsing Ask HN threads";
			break;
		}
		case "show": {
			presenceData.details = "Browsing Show HN threads";
			break;
		}
		case "jobs": {
			presenceData.details = "Browsing job threads";
			break;
		}
		case "submit": {
			presenceData.details = "Creating a new thread";
			presenceData.state =
				document.querySelector<HTMLInputElement>("[name='title']").value;
			break;
		}
		case "user": {
			presenceData.details = "Viewing a user's profile";
			presenceData.state = searchParams.get("id");
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
