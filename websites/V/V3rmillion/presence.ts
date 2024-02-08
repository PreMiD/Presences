/* Global variables */
const presence = new Presence({
		clientId: "650569876993343529",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let profile: HTMLElement, title: HTMLElement;

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/V/V3rmillion/assets/logo.png",
  House = "https://cdn.discordapp.com/app-assets/650569876993343529/650780099838476288.png?size=512",
  Memo = "https://cdn.discordapp.com/app-assets/650569876993343529/650781077937455130.png?size=512",
  Paper = "https://cdn.discordapp.com/app-assets/650569876993343529/650781592486412309.png?size=512",
  Spy = "https://cdn.discordapp.com/app-assets/650569876993343529/650785262544224276.png?size=512",
  Cog = "https://cdn.discordapp.com/app-assets/650569876993343529/650798694366576661.png?size=512",
}

/* Main eventHandler */
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
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
			presenceData.smallImageKey = Assets.House;
		} else if (document.location.pathname.includes("showthread.php")) {
			/* Viewing Thread*/
			title = document.querySelector(".thread_title");
			presenceData.details = "Browsing Thread:";
			presenceData.state = title.textContent;
			presenceData.smallImageKey = Assets.Paper;

			/* User is replying to thread using quick-reply box. */
			if (document.querySelector("form #message") === document.activeElement) {
				presenceData.details = "Replying to Thread:";
				presenceData.state = title.textContent;
				presenceData.smallImageKey = Assets.Memo;
			}
		} else if (document.location.pathname.includes("forumdisplay.php")) {
			/* Viewing subforum */
			title = document.querySelector(".navigation .active");
			presenceData.details = "Viewing Forum:";
			presenceData.state = title.textContent;
			presenceData.smallImageKey = Assets.Paper;
		} else if (document.location.pathname.includes("newreply.php")) {
			/* User is replying to thread */
			// awful dom selection and text manipulation incoming
			title = document.querySelector("form .smalltext > strong");
			presenceData.details = "Replying to Thread:";
			presenceData.state = title.textContent.substring(
				title.textContent.indexOf("thread: ") + 8
			); // Removes "Reply to thread"
			presenceData.smallImageKey = Assets.Writing;
		} else if (document.location.pathname.includes("member.php")) {
			/* User is viewing profile */
			profile = document.querySelector(".profile_header strong span");
			presenceData.details = "Viewing Profile:";
			presenceData.state = profile.textContent;
			presenceData.smallImageKey = Assets.Spy;
		} else if (document.location.pathname === "/siterules.php") {
			/* Viewing rules page */
			presenceData.details = "Viewing Rules";
			delete presenceData.state;
			presenceData.smallImageKey = Assets.Paper;
		} else if (document.location.pathname === "/usercp.php") {
			/* Editing settings */
			profile = document.querySelector("#panel strong");
			presenceData.details = "User Control Panel";
			presenceData.state = `Logged in as ${profile.textContent}`;
			presenceData.smallImageKey = Assets.Cog;
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
			presenceData.smallImageKey = Assets.Paper;
		}
	}
	/* Unknown site location */
	if (!presenceData.details) {
		presence.error("Unable to determine location.");

		presence.setActivity();
	} else presence.setActivity(presenceData);
});
