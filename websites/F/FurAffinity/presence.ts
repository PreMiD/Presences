const presence = new Presence({ clientId: "760624576550928455" }),
	presenceData: PresenceData = { largeImageKey: "logo-512" };

let showBrowsingArt: boolean,
	showBrowsingCategory: boolean,
	showBrowsingSubmissions: boolean,
	showBrowsingProfile: boolean,
	showCreateJournal: boolean,
	showBrowsingAccount: boolean,
	showBrowsingNotes: boolean,
	showBrowsingSearch: boolean;

const browsingTimestamp = Math.floor(Date.now() / 1000);

function checkCurrentPage() {
	if (document.location.hostname === "www.furaffinity.net") {
		if (document.location.pathname === "/")
			presenceData.details = "Viewing home page";
		else if (document.location.pathname.includes("/view/") && showBrowsingArt) {
			presenceData.details = `Viewing Art: '${
				document.querySelector(".submission-title>h2>p").textContent
			}' by ${
				document.querySelector(
					'.submission-id-sub-container a[href*="user"] strong'
				).textContent
			}`;
		} else if (
			document.location.pathname.includes("/msg/submissions") &&
			showBrowsingSubmissions
		) {
			presenceData.details = "Viewing latest submissions";
			presenceData.state = `${parseInt(
				document.querySelector(
					'.notification-container.inline[href*="submissions"]'
				).textContent
			)} Submissions`;
		} else if (
			document.location.pathname.includes("/browse") &&
			showBrowsingCategory
		) {
			const category = document.querySelector(
				"select[name=cat] option[selected]"
			).textContent;
			presenceData.details = "Browsing through FA";
			presenceData.state = `Page ${parseInt(
				document
					.querySelector(".page-number strong")
					.textContent.replace("Browse Page #", "")
			)}`;
			if (category !== "All")
				presenceData.state += ` in category "${category}"`;
		} else if (
			document.location.pathname.includes("/user/") &&
			showBrowsingProfile
		) {
			presenceData.details = "Viewing user: ";
			presenceData.state = `@${document
				.querySelector(".username h2 span")
				.textContent.replace(/~/, "")
				.trim()}`;
		} else if (
			document.location.pathname.includes("/gallery/") &&
			showBrowsingProfile
		) {
			presenceData.details = "Viewing gallery of user: ";
			presenceData.state = `@${document
				.querySelector(".username h2 span")
				.textContent.replace(/~/, "")
				.trim()}`;
		} else if (
			document.location.pathname.includes("/search/") &&
			showBrowsingSearch
		) {
			presenceData.details = `Searching for: "${document
				.querySelector(".search_string_input")
				.getAttribute("value")}"`;
			presenceData.state = `${parseInt(
				document.querySelector("#query-stats>div span:nth-child(2)").textContent
			)} results on page ${parseInt(
				document
					.querySelector(".pagination strong")
					.textContent.replace("Search Result Page #", "")
			)}`;
		} else if (
			document.location.pathname.includes("/controls/journal") &&
			showCreateJournal &&
			showBrowsingAccount
		) {
			const journalName = document
				.querySelector('form input[name*="subject"')
				.getAttribute("value");
			if (journalName === "") presenceData.details = "Creates a Journal";
			else {
				presenceData.details = "Updates a Journal";
				presenceData.state = `"${journalName}"`;
			}
		} else if (
			document.location.pathname.includes("/msg/pms/") &&
			showBrowsingNotes &&
			showBrowsingAccount
		) {
			switch (document.location.hash) {
				case "#message": {
					presenceData.details = "Reads a note";
					presenceData.state = `"${
						document.querySelector("#message h2").textContent
					}"`;
					break;
				}
				case "#MsgForm": {
					presenceData.details = "Writes a note";
					break;
				}
			}
		} else {
			presenceData.details = null;
			presenceData.state = null;
		}
	}
}
setInterval(checkCurrentPage, 1000);
presence.on("UpdateData", async () => {
	showBrowsingArt = await presence.getSetting<boolean>("browse");
	showBrowsingProfile = await presence.getSetting<boolean>("profile");
	showCreateJournal = await presence.getSetting<boolean>("journal");
	showBrowsingAccount = await presence.getSetting<boolean>("account");
	showBrowsingNotes = await presence.getSetting<boolean>("notes");
	showBrowsingSubmissions = await presence.getSetting<boolean>("submissions");
	showBrowsingSearch = await presence.getSetting<boolean>("search");
	showBrowsingCategory = await presence.getSetting<boolean>("category");
	presenceData.startTimestamp = browsingTimestamp;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
