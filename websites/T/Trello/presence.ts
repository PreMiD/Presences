const presence = new Presence({
		clientId: "614583717951963137", // CLIENT ID FOR YOUR PRESENCE
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
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

let board: HTMLElement, profile: string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/Yncl9Qc.png",
		},
		displayPrivateBoards = await presence.getSetting<boolean>(
			"displayPrivateBoards"
		);

	presenceData.startTimestamp = browsingTimestamp;

	switch (document.location.hostname) {
		case "trello.com": {
			if (document.location.pathname.includes("/b/")) {
				if (
					document.querySelector(
						".board-header-btn.board-header-btn-org-name.js-open-org-menu"
					)
				) {
					if (
						document
							.querySelector("#permission-level > span.board-header-btn-icon")
							.classList.contains("icon-private") &&
						!displayPrivateBoards
					)
						presenceData.details = "Viewing private board";
					else {
						presenceData.details = `Viewing board: ${
							document.querySelector(
								".js-board-editing-target.board-header-btn-text"
							).textContent
						}`;
						presenceData.state = `By team: ${document
							.querySelector(
								".board-header-btn.board-header-btn-org-name.js-open-org-menu"
							)
							.textContent.replace(
								document.querySelector(".org-label").textContent,
								""
							)}`;
					}
				} else {
					presenceData.details = "Viewing board:";
					if (
						document
							.querySelector("#permission-level > span.board-header-btn-icon")
							.classList.contains("icon-private") &&
						!displayPrivateBoards
					)
						presenceData.details = "Viewing private board";
					else {
						presenceData.state = document.querySelector(
							".js-board-editing-target.board-header-btn-text"
						).textContent;
					}
				}
				presenceData.smallImageKey = Assets.Reading;
			} else if (document.location.pathname.includes("/c/")) {
				if (
					document
						.querySelector("#permission-level > span.board-header-btn-icon")
						.classList.contains("icon-private") &&
					!displayPrivateBoards
				) {
					presenceData.details = "Viewing private card";
					presenceData.state = "Private Board";
				} else {
					presenceData.details = `Viewing card: ${
						document.querySelector(".window-title").textContent
					}`;
					presenceData.state = `Board: ${
						document.querySelector(
							".js-board-editing-target.board-header-btn-text"
						).textContent
					}`;
					presenceData.smallImageKey = Assets.Reading;
				}
			} else if (document.location.pathname.includes("/activity")) {
				[, profile] = document.location.pathname.split("/", 3);
				presenceData.details = `Viewing @${profile}'s`;
				presenceData.state = "recent activites";
			} else if (document.location.pathname.includes("/cards")) {
				[, profile] = document.location.pathname.split("/", 3);
				presenceData.details = `Viewing @${profile}'s`;
				presenceData.state = "recent cards";
			} else if (document.location.pathname.includes("/boards")) {
				[, profile] = document.location.pathname.split("/", 3);
				presenceData.details = `Viewing @${profile}'s boards`;
			} else if (document.location.pathname.includes("/home")) {
				[, profile] = document.location.pathname.split("/", 3);
				presenceData.details = `Viewing Team: ${profile}`;
			} else if (
				document.location.pathname.includes("/account") ||
				document.location.pathname.includes("/billing")
			)
				presenceData.details = "Changing account settings";
			else if (document.location.pathname.includes("/shortcuts"))
				presenceData.details = "Viewing shortcut settings";
			else if (document.location.pathname.includes("/tour"))
				presenceData.details = "Viewing Trello's Tour";
			else if (document.location.pathname.includes("/pricing"))
				presenceData.details = "Viewing Trello's Pricing";
			else if (document.location.pathname.includes("/platforms"))
				presenceData.details = "Viewing Trello's Platforms";
			else if (document.location.pathname.includes("/about")) {
				presenceData.details = "Viewing Trello's";
				presenceData.state = "About page";
			} else if (document.location.pathname.includes("/")) {
				profile = document.querySelector(
					"#content > div > div.tabbed-pane-header > div > div > div > div._2MiqoEbHZgSlXq > span._32mB-ZO8fxjtUy"
				).textContent;
				if (profile) presenceData.details = "Viewing own profile page";
				else presenceData.details = "Viewing home page";
			}

			break;
		}
		case "help.trello.com": {
			if (document.location.pathname.includes("/article/")) {
				board = document.querySelector("#fullArticle > h1");
				presenceData.details = "Help Center, article:";
				presenceData.state = board.textContent;
				presenceData.smallImageKey = Assets.Reading;
			} else if (document.location.pathname.includes("/category/")) {
				board = document.querySelector("#categoryHead > h1");
				presenceData.details = "Help Center, category:";
				presenceData.state = board.textContent;
				presenceData.smallImageKey = Assets.Reading;
			} else {
				presenceData.details = "Viewing Trello's";
				presenceData.state = "Help Center";
			}

			break;
		}
		case "blog.trello.com": {
			if (document.location.pathname.includes("/topic/")) {
				board = document.querySelector(
					"body > div.body-container-wrapper > div > div > div > div > div > div.row-fluid > div > div.row-fluid-wrapper.row-depth-1.row-number-3 > div > div > div > h2"
				);
				presenceData.details = "Blog, topic:";
				presenceData.state = board.textContent;
			} else if (document.location.pathname.includes("/author/")) {
				profile = document.querySelector(
					"body > div.body-container-wrapper > div > div > div > div > div > div.row-fluid > div > div.row-fluid-wrapper.row-depth-1.row-number-6 > div > div > div > div > div > div:nth-child(1) > div > h2"
				)?.textContent;
				presenceData.details = "Blog, viewing profile:";
				presenceData.state = profile;
			} else if (document.location.pathname.includes("/search")) {
				profile = document.querySelector<HTMLInputElement>("#gsc-i-id1").value;
				presenceData.details = "Blog, searching for:";
				presenceData.state = profile;
				presenceData.smallImageKey = Assets.Search;
			} else if (document.location.pathname.includes("/")) {
				board = document.querySelector("#hs_cos_wrapper_name");
				if (board) {
					presenceData.details = "Blog, article:";
					presenceData.state = board.textContent;
					presenceData.smallImageKey = Assets.Reading;
				} else {
					presenceData.details = "Viewing Trello's";
					presenceData.state = "Blog page";
				}
			}

			break;
		}
		case "developers.trello.com": {
			if (document.location.pathname.includes("/reference")) {
				[, profile] = document.URL.split("#", 2);
				presenceData.details = "Developers, API Docs:";
				presenceData.state = profile;
				presenceData.smallImageKey = Assets.Reading;
			} else if (document.location.pathname.includes("/docs")) {
				presenceData.details = "Developers, Reading guide";
				presenceData.smallImageKey = Assets.Reading;
			}

			break;
		}
		// No default
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
