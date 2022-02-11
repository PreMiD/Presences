const presence = new Presence({
	clientId: "616738921765667023"
});
let title: HTMLElement, mTitle: HTMLMetaElement, search: HTMLInputElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo"
		},
		path = document.location.pathname,
		[privacy, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons")
		]);
	if (!privacy) {
		if (path === "/") {
			search = document.querySelector("#tags");
			if (search.value) {
				presenceData.details = "Searching For:";
				presenceData.state = search.value;
			} else presenceData.details = "Viewing the homepage";
		} else if (path.includes("posts")) {
			search = document.querySelector("#tags");
			if (
				search.value &&
				search.value !==
					document.querySelector<HTMLInputElement>("#tags_query").value
			) {
				presenceData.details = "Searching Posts For:";
				presenceData.state = search.value;
			} else if (document.location.href.includes("/posts?tags=")) {
				mTitle = document.querySelector('meta[name="og:title"]');
				presenceData.details = "Viewing posts about:";
				presenceData.state = mTitle.content.slice(0, mTitle.content.length - 6);
			} else if (path.includes("posts/")) {
				mTitle = document.querySelector('meta[property="og:title"]');
				const split = mTitle.content
					.slice(0, mTitle.content.length - 6)
					.split("created by");
				presenceData.details = split[0];
				presenceData.state = `Created By: ${split[1]}`;
			} else {
				presenceData.details = "All Posts";
				delete presenceData.state;
			}
			if (buttons) {
				if (
					(search.value &&
						search.value !==
							document.querySelector<HTMLInputElement>("#tags_query").value) ||
					document.location.href.includes("/posts?tags=")
				) {
					presenceData.buttons = [
						{
							label: "View Search",
							url: document.location.href
						}
					];
				} else if (path.includes("posts/")) {
					presenceData.buttons = [
						{
							label: "View Post",
							url: document.location.href
						}
					];
				} else {
					presenceData.buttons = [
						{
							label: "View All Posts",
							url: document.location.href
						}
					];
				}
			}
		} else if (path.includes("comments")) {
			title = document.querySelector(
				"#a-index > div.paginator > menu > li.current-page"
			);
			presenceData.details = "Comments";
			presenceData.state = `Page ${title.textContent}`;
			if (buttons) {
				presenceData.buttons = [
					{
						label: `View Comment Page ${title.textContent}`,
						url: document.location.href
					}
				];
			}
		} else if (path.includes("users/")) {
			title = document.querySelector("head > title");
			presenceData.details = `Viewing ${title.textContent.slice(
				9,
				title.textContent.length - 8
			)}'s Profile`;
			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Profile",
						url: document.location.href
					}
				];
			}
		} else if (path.includes("artists")) {
			search = document.querySelector("#search_any_name_matches");
			if (!search) search = document.querySelector("#quick_search_name");
			if (search.value !== "") {
				presenceData.details = "Searching Artists For:";
				presenceData.state = search.value;
			} else if (path.includes("artists/")) {
				title = document.querySelector("#a-show > h1 > a");
				presenceData.details = `Viewing Artist: ${title.textContent.replace(
					"(artist)",
					""
				)}`;
			} else presenceData.details = "Artists";
			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Artist",
						url: document.location.href
					}
				];
			}
		} else if (path.includes("tags")) {
			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Tags",
						url: document.location.href
					}
				];
			}
			search = document.querySelector("#search_name_matches");
			if (search.value !== "") {
				presenceData.details = "Searching Tags For:";
				presenceData.state = search.value;
			} else if (document.location.href.includes("&search%5Border%5D=")) {
				title = document.querySelector("#search_order");
				const string = document.location.href.slice(
					document.location.href.length - 6,
					document.location.href.length
				);
				let sortedBy: string;
				if (string.includes("name")) sortedBy = "Name";
				else if (string.includes("count")) sortedBy = "Count";
				else if (string.includes("date")) sortedBy = "Newest";
				presenceData.details = "All Tags";
				presenceData.state = `Sorted by: ${sortedBy}`;
			} else presenceData.details = "All Tags";
		} else if (path.includes("blips")) {
			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Blips",
						url: document.location.href
					}
				];
			}
			title = document.querySelector(
				"#paginator > div > menu > li.current-page > span"
			);
			presenceData.details = "Blips";
			presenceData.state = `Page ${title.textContent}`;
		} else if (path.includes("pools")) {
			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Pools",
						url: document.location.href
					}
				];
			}
			search = document.querySelector("#search_name_matches");
			if (search.value !== "") {
				presenceData.details = "Searching Pools For:";
				presenceData.state = search.value;
			} else presenceData.details = "Pools";
		} else if (path.includes("post_sets")) presenceData.details = "Post Sets";
		else if (path.includes("wiki_pages")) {
			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Wiki",
						url: document.location.href
					}
				];
			}
			search = document.querySelector("#quick_search_title");
			if (search.value !== "") {
				presenceData.details = "Searching Wiki For:";
				presenceData.state = search.value;
			} else {
				title = document.querySelector("#wiki-page-title > a");
				presenceData.details = title.textContent;
			}
		} else if (path.includes("forum_topics/")) {
			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Forum Post",
						url: document.location.href
					}
				];
			}
			search = document.querySelector("#quick_search_body_matches");
			if (search.value !== "") {
				presenceData.details = "Searching Forum For:";
				presenceData.state = search.value;
			} else {
				title = document.querySelector("#a-show > h1");
				presenceData.details = "Viewing Forum Post:";
				presenceData.state = title.textContent;
			}
		} else if (path.includes("forum_topics")) presenceData.details = "Forum";
		else if (path.includes("help")) {
			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Help Page",
						url: document.location.href
					}
				];
			}
			title = document.querySelector("#content > div > h1");
			if (title) presenceData.details = title.textContent;
			else presenceData.details = "Help";
		} else if (path.includes("site_map")) presenceData.details = "Sitemap";
	} else presenceData.details = "Browsing...";
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
