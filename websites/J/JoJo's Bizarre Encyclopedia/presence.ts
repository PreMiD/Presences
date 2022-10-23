const presence = new Presence({
	clientId: "1007688410875564062",
});

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {};

	const showButtons = await presence.getSetting("showButtons"),
		url = new URL(window.location.href);

	if (url.hostname === "jojowiki.com") {
		presenceData = {
			largeImageKey: "https://i.imgur.com/iBLgETb.png",
			smallImageKey: "https://i.imgur.com/h5EZ0JB.png",
			smallImageText: "jojowiki.com",
		};
		presenceData.details = "Browsing JoJoWiki";

		if (
			window.location.pathname === "" ||
			window.location.pathname === "/" ||
			window.location.pathname === "/JoJo_Wiki" ||
			(window.location.pathname === "/index.php" &&
				!url.searchParams.get("action"))
		)
			presenceData.state = "Viewing homepage";
		else if (window.location.pathname.toLowerCase().includes("/index.php")) {
			const search = url.searchParams.get("search"),
				action = url.searchParams.get("action");

			let title;
			if (url.searchParams.get("title"))
				title = urlToTitle(url.searchParams.get("title"));
			else title = "Homepage";

			if (search?.length > 0) presenceData.state = `Searching "${search}"`;
			else if (action === "history") {
				presenceData.state = `Viewing history: ${title}`;
				if (showButtons) {
					presenceData.buttons = [
						{
							label: "View Page",
							url: `${window.location.origin}/${titleToUrl(title)}`,
						},
					];
				}
			} else if (action === "purge") {
				presenceData.state = `Purging: ${title}`;
				if (showButtons) {
					presenceData.buttons = [
						{
							label: "View Page",
							url: `${window.location.origin}/${titleToUrl(title)}`,
						},
					];
				}
			}
		} else if (window.location.pathname.toLowerCase().startsWith("/user:")) {
			presenceData.state = `Viewing User: ${
				window.location.pathname.match(/\/user:(.*)/i)[1]
			}`;
			if (showButtons) {
				presenceData.buttons = [
					{
						label: "View User",
						url: window.location.href,
					},
				];
			}
		} else if (
			window.location.pathname.toLowerCase().startsWith("/category:")
		) {
			presenceData.state = `Viewing Category: ${urlToTitle(
				window.location.pathname.match(/\/category:(.*)/i)[1]
			)}`;
			if (showButtons) {
				presenceData.buttons = [
					{
						label: "View Category",
						url: window.location.href,
					},
				];
			}
		} else if (window.location.pathname.toLowerCase().startsWith("/file:")) {
			presenceData.state = `Viewing File: ${
				window.location.pathname.match(/\/file:(.*)/i)[1]
			}`;
			if (showButtons) {
				presenceData.buttons = [
					{
						label: "View File",
						url: window.location.href,
					},
				];
			}
		} else if (window.location.pathname.toLowerCase().startsWith("/special:")) {
			if (
				window.location.pathname.toLowerCase().startsWith("/special:movepage/")
			) {
				const title = urlToTitle(window.location.pathname.substring(18));
				presenceData.state = `Moving: ${title}`;
				if (showButtons) {
					presenceData.buttons = [
						{
							label: "View Page",
							url: `${window.location.origin}/${titleToUrl(title)}`,
						},
					];
				}
			} else if (
				window.location.pathname
					.toLowerCase()
					.startsWith("/special:notifications")
			)
				presenceData.state = "Checking Notifications";
			else if (
				window.location.pathname
					.toLowerCase()
					.startsWith("/special:preferences")
			)
				presenceData.state = "Viewing Settings";
		} else if (
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
			if (showButtons) {
				presenceData.buttons = [
					{
						label: "Join The Fun!",
						url: window.location.href,
					},
				];
			}
		} else if (window.location.pathname.toLowerCase().startsWith("/talk:")) {
			presenceData.state = `Discussing: ${document
				.querySelector("#firstHeading")
				.innerHTML.replace(/^Talk:/, "")}`;
			if (showButtons) {
				presenceData.buttons = [
					{
						label: "Join The Discussion!",
						url: window.location.href,
					},
				];
			}
		} else {
			const title = urlToTitle(location.pathname.substring(1));

			if (
				url.searchParams.get("veswitched")?.length ||
				url.searchParams.get("veaction") === "edit"
			) {
				presenceData.state = `Editing: ${title}`;
				if (showButtons) {
					presenceData.buttons = [
						{
							label: "View Page",
							url: `${window.location.origin}/${titleToUrl(title)}`,
						},
					];
				}
			} else {
				presenceData.state = `Reading: ${title}`;
				if (showButtons) {
					presenceData.buttons = [
						{
							label: "View Page",
							url: window.location.href,
						},
					];
				}
			}
		}
	}
	if (url.hostname === "jojo-news.com") {
		presenceData = {
			largeImageKey: "https://i.imgur.com/iBLgETb.png",
			smallImageKey: "https://i.imgur.com/lLWbSBd.png",
			smallImageText: "jojo-news.com",
		};
		presenceData.details = "Browsing News";

		if (
			window.location.pathname === "" ||
			window.location.pathname === "/" ||
			window.location.pathname === "/JoJo_Wiki"
		)
			presenceData.state = "Viewing: Homepage";
		else if (window.location.pathname.match(/^\/\d+\/\d+\/\d+\//)) {
			presenceData.state = `Reading ${
				document.querySelectorAll(".entry-title.entry--item.h2")[0].innerHTML
			}`;
			if (showButtons) {
				presenceData.buttons = [
					{
						label: "Read Article",
						url: window.location.href,
					},
				];
			}
		} else if (window.location.pathname.toLowerCase() === "/fun/jojodle/") {
			presenceData.state = "Playing JoJodle!";
			if (showButtons) {
				presenceData.buttons = [
					{
						label: "Play Along!",
						url: window.location.href,
					},
				];
			}
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
	return encodeURI(title.replace(/\s/g, "_"));
}
function urlToTitle(url: string) {
	return decodeURI(url.replaceAll("_", " "));
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
