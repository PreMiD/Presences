const presence = new Presence({
		clientId: "1017489991930232902",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/kQsG9xv.png",
			startTimestamp: browsingTimestamp,
		},
		{ hostname, pathname, search } = window.location;
	switch (hostname) {
		case "metabrainz.org": {
			presenceData.details = "Browsing...";
			switch (pathname) {
				case "/": {
					presenceData.state = "Home page";
					break;
				}
				case "/profile": {
					presenceData.details = "Viewing MetaBrainz profile";
					presenceData.state = new URLSearchParams(search).get(
						"musicbrainz_id"
					);
					break;
				}
				default: {
					presenceData.state = document.title.split(
						" - MetaBrainz Foundation"
					)[0];
				}
			}
			break;
		}
		case "blog.metabrainz.org": {
			presenceData.details = "Reading blog";
			if (pathname === "/") presenceData.state = "Home page";
			else if (pathname.startsWith("/author/")) {
				presenceData.state = `Viewing articles by ${
					pathname.match(/^\/author\/(.*?)\//)[1]
				}`;
			} else if (pathname.startsWith("/tag/")) {
				presenceData.state = `Viewing articles tagged '${
					document.querySelector<HTMLSpanElement>(".page-title > span")
						?.textContent || pathname.match(/^\/tag\/(.*?)\//)[1]
				}'`;
			} else if (pathname.startsWith("/category/")) {
				presenceData.state = `Viewing category '${
					document.querySelector<HTMLSpanElement>(".page-title > span")
						?.textContent || pathname.match(/^\/category\/(.*?)\//)[1]
				}'`;
			} else if (/^\/\d+\/(\d+\/)?$/.test(pathname)) {
				presenceData.state = `Viewing articles created in ${
					document.querySelector<HTMLSpanElement>(".page-title > span")
						.textContent
				}`;
			} else {
				presenceData.state =
					document.querySelector<HTMLHeadingElement>(
						".entry-title"
					).textContent;
			}
			break;
		}
		case "community.metabrainz.org": {
			presenceData.details = "Browsing forum";
			presenceData.largeImageKey = "https://i.imgur.com/AtrEqxF.png";
			if (pathname === "/") presenceData.state = "Home page";
			else if (pathname.startsWith("/c/") || /^\/tags\/c\/.+/.test(pathname)) {
				presenceData.state = `Viewing category '${
					document.querySelector<HTMLSpanElement>(".category-name").textContent
				}'`;
			} else if (pathname.startsWith("/t/")) {
				presenceData.state =
					document.querySelector<HTMLAnchorElement>(".fancy-title").textContent;
			} else if (/^\/g\/.+/.test(pathname)) {
				presenceData.state = `Viewing group '${
					document.querySelector<HTMLSpanElement>(".group-info-name")
						.textContent
				}'`;
			} else if (/^\/categories\/?/.test(pathname))
				presenceData.state = "Viewing categories";
			else if (pathname === "/login-preferences")
				presenceData.state = "Logging in";
			else if (pathname.startsWith("/u/")) {
				presenceData.state = `Viewing profile of ${
					document.querySelector<HTMLHeadingElement>(".username").textContent
				}`;
				presenceData.smallImageKey = document.querySelector<HTMLImageElement>(
					".user-profile-avatar > img"
				).src;
				presenceData.smallImageText =
					document.querySelector<HTMLHeadingElement>(".full-name").textContent;
			} else {
				presenceData.state = document.title.split(
					" - MetaBrainz Community Discourse"
				)[0];
			}
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
