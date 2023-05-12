/* Global variables */
const presence = new Presence({
		clientId: "650569876993343529",
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
let profile: HTMLElement, title: HTMLElement;

/* Main eventHandler */
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/XILEaPE.png",
	};
	presenceData.startTimestamp = browsingTimestamp;
	if (document.location.hostname.includes("v3rmillion.net")) {
		/* Home Page */
		if (
			document.location.pathname.includes("index.php") ||
			document.location.pathname === "/"
		) {
			profile = document.querySelector("#panel strong");
			presenceData.details = "Viewing Homepage";
			presenceData.state = `Logged in as ${profile.textContent}`;
			presenceData.smallImageKey = "twemoji-house-1024x";
		} else if (document.location.pathname.includes("showthread.php")) {
			/* Viewing Thread*/
			title = document.querySelector(".thread_title");
			presenceData.details = "Browsing Thread:";
			presenceData.state = title.textContent;
			presenceData.smallImageKey = "twemoji-paper-1024x";

			/* User is replying to thread using quick-reply box. */
			if (document.querySelector("form #message") === document.activeElement) {
				presenceData.details = "Replying to Thread:";
				presenceData.state = title.textContent;
				presenceData.smallImageKey = "twemoji-memo-1024x";
			}
		} else if (document.location.pathname.includes("forumdisplay.php")) {
			/* Viewing subforum */
			title = document.querySelector(".navigation .active");
			presenceData.details = "Viewing Forum:";
			presenceData.state = title.textContent;
			presenceData.smallImageKey = "twemoji-paper-1024x";
		} else if (document.location.pathname.includes("newreply.php")) {
			/* User is replying to thread */
			// awful dom selection and text manipulation incoming
			title = document.querySelector("form .smalltext > strong");
			presenceData.details = "Replying to Thread:";
			presenceData.state = title.textContent.substring(
				title.textContent.indexOf("thread: ") + 8
			); // Removes "Reply to thread"
			presenceData.smallImageKey = "twemoji-pencil-1024x";
		} else if (document.location.pathname.includes("member.php")) {
			/* User is viewing profile */
			profile = document.querySelector(".profile_header strong span");
			presenceData.details = "Viewing Profile:";
			presenceData.state = profile.textContent;
			presenceData.smallImageKey = "twemoji-spy-1024x";
		} else if (document.location.pathname === "/siterules.php") {
			/* Viewing rules page */
			presenceData.details = "Viewing Rules";
			delete presenceData.state;
			presenceData.smallImageKey = "twemoji-paper-1024x";
		} else if (document.location.pathname === "/usercp.php") {
			/* Editing settings */
			profile = document.querySelector("#panel strong");
			presenceData.details = "User Control Panel";
			presenceData.state = `Logged in as ${profile.textContent}`;
			presenceData.smallImageKey = "twemoji-cog-1024x";
		} else if (document.location.pathname.includes("search.php")) {
			/* Searching */
			profile = document.querySelector("#panel strong");
			presenceData.details = "Searching site";
			presenceData.state = `Logged in as ${profile.textContent}`;
		} else if (document.location.pathname.includes("pages.php")) {
			/* Other page fallback */
			const page = document.URL.substring(document.URL.indexOf(".php") + 10);
			presenceData.details = "Reading page:";
			presenceData.state = page.charAt(0).toUpperCase() + page.substring(1);
			presenceData.smallImageKey = "twemoji-paper-1024x";
		}
	}
	/* Unknown site location */
	if (!presenceData.details) {
		presence.error("Unable to determine location.");

		presence.setActivity();
	} else presence.setActivity(presenceData);
});
