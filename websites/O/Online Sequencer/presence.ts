const presence = new Presence({
	clientId: "802379096122196050",
});

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
let timestart = Math.round(Date.now() / 1000),
	prevPage = "",
	currPage = "";

function refreshTime() {
	timestart = Math.round(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/E4dzY6x.png",
		startTimestamp: timestart,
	};
	if (document.querySelectorAll(".fas.fa-stop")[0]) {
		prevPage = currPage;
		currPage = "l";
		presenceData.details = "Listening to a sequence";
		presenceData.state = `Title: ${
			(document.querySelector("#title") as HTMLInputElement).value
		}`;
		presenceData.buttons = [
			{ label: "View Sequence", url: window.location.href },
			{
				label: "View Creator",
				url: document.querySelector<HTMLAnchorElement>("#titlebar div a").href,
			},
		];
	} else {
		switch (document.location.pathname) {
			case "/": {
				prevPage = currPage;
				currPage = "w";
				presenceData.details = "Writing a new sequence";
				presenceData.state = `Title: ${
					(document.querySelector("#title") as HTMLInputElement).value
				}`;

				break;
			}
			case "/sequences": {
				prevPage = currPage;
				currPage = "bs";
				presenceData.details = "Browsing sequences";
				if (document.querySelectorAll("input")[2].value !== "") {
					presenceData.state = `Searching: ${
						document.querySelectorAll("input")[2].value
					}`;
				}

				break;
			}
			case "/memberlist": {
				prevPage = currPage;
				currPage = "ml";
				presenceData.details = "Viewing members";
				if (document.querySelectorAll("input")[2].value !== "") {
					presenceData.state = `Searching: ${
						document.querySelectorAll("input")[2].value
					}`;
				}

				break;
			}
			default:
				if (document.location.pathname.startsWith("/members/")) {
					prevPage = currPage;
					currPage = "m";
					presenceData.details = "Viewing member:";
					presenceData.state = (
						document.querySelectorAll(".profile_header")[0] as HTMLElement
					).textContent;
				} else if (document.location.pathname.startsWith("/import")) {
					prevPage = currPage;
					currPage = "i";
					presenceData.details = "Importing MIDI file";
				} else if (document.location.pathname.startsWith("/forum/showthread")) {
					prevPage = currPage;
					currPage = "ft";
					presenceData.details = "Viewing Forum Thread:";
					const threadtitle = (
						document.querySelectorAll(".thead")[0] as HTMLElement
					).textContent;
					if (threadtitle.includes("Thread Modes"))
						presenceData.state = threadtitle.substr(13);
					else presenceData.state = threadtitle;
				} else if (
					document.location.pathname.startsWith("/forum/announcements")
				) {
					prevPage = currPage;
					currPage = "fa";
					presenceData.details = "Viewing Forum Announcement:";
					presenceData.state = (
						document.querySelectorAll(".thead")[0] as HTMLElement
					).textContent;
				} else if (
					document.location.pathname.startsWith("/forum/forumdisplay")
				) {
					prevPage = currPage;
					currPage = "fd";
					presenceData.details = "Viewing Forum Category:";
					presenceData.state = (
						document.querySelectorAll(
							".pull-left.navbar-header"
						)[0] as HTMLElement
					).textContent;
				} else if (document.location.pathname.startsWith("/forum/memberlist")) {
					prevPage = currPage;
					currPage = "fm";
					presenceData.details = "Viewing Forum Members";
				} else if (document.location.pathname.startsWith("/forum")) {
					prevPage = currPage;
					currPage = "f";
					presenceData.details = "Viewing Forum";
				} else if (!isNaN(parseInt(document.location.pathname.substr(1)))) {
					prevPage = currPage;
					currPage = "s";
					if (document.querySelectorAll(".active.tooltipstered")[0]) {
						presenceData.details = "Viewing a sequence";
						presenceData.buttons = [
							{ label: "View Sequence", url: window.location.href },
							{
								label: "View Creator",
								url: document.querySelector<HTMLAnchorElement>(
									"#titlebar div a"
								).href,
							},
						];
					} else presenceData.details = "Editing a sequence";

					const str = (
						document.querySelectorAll(".text")[1] as HTMLElement
					).textContent.trim();
					if (str.includes("by <a")) {
						presenceData.state = `Title: ${str.substring(
							0,
							str.indexOf("by <a")
						)}`;
					} else presenceData.state = `Title: ${str}`;
				}
		}
	}

	if (document.querySelector("#chatbox")) {
		prevPage = currPage;
		currPage = "c";
		presenceData.details = "Viewing Chat";
	}

	if (prevPage !== currPage) refreshTime();

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
