const presence = new Presence({
	clientId: "1007688410875564062",
});

presence.on("UpdateData", () => {
	let presenceData: PresenceData = {};

	if (window.location.href.toLowerCase().includes("jojowiki.com")) {
		presenceData = {
			largeImageKey: "logo_bordered",
			smallImageKey: "wiki_icon",
			smallImageText: "jojowiki.com",
		};
		presenceData.details = "Browsing JoJoWiki";

		if (
			window.location.pathname === "" ||
			window.location.pathname === "/" ||
			window.location.pathname === "/JoJo_Wiki"
		)
			presenceData.state = "Viewing homepage";
		else if (window.location.pathname.toLowerCase().includes("/index.php")) {
			const search = new URL(window.location.href).searchParams.get("search"),
				// Planning to add more actions, so it'll be used multiple times in the future.
				// eslint-disable-next-line no-one-time-vars/no-one-time-vars
				action = new URL(window.location.href).searchParams.get("action");

			if (search.length > 0) presenceData.state = `Searching "${search}"`;
			else if (action === "history") {
				let title = new URL(window.location.href).searchParams.get("title");
				title = urlToTitle(title);
				presenceData.state = `Viewing history of ${title}`;
				presenceData.buttons = [
					{
						label: "View Page",
						url: `${window.location.origin}/${titleToUrl(title)}`,
					},
				];
			}
		} else if (window.location.pathname.toLowerCase().startsWith("/user:")) {
			presenceData.state = `Viewing user ${
				window.location.pathname.match(/\/user:(.*)/i)[1]
			}`;
			presenceData.buttons = [
				{
					label: "View User",
					url: window.location.href,
				},
			];
		} else if (
			window.location.pathname.toLowerCase().startsWith("/category:")
		) {
			presenceData.state = `Viewing category ${
				window.location.pathname.match(/\/category:(.*)/i)[1]
			}`;
			presenceData.buttons = [
				{
					label: "View Category",
					url: window.location.href,
				},
			];
		} else if (window.location.pathname.toLowerCase().startsWith("/file:")) {
			presenceData.state = `Viewing file ${
				window.location.pathname.match(/\/file:(.*)/i)[1]
			}`;
			presenceData.buttons = [
				{
					label: "View File",
					url: window.location.href,
				},
			];
		} else if (
			window.location.pathname.toLowerCase().startsWith("/special:") ||
			window.location.pathname.toLowerCase().startsWith("/user_talk:") ||
			window.location.pathname.toLowerCase().startsWith("/userwiki:") ||
			window.location.pathname.toLowerCase().startsWith("/jojo_wiki:")
		) {
			// nothing here, just used to ignore these as long as no functionality is applied to them.
		} else if (
			window.location.pathname
				.toLowerCase()
				.startsWith("/list_of_references_to_jojo")
		) {
			presenceData.state = "Browsing JoJo References 👀";
			presenceData.buttons = [
				{
					label: "Join The Fun!",
					url: window.location.href,
				},
			];
		} else if (window.location.pathname.toLowerCase().startsWith("/talk:")) {
			presenceData.state = `Discussing ${document
				.querySelector("#firstHeading")
				.innerHTML.replace(/^Talk:/, "")}`;
			presenceData.buttons = [
				{
					label: "Join The Discussion!",
					url: window.location.href,
				},
			];
		} else {
			const title = urlToTitle(location.pathname.substring(1));

			if (
				new URL(window.location.href).searchParams.get("veswitched")?.length
			) {
				presenceData.state = `Editing ${title}`;
				presenceData.buttons = [
					{
						label: "View Page",
						url: `${window.location.origin}/${titleToUrl(title)}`,
					},
				];
			} else {
				presenceData.state = `Reading ${title}`;
				presenceData.buttons = [
					{
						label: "View Page",
						url: window.location.href,
					},
				];
			}
		}
	}
	if (window.location.hostname.toLowerCase().includes("jojo-news.com")) {
		presenceData = {
			largeImageKey: "logo_bordered",
			smallImageKey: "news_icon_bordered",
			smallImageText: "jojo-news.com",
		};
		presenceData.details = "Browsing News";

		if (
			window.location.pathname === "" ||
			window.location.pathname === "/" ||
			window.location.pathname === "/JoJo_Wiki"
		)
			presenceData.state = "Viewing homepage";
		else if (window.location.pathname.match(/^\/\d+\/\d+\/\d+\//)) {
			presenceData.state = `Reading ${
				document.querySelectorAll(".entry-title.entry--item.h2")[0].innerHTML
			}`;
			presenceData.buttons = [
				{
					label: "Read Article",
					url: window.location.href,
				},
			];
		} else if (window.location.pathname.toLowerCase() === "/fun/jojodle/") {
			presenceData.state = "Playing JoJodle!";
			presenceData.buttons = [
				{
					label: "Play Along!",
					url: window.location.href,
				},
			];
		} else if (window.location.pathname.toLowerCase().includes("/category")) {
			let category = window.location.pathname
				.toLowerCase()
				.match(/^\/category\/(.+)/)[1];

			category = newsUrlToCategory(category);

			presenceData.state = `Browsing category: ${category}`;
		}
	}
	presence.setActivity(presenceData);
});

function titleToUrl(title: string) {
	return title.replace(/\s/g, "_");
}
function urlToTitle(url: string) {
	return url.replaceAll("_", " ");
}
function toTitleCase(phrase: string) {
	return phrase
		.toLowerCase()
		.split(" ")
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}
function newsUrlToCategory(url: string) {
	url = url.replace(/(^\/|\/$)/g, "");
	const urlSplit = url.split("/");
	// Get last sub category in category list
	if (urlSplit.length > 1) url = urlSplit[urlSplit.length - 1];

	url = url.replaceAll("-", " ");
	url = toTitleCase(url);

	url = url.replace(/\bjojos\b/i, "JoJo's");
	url = url.replace(/^interview$/i, "Interviews");
	url = url.replace(/^exclusive$/i, "Exclusives");
	url = url.replace(/^analysis$/i, "Analyses");

	return url;
}
