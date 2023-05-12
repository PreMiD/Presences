const presence = new Presence({
		clientId: "811965557184135179",
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
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/nIZ0XtN.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, hostname } = document.location,
		buttons = await presence.getSetting<boolean>("buttons");
	switch (hostname) {
		case "www.mediafire.com":
			if (pathname === "/") presenceData.details = "Viewing the home page";
			else if (document.querySelector("#content > h2")?.textContent) {
				presenceData.details =
					document.querySelector("#content > h2").textContent;
			} else if (pathname.includes("/file/")) {
				presenceData.details = document.querySelector(
					"body > main > div.content > div.center > div > div.dl-info > div.sidebar > div.apps > div > div"
				).textContent;
			} else if (pathname === "/software/mobile")
				presenceData.details = "Mediafire Mobile Apps";
			else if (pathname === "/about") {
				presenceData.details = document.querySelector(
					"#titlebar > div > h1"
				).textContent;
			} else if (pathname.includes("/about/jobs")) {
				presenceData.details = document.querySelector(
					"#jobs_pics_section > div.opener > h2"
				).textContent;
			} else if (pathname.includes("/advertising/")) {
				presenceData.details = document.querySelector(
					"#adInquiryWrap > h2"
				).textContent;
			} else if (pathname === "/press") {
				presenceData.details = document.querySelector(
					"#content > h2.h2.mb-4"
				).textContent;
			} else if (pathname.includes("/policies/")) {
				presenceData.details = document.querySelector(
					"#content > div > div > h1 > strong"
				).textContent;
			} else if (pathname.includes("/policy_violation/")) {
				presenceData.details = document.querySelector(
					"#content > h2:nth-child(1)"
				)?.textContent;
			} else if (pathname.includes("/help/")) presenceData.details = "Help";
			else if (pathname.includes("/login/"))
				presenceData.details = "Logging in";
			else if (pathname.includes("/upgrade/"))
				presenceData.details = "Upgrade Plans";
			else if (pathname.includes("myaccount")) {
				presenceData.details = `${document
					.querySelector("[class~='current']")
					.textContent.trim()} Settings`;
			}

			if (pathname !== "/") {
				presenceData.buttons = [
					{
						label: "Open Mediafire",
						url: href,
					},
				];
			}
			break;
		case "app.mediafire.com":
			if (pathname.includes("/myfiles"))
				presenceData.details = "Viewing their files";
			else if (pathname.includes("/recent"))
				presenceData.details = "Viewing their Recent Files";
			else if (pathname.includes("/following"))
				presenceData.details = "Viewing files shared with them";
			else if (pathname.includes("/trash"))
				presenceData.details = "Viewing their Trashcan";
			else presenceData.details = "Viewing their files";

			presenceData.buttons = [
				{
					label: "Open Mediafire App",
					url: href,
				},
			];
			break;
		case "www.mediafire.zendesk.com":
			if (pathname.includes("/articles/")) {
				presenceData.details = "Viewing Help Article About:";
				presenceData.state = document.querySelector(
					"body > main > article > header > h1"
				).textContent;
			} else {
				const search = document.querySelector<HTMLInputElement>("#query");
				if (!search.textContent) {
					presenceData.details = "Helpdesk searching for:";
					presenceData.state = search.value;
					presenceData.smallImageKey = Assets.Search;
				} else presenceData.details = "Checking out the helpdesk";
			}
			presenceData.buttons = [
				{
					label: "Open Mediafire Helpdesk",
					url: href,
				},
			];
			break;
		case "blog.mediafire.com":
			if (pathname === "/") {
				presenceData.details = "Viewing Blog Post About:";
				presenceData.state = document.querySelector(
					"#fl-post-3434 > header > h2 > a"
				).textContent;
			}
			presenceData.buttons = [
				{
					label: "Open Mediafire Blog",
					url: href,
				},
			];
			break;
	}

	if (!buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
