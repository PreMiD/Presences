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
			presenceData.details = "Browsing the newest discussions";
			break;
		}
		case "/submitted": {
			presenceData.details = "Browsing submissions by a user";
			presenceData.state = searchParams.get("id");
			break;
		}
		case "/threads": {
			presenceData.details = "Browsing threads by a user";
			presenceData.state = searchParams.get("id");
			break;
		}
		case "/front": {
			presenceData.details = "Browsing top discussions";
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
			presenceData.details = "Browsing Ask HN discussions";
			break;
		}
		case "/show": {
			presenceData.details = "Browsing Show HN discussions";
			break;
		}
		case "/jobs": {
			presenceData.details = "Browsing job discussions";
			break;
		}
		case "/submit": {
			presenceData.details = "Creating a new discussions";
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
			presenceData.details = "Browsing second-chance discussions";
			break;
		}
		case "/invited": {
			presenceData.details = "Browsing reposted links";
			break;
		}
		case "/best": {
			presenceData.details = "Browsing best discussions";
			break;
		}
		case "/active": {
			presenceData.details = "Browsing active discussions";
			break;
		}
		case "/bestcomments": {
			presenceData.details = "Browsing best comments";
			break;
		}
		case "/asknew": {
			presenceData.details = "Browsing new Ask HN discussions";
			break;
		}
		case "/shownew": {
			presenceData.details = "Browsing new Show HN discussions";
			break;
		}
		case "/noobstories": {
			presenceData.details = "Browsing submissions by new users";
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
			presenceData.details = "Browsing 'Who Is Hiring?' discussions";
			break;
		}
		case "/launches": {
			presenceData.details = "Browsing Launch HN discussions";
			break;
		}
		case "/favorites": {
			presenceData.details = `Browsing a user's favorite ${
				searchParams.get("comments") ? "threads" : "discussions"
			}`;
			presenceData.state = searchParams.get("id");
			break;
		}
		case "/item": {
			const link = document.querySelector<HTMLAnchorElement>(".titleline a");
			presenceData.details = "Viewing a discussion";
			presenceData.state = link.textContent;
			presenceData.buttons = [{ label: "View Discussion", url: href }];
			if (document.querySelector<HTMLSpanElement>(".sitebit.comhead")) {
				presenceData.buttons.push({ label: "Read Article", url: link.href });
			}
			break;
		}
		case "/from": {
			presenceData.details = "Browsing discussions from a website";
			presenceData.state = searchParams.get("site");
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
