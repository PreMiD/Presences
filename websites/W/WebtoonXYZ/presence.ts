const presence = new Presence({
		clientId: "836962986451140609",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.discordapp.com/app-assets/836962986451140609/836964769042661427.png?size=512",
	View = "https://cdn.discordapp.com/app-assets/836962986451140609/836964769826996245.png?size=512",
	Logo2 = "https://cdn.discordapp.com/app-assets/836962986451140609/836971715468853260.png?size=512",
	Settings = "https://cdn.discordapp.com/app-assets/836962986451140609/837000268998508615.png?size=512",
	Solo = "https://cdn.discordapp.com/app-assets/836962986451140609/837008159934513174.png?size=512",
}

presence.on("UpdateData", async () => {
	const [logo, buttons] = await Promise.all([
			presence.getSetting<number>("logo"),
			presence.getSetting<boolean>("buttons"),
		]),
		presenceData: PresenceData = {
			largeImageKey: !logo ? Assets.Logo : Assets.Logo2,
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location;

	if (pathname === "/" && window.location.search.substr(0, 2) === "?s") {
		const urlParams = new URLSearchParams(window.location.search),
			nsfw = urlParams.get("adult");
		presenceData.details = "Searching:";
		presenceData.state = `${
			nsfw === "1" ? "nsfw" : nsfw === "0" ? "non nsfw" : urlParams.get("s")
		} 🔸 ${
			document.querySelector(".c-blog__heading > .h4").textContent.split(" ")[0]
		} results`;
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname === "/") presenceData.details = "Viewing the homepage";
	else if (pathname.endsWith("/webtoons/")) {
		presenceData.details = "Browsing all webtoons";
		presenceData.state = document.querySelector(
			".c-blog__heading > .h4"
		).textContent;
	} else if (pathname.startsWith("/webtoon-genre/")) {
		presenceData.details = `Browsing ${
			document.querySelector(".item-title").textContent
		} webtoons`;
		presenceData.state = `📋 ${
			document.querySelector(".c-blog__heading > .h4").textContent
		}`;
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname === "/completed-webtoons/") {
		presenceData.details = "Browsing:";
		presenceData.state = "Completed webtoons";
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname.startsWith("/read") && pathname.indexOf("/chapter") > 0) {
		const [title, chapter] = document
			.querySelector("#chapter-heading")
			.textContent.split("-");
		let progress =
			(document.documentElement.scrollTop /
				(document.querySelector(".reading-content").scrollHeight -
					window.innerHeight)) *
			100;
		progress = Math.ceil(progress) > 100 ? 100 : Math.ceil(progress);
		presenceData.details = title;
		presenceData.state = `📖 ${chapter} 🔸 ${progress}%`;
		presenceData.largeImageKey = title.includes("Solo Leveling")
			? Assets.Solo
			: logo === 0
			? Assets.Logo
			: Assets.Logo2;
		presenceData.smallImageKey = Assets.Reading;
		if (buttons) {
			presenceData.buttons = [
				{
					label: "Read Webtoon",
					url: window.location.href,
				},
			];
		}
	} else if (pathname.startsWith("/read")) {
		const title = document.querySelector(".post-title").textContent;
		presenceData.details = "Viewing:";
		presenceData.state = title;
		presenceData.smallImageKey = Assets.Viewing;
		presenceData.largeImageKey = title.includes("Solo Leveling")
			? Assets.Solo
			: logo === 0
			? Assets.Logo
			: Assets.Logo2;
		if (buttons) {
			presenceData.buttons = [
				{
					label: "View Webtoon",
					url: window.location.href,
				},
			];
		}
	} else if (pathname === "/user-settings/") {
		presenceData.smallImageKey = Assets.Settings;
		switch (window.location.search) {
			case "?tab=history":
				presenceData.details = "User settings:";
				presenceData.state = "History";
				break;
			case "?tab=bookmark":
				presenceData.details = "User settings:";
				presenceData.state = "Bookmarks";
				break;
			case "?tab=account-settings":
				presenceData.details = "User settings:";
				presenceData.state = "Account settings";
				break;
			default:
				presenceData.details = "User settings:";
				presenceData.state = "Bookmarks";
		}
	}
	presence.setActivity(presenceData);
});
