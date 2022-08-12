const presence = new Presence({
	clientId: "1007688410875564062",
});

presence.on("UpdateData", () => {
	let presenceData: PresenceData = {};

	if (window.location.href.toLowerCase().includes("jojowiki.com")) {
		presenceData = {
			largeImageKey: "logo_bordered",
			smallImageKey: "wiki_icon",
			smallImageText: "jojowiki.com"
		};
		presenceData.details = "Browsing JoJoWiki";

		if (window.location.pathname === "" || window.location.pathname === "/" || window.location.pathname === "/JoJo_Wiki") {
			presenceData.state = "Viewing homepage";
		} else if (window.location.pathname.toLowerCase().includes("/index.php")) {
			let search = (new URL(window.location.href)).searchParams.get("search")
			let action = (new URL(window.location.href)).searchParams.get("action")

			if (search.length > 0) {
				presenceData.state = `Searching "${search}"`;
			} else if (action === "history") {
				let title = (new URL(window.location.href)).searchParams.get("title")
				title = urlToTitle(title);
				presenceData.state = `Viewing history of ${title}`;
				presenceData.buttons = [
					{
						label: "View Page",
						url: window.location.origin + "/" + titleToUrl(title)
					}
				]
			}
		} else if (window.location.pathname.toLowerCase().startsWith("/user:")) {
			let user = window.location.pathname.match(/\/user:(.*)/i)[1];
			presenceData.state = `Viewing user ${user}`;
			presenceData.buttons = [
				{
					label: "View User",
					url: window.location.href
				}
			]
		} else if (window.location.pathname.toLowerCase().startsWith("/category:")) {
			let category = window.location.pathname.match(/\/category:(.*)/i)[1];
			presenceData.state = `Viewing category ${category}`;
			presenceData.buttons = [
				{
					label: "View Category",
					url: window.location.href
				}
			]
		} else if (window.location.pathname.toLowerCase().startsWith("/file:")) {
			let file = window.location.pathname.match(/\/file:(.*)/i)[1];
			presenceData.state = `Viewing file ${file}`;
			presenceData.buttons = [
				{
					label: "View File",
					url: window.location.href
				}
			]
		} else if (
			window.location.pathname.toLowerCase().startsWith("/special:") ||
			window.location.pathname.toLowerCase().startsWith("/user_talk:") ||
			window.location.pathname.toLowerCase().startsWith("/userwiki:") ||
			window.location.pathname.toLowerCase().startsWith("/jojo_wiki:")
		) { } else if (window.location.pathname.toLowerCase().startsWith("/list_of_references_to_jojo")) {
			presenceData.state = "Browsing JoJo References 👀";
			presenceData.buttons = [
				{
					label: "Join The Fun!",
					url: window.location.href
				}
			]
		} else if (window.location.pathname.toLowerCase().startsWith("/talk:")) {
			let title = document.getElementById("firstHeading").innerHTML.replace(/^Talk:/, "")

			presenceData.state = "Discussing " + title;
			presenceData.buttons = [
				{
					label: "Join The Discussion!",
					url: window.location.href
				}
			]
		} else {
			let editing = !!(new URL(window.location.href)).searchParams.get("veswitched")?.length
			let title = urlToTitle(location.pathname.substring(1))

			if (editing) {
				presenceData.state = "Editing " + title;
				presenceData.buttons = [
					{
						label: "View Page",
						url: window.location.origin + "/" + titleToUrl(title)
					}
				]
			} else {
				presenceData.state = "Reading " + title;
				presenceData.buttons = [
					{
						label: "View Page",
						url: window.location.href
					}
				]
			}
		}
	}
	if (window.location.hostname.toLowerCase().includes("jojo-news.com")) {
		presenceData = {
			largeImageKey: "logo_bordered",
			smallImageKey: "news_icon_bordered",
			smallImageText: "jojo-news.com"
		};
		presenceData.details = "Browsing News";

		if (window.location.pathname === "" || window.location.pathname === "/" || window.location.pathname === "/JoJo_Wiki") {
			presenceData.state = "Viewing homepage";
		} else if (window.location.pathname.match(/^\/\d+\/\d+\/\d+\//)) {
			let title = document.getElementsByClassName("entry-title entry--item h2")[0].innerHTML
			presenceData.state = "Reading " + title;
			presenceData.buttons = [
				{
					label: "Read Article",
					url: window.location.href
				}
			]
		}
	}
	presence.setActivity(presenceData);
});


function titleToUrl(title: string) {
	return title.replace(/\s/g, "_");
}
function urlToTitle(url: string) {
	return url.replace(/_/g, " ");
}