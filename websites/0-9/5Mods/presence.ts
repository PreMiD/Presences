const presence = new Presence({
		clientId: "651412198727352331",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Logo = "https://i.imgur.com/7IjImjZ.jpg",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		[privacy, buttons, covers] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers"),
		]),
		{ href, hostname, pathname } = document.location,
		splitPath = pathname.split("/");

	if (privacy) {
		presenceData.details = "Browsing";
		return presence.setActivity(presenceData);
	}
	switch (hostname.replace("www.", "")) {
		case "forums.gta5-mods.com": {
			switch (splitPath[1]) {
				case "": {
					presenceData.details = "Viewing the forum home page";
					break;
				}
				case "category": {
					presenceData.details = "Viewing forum category";
					presenceData.state =
						document.querySelectorAll('[itemprop="title"]')[1]?.textContent;
					presenceData.buttons = [
						{
							label: "View Forum Category",
							url: href,
						},
					];
					break;
				}
				case "topic": {
					presenceData.details = "Viewing forum post about";
					presenceData.state = document
						.querySelector('[class="topic-title"]')
						?.textContent?.slice(0, 120);
					presenceData.buttons = [
						{
							label: "View Forum Post",
							url: href,
						},
					];
					break;
				}
				case "user": {
					presenceData.details = "Viewing forum user";
					presenceData.state =
						document.querySelector('[class="fullname"]')?.textContent;
					presenceData.largeImageKey =
						document
							.querySelector('[class="avatar-wrapper"]')
							?.firstElementChild.getAttribute("src") ?? Assets.Logo;
					presenceData.buttons = [
						{
							label: "View Forum User",
							url: href,
						},
					];
					break;
				}
				case "groups": {
					presenceData.details = "Viewing forum groups";
					presenceData.buttons = [
						{
							label: "View Forum Group",
							url: href,
						},
					];
					break;
				}
				case "recent":
				case "popular": {
					presenceData.details = `Viewing ${splitPath[2]} ${document
						.querySelectorAll('[itemprop="title"]')[1]
						?.textContent?.toLowerCase()} posts`;
					presenceData.buttons = [
						{
							label: "View Forum Posts",
							url: href,
						},
					];
					break;
				}
			}
			break;
		}
		case "gta5-mods.com": {
			switch (splitPath[1]) {
				case "": {
					presenceData.details = "Viewing the home page";
					break;
				}
				case "users": {
					presenceData.details = "Viewing user";
					presenceData.state =
						document.querySelector('[class="username"]')?.textContent;
					presenceData.largeImageKey =
						document
							.querySelector('[class="img-responsive"]')
							?.getAttribute("src") ?? Assets.Logo;
					presenceData.buttons = [
						{
							label: "View User",
							url: href,
						},
					];
					break;
				}
				case "login": {
					presenceData.details = "Logging in";
					break;
				}
				default: {
					if (document.querySelector('li[class*="active"]')) {
						if (
							document.querySelector('[class="btn btn-primary btn-download"]')
						) {
							presenceData.details = "Browsing mod";
							presenceData.state =
								document.querySelector(
									'[class="version"]'
								)?.parentNode?.textContent;
							presenceData.buttons = [
								{
									label: "Browse Mod",
									url: href,
								},
							];
						} else {
							presenceData.details = "Browsing category";
							presenceData.state = document.querySelector(
								'li[class*="active"]'
							)?.textContent;
							presenceData.buttons = [
								{
									label: "Browse Category",
									url: href,
								},
							];
						}
					}
					break;
				}
			}
			break;
		}
	}
	if (!covers) presenceData.largeImageKey = Assets.Logo;
	if (!buttons) delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
