const presence = new Presence({
		clientId: "616738921765667023",
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
let title: HTMLElement, mTitle: string, search: HTMLInputElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/NrwboRR.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location,
		[privacy, buttons, covers] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers"),
		]);
	if (!privacy) {
		if (pathname === "/") {
			search = document.querySelector("#tags");
			if (search?.value) {
				presenceData.details = "Searching for";
				presenceData.smallImageKey = Assets.Search;
				presenceData.state = search?.value;
			} else presenceData.details = "Viewing the homepage";
		} else if (pathname.includes("posts")) {
			search = document.querySelector("#tags");
			mTitle = document
				.querySelector<HTMLMetaElement>('meta[name="og:title"]')
				?.content.replace(" - e621", "");
			document.querySelector<HTMLMetaElement>('meta[name="og:title"]');
			if (pathname.includes("posts/")) {
				mTitle = document.querySelector<HTMLMetaElement>(
					'meta[property="og:title"]'
				).content;
				presenceData.details = "Viewing Post";
				presenceData.state = `Created By: ${
					mTitle.slice(0, mTitle.length - 6).split("created by")[1]
				}`;
				presenceData.buttons = [
					{
						label: "View Post",
						url: href,
					},
				];
			} else if (search?.value && search?.value !== mTitle) {
				presenceData.smallImageKey = Assets.Search;
				presenceData.buttons = [
					{
						label: "View Search",
						url: href,
					},
				];
				presenceData.details = "Searching Posts for";
				presenceData.state = search?.value;
			} else {
				presenceData.buttons = [
					{
						label: "View All Posts",
						url: href,
					},
				];
				presenceData.details = "All Posts";
				delete presenceData.state;
			}
		} else if (pathname.includes("help")) {
			presenceData.buttons = [
				{
					label: "View Help Page",
					url: href,
				},
			];
			presenceData.details = `Reading about ${
				document.querySelector("#content > div > h1")?.textContent ?? "help"
			}`;
		} else if (pathname.includes("wiki_pages")) {
			presenceData.buttons = [
				{
					label: "View Wiki",
					url: href,
				},
			];
			search = document.querySelector("#quick_search_title");
			if (search?.value) {
				presenceData.details = "Searching Wiki for";
				presenceData.smallImageKey = Assets.Search;
				presenceData.state = search.value;
			} else {
				title = document.querySelector("#wiki-page-title > a");
				presenceData.details = "Reading wiki";
				presenceData.state = title?.textContent ?? "Wiki main page";
				presenceData.smallImageKey = Assets.Reading;
			}
		} else if (pathname.includes("comments")) {
			title = document.querySelector(
				"#a-index > div.paginator > menu > li.current-page"
			);
			presenceData.details = "Comments";
			presenceData.state = `Page ${title.textContent}`;
			presenceData.buttons = [
				{
					label: "View Comment Page",
					url: href,
				},
			];
		} else if (pathname.includes("users/")) {
			if (pathname.includes("/new"))
				presenceData.details = "Registering their profile";
			else if (pathname.includes("/home"))
				presenceData.details = "Managing their profile";
			else if (pathname.includes("/edit")) {
				presenceData.details = `Changing ${
					document.querySelector('[class="active"]').textContent
				} profile settings`;
			} else {
				if (covers) {
					presenceData.largeImageKey =
						document
							.querySelector('[class="post-thumbnail-img"]')
							?.getAttribute("src") ?? "https://i.imgur.com/NrwboRR.png";
				}
				title = document.querySelector("head > title");
				presenceData.details = `Viewing ${title.textContent.slice(
					9,
					title.textContent.length - 8
				)}'s Profile`;
				presenceData.buttons = [
					{
						label: "View Profile",
						url: href,
					},
				];
			}
		} else if (pathname.includes("artists")) {
			search = document.querySelector("#search_any_name_matches");
			if (!search) search = document.querySelector("#quick_search_name");
			if (search?.value) {
				presenceData.details = "Searching Artists for";
				presenceData.state = search?.value;
			} else if (pathname.includes("artists/")) {
				title = document.querySelector("#a-show > h1 > a");
				presenceData.details = `Viewing Artist: ${title.textContent.replace(
					"(artist)",
					""
				)}`;
			} else presenceData.details = "Artists";
			presenceData.buttons = [
				{
					label: "View Artist",
					url: href,
				},
			];
		} else if (pathname.includes("tags")) {
			presenceData.buttons = [
				{
					label: "View Tags",
					url: href,
				},
			];

			search = document.querySelector("#search_name_matches");
			if (search?.value) {
				presenceData.smallImageKey = Assets.Search;
				presenceData.details = "Searching Tags for";
				presenceData.state = search?.value;
			} else if (href.includes("&search%5Border%5D=")) {
				title = document.querySelector("#search_order");
				const string = href.slice(href.length - 6, href.length);
				let sortedBy: string;
				if (string.includes("name")) sortedBy = "Name";
				else if (string.includes("count")) sortedBy = "Count";
				else if (string.includes("date")) sortedBy = "Newest";
				presenceData.details = "All Tags";
				presenceData.state = `Sorted by: ${sortedBy}`;
			} else presenceData.details = "All Tags";
		} else if (pathname.includes("blips")) {
			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Blips",
						url: href,
					},
				];
			}
			title = document.querySelector(
				"#paginator > div > menu > li.current-page > span"
			);
			presenceData.details = "Blips";
			presenceData.state = `Page ${title.textContent}`;
		} else if (pathname.includes("pools")) {
			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Pools",
						url: href,
					},
				];
			}
			search = document.querySelector("#search_name_matches");
			if (search?.value) {
				presenceData.details = "Searching Pools for";
				presenceData.smallImageKey = Assets.Search;
				presenceData.state = search?.value;
			} else presenceData.details = "Viewing pools";
		} else if (pathname.includes("post_sets"))
			presenceData.details = "Post Sets";
		else if (pathname.includes("/forum_topics")) {
			search = document.querySelector("#quick_search_body_matches");
			title = document.querySelector("#a-show > h1");
			if (search?.value) {
				presenceData.details = "Searching Forum for";
				presenceData.smallImageKey = Assets.Search;
				presenceData.state = search?.value;
			} else if (title) {
				presenceData.buttons = [
					{
						label: "View Forum Post",
						url: href,
					},
				];
				presenceData.details = "Viewing Forum Post";
				presenceData.state = title.textContent;
			} else {
				presenceData.buttons = [
					{
						label: "View All Forum Posts",
						url: href,
					},
				];
				presenceData.details = "Viewing all forum posts";
			}
		} else if (pathname.includes("site_map")) presenceData.details = "Sitemap";
		else if (pathname.includes("/dmails")) {
			search = document.querySelector('[id="quick_search_message_matches"]');
			if (search?.value) {
				presenceData.details = "Searching messages for";
				presenceData.smallImageKey = Assets.Search;
				presenceData.state = search?.value;
			} else {
				presenceData.details = `Reading ${
					document.querySelector("#a-index > h1").textContent
				}`;
				presenceData.smallImageKey = Assets.Reading;
			}
		} else if (pathname.includes("static/theme"))
			presenceData.details = "Changing settings";
	} else presenceData.details = "Browsing...";
	if (privacy || !buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
