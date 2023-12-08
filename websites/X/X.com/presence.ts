enum PresenceClients {
	X = "802958757909889054",
	Twitter = "1172850898624581652",
}

let presence = new Presence({
		clientId: PresenceClients.X,
	}),
	twitterCheck: boolean;

const presences: Record<string, Presence> = {
		[PresenceClients.X]: presence,
	},
	capitalize = (text: string): string => {
		return text
			.replace(/[[{(_)}\]]/g, " ")
			.split(" ")
			.map(str => {
				return str.charAt(0).toUpperCase() + str.slice(1);
			})
			.join(" ");
	};

function setClient(clientId: PresenceClients) {
	if (Number(presence.getExtensionVersion()) < 224) {
		//Extensions below this version, don't support this feature.
		presence.hideSetting("twitter");
		return;
	}
	presence.clearActivity();
	if (presences[clientId]) {
		presence = presences[clientId];
		presence.setActivity();
	} else {
		presence = new Presence({
			clientId: clientId,
		});
		presences[clientId] = presence;
	}
}

function stripText(element: HTMLElement, id = "None", log = true): string {
	if (element && element.firstChild) return element.firstChild.textContent;
	else {
		if (log) {
			presence.error(
				`An error occurred while stripping data off the page. Please contact Bas950 on the PreMiD Discord server, and send him a screenshot of this error. ID: ${id}`
			);
		}
		return null;
	}
}

presence.info(
	"When using the X presence for PreMiD, make sure you have the latest UI update. Twitter classic and any legacy versions before it will not work with this presence."
);

let oldUrl: string, elapsed: number;

async function getStrings() {
	return presence.getStrings(
		{
			readPost: "x.readPost",
			viewDms: "x.viewDms",
			viewPosts: "x.viewPosts",
			viewPostsWithReplies: "x.viewPostsWithReplies",
			viewMedia: "x.viewMedia",
			viewLiked: "x.viewLiked",
			viewList: "x.viewList",
			bookmarks: "x.bookmarks",
			notifs: "x.notifs",
			explore: "x.explore",
			settings: "x.settings",
			terms: "general.terms",
			privacy: "general.privacy",
			browsing: "general.browsing",
			search: "general.searchFor",
			searchSomething: "general.searchSomething",
			viewing: "general.viewing",
			profile: "general.viewProfile",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	//* Update strings if user selected another language.
	const newLang = await presence.getSetting<string>("lang").catch(() => "en"),
		privacy = await presence.getSetting<boolean>("privacy"),
		time = await presence.getSetting<boolean>("time"),
		twitter = await presence.getSetting<boolean>("twitter");

	if (!twitterCheck || twitterCheck !== twitter) {
		twitterCheck = twitter;
		setClient(PresenceClients.X);
	} else setClient(PresenceClients.Twitter);

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	let title: string, info: string;

	const path = window.location.pathname;

	if (oldUrl !== window.location.href) {
		oldUrl = window.location.href;
		elapsed = Math.floor(Date.now() / 1000);
	}

	title = strings.browsing;
	info = capitalize(path.split("/")[1]);

	if (path.match("/i/")) {
		info = capitalize(path.split("/")[2]);
		if (info === "Bookmarks") info = strings.bookmarks;
	}

	if (path.match("/notifications")) info = strings.notifs;

	if (path.match("/explore")) info = strings.explore;

	if (path.match("/tos")) info = strings.terms;

	if (path.match("/privacy")) info = strings.privacy;

	if (path.match("/settings/")) info = strings.settings;

	if (path.match("/search")) {
		if (privacy) {
			title = strings.searchSomething;
			info = null;
		} else {
			title = strings.search;
			info = document.querySelector("input").textContent;
		}
	}

	const objHeader = document.querySelector(
		`a[href='/${document.location.pathname.split("/")[1]}/header_photo']`
	)?.parentElement.children[1]?.children[1] as HTMLElement;

	if (objHeader) {
		title = strings.viewPosts;
		info = `${
			stripText(objHeader, "Object Header").split("@")[0]
		} // ${capitalize(path.split("/")[1])}`;

		if (path.match("/with_replies")) title = strings.viewPostsWithReplies;

		if (path.match("/media")) title = strings.viewMedia;

		if (path.match("/likes")) title = strings.viewLiked;
	}

	if (!objHeader && path.match("/status/")) {
		title = strings.readPost;
		[info] = stripText(
			document.querySelectorAll(
				`a[href='/${path.split("/")[1]}']`
			)[1] as HTMLElement,
			"Post"
		).split("@");
	}

	if (path.match("/messages") && objHeader) {
		title = strings.viewDms;
		info = stripText(objHeader, "Object Header");
		if (privacy) info = null;
	}

	const etcHeader: HTMLElement = Array.from(
		document.querySelectorAll("h2")
	).find(c => c.parentElement.children[1]?.textContent.includes("@"));

	if (path.match("/moments") && etcHeader) {
		title = "Browsing Moments...";
		info = capitalize(path.split("/")[1]);
	}

	if (path.match("/lists") && etcHeader) {
		title = strings.viewList;
		info = capitalize(path.split("/")[1]);
	}

	const presenceData: PresenceData = {
		details: title,
		state: info,
		largeImageKey: !twitter
			? "https://cdn.rcd.gg/PreMiD/websites/X/X.com/assets/0.png"
			: "https://cdn.rcd.gg/PreMiD/websites/X/X.com/assets/1.png",
	};

	if (time) presenceData.startTimestamp = elapsed;

	presence.setActivity(presenceData, true);
});
