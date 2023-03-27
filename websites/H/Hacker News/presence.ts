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
			presenceData.details = "Browsing top threads";
			presenceData.state = document.querySelector<HTMLDivElement>(
				"#pagespace + tr div"
			).firstChild.textContent;
			break;
		}
		case "/newcomments": {
			presenceData.details = "Browsing new comments";
			break;
		}
		case "/ask": {
			presenceData.details = "Browsing Ask HN threads";
			break;
		}
		case "/show": {
			presenceData.details = "Browsing Show HN threads";
			break;
		}
		case "/jobs": {
			presenceData.details = "Browsing job threads";
			break;
		}
		case "/submit": {
			presenceData.details = "Creating a new thread";
			presenceData.state =
				document.querySelector<HTMLInputElement>("[name='title']").value;
			break;
		}
		case "/user": {
			presenceData.details = "Viewing a user's profile";
			presenceData.state = searchParams.get("id");
			break;
		}
		case "/pool": {
			presenceData.details = "Browsing second-chance threads";
			break;
		}
		case "/invited": {
			presenceData.details = "Browsing reposted threads";
			break;
		}
		case "/best": {
			presenceData.details = "Browsing best threads";
			break;
		}
		case "/active": {
			presenceData.details = "Browsing active threads";
			break;
		}
		case "/bestcomments": {
			presenceData.details = "Browsing best comments";
			break;
		}
		case "/asknew": {
			presenceData.details = "Browsing new Ask HN threads";
			break;
		}
		case "/shownew": {
			presenceData.details = "Browsing new Show HN threads";
			break;
		}
		case "/noobstories": {
			presenceData.details = "Browsing threads by new users";
			break;
		}
		case "/noobcomments": {
			presenceData.details = "Browsing comments by new users";
			break;
		}
		case "/leaders": {
			presenceData.details = "Browsing top users";
			break;
		}
		case "/whoishiring": {
			presenceData.details = "Browsing 'Who Is Hiring?' threads";
			break;
		}
		case "/launches": {
			presenceData.details = "Browsing Launch HN threads";
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
