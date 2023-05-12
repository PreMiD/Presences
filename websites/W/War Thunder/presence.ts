const presence = new Presence({
		clientId: "1015299454292725760",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/LWQZ2xQ.png",
			startTimestamp: browsingTimestamp,
		},
		{ hostname, pathname, search, href } = window.location;
	switch (hostname) {
		case "warthunder.com": {
			presenceData.details = "Browsing...";
			if (/^\/[a-z]{2}\/?$/i.test(pathname))
				presenceData.state = "Viewing home page";
			else if (pathname.substring(3) === "/game/about")
				presenceData.state = "About War Thunder";
			else {
				presenceData.state =
					document.querySelector(".content__title")?.textContent ||
					document.title.match(/(.*?)(?: - War Thunder$|$)/)[1];
			}
			break;
		}
		case "forum.warthunder.com": {
			presenceData.details = "Viewing forums";
			const searchPath = search.match(/(?:\?)(.*?)(?:&.*|$)/)
					? search.match(/(?:\?)(.*?)(?:&.*|$)/)[1]
					: "",
				searchParams = new URLSearchParams(search),
				pageTitle =
					document.querySelector<HTMLHeadingElement>(
						".ipsType_pageTitle"
					)?.textContent;
			if (searchPath === "") presenceData.state = "Viewing home page";
			else if (searchPath.startsWith("/calendar/"))
				presenceData.state = "Viewing calendar";
			else if (searchPath.startsWith("/search/")) {
				if (searchParams.get("q"))
					presenceData.state = `Searching for: ${searchParams.get("q")}`;
				else presenceData.state = "Searching";
			} else if (searchPath.startsWith("/forum/"))
				presenceData.state = `Viewing category: ${pageTitle}`;
			else if (searchPath.startsWith("/topic/"))
				presenceData.state = `Viewing thread: ${pageTitle}`;
			else if (searchPath.startsWith("/profile/")) {
				presenceData.state = `Viewing profile of: ${document
					.querySelector<HTMLHeadingElement>(".ipsPageHead_barText")
					.textContent.replace(/^\s*|\s*$/g, "")}`;
			} else if (searchPath.startsWith("/submit"))
				presenceData.state = "Creating new thread";
			else if (searchPath.startsWith("/messenger/")) {
				if (/^\d+/.test(searchPath.substring(11)))
					presenceData.state = `Reading DM: ${pageTitle}`;
				else if (searchPath.startsWith("/messenger/compose"))
					presenceData.state = "Composing new message";
				else presenceData.state = "Viewing private messages";
			} else {
				presenceData.state =
					pageTitle ||
					document.title.match(
						/(.*?)(?: - War Thunder - Official Forum$|$)/
					)[1];
			}
			break;
		}
		case "live.warthunder.com": {
			presenceData.details = "Browsing War Thunder Live";
			if (pathname.startsWith("/feed/"))
				presenceData.state = document.title.match(/(?:WT Live \/\/ )(.*)/)[1];
			else if (pathname.startsWith("/post/")) {
				presenceData.state = `Reading post: ${
					document.title.match(/(?:WT Live \/\/ )(.*)/)[1]
				}`;
				presenceData.buttons = [
					{
						label: "View Post",
						url: href,
					},
				];
			} else if (pathname.startsWith("/subscribes/"))
				presenceData.state = "Viewing subscriptions";
			else if (pathname.startsWith("/user/")) {
				presenceData.state = `Viewing profile of: ${
					document.querySelector<HTMLSpanElement>(".nickname > span")
						.textContent
				}`;
			} else presenceData.state = document.title;
			break;
		}
		case "tss.warthunder.com": {
			presenceData.details = "Browsing War Thunder Tournament Service";
			switch (new URLSearchParams(search).get("action")) {
				case "rating": {
					presenceData.state = "Viewing a list of: player ratings";
					break;
				}
				case "current_tournaments": {
					presenceData.state = "Viewing a list of: active tournaments";
					break;
				}
				case "tournament": {
					presenceData.details = "Viewing a tournament";
					presenceData.state = document.querySelector<HTMLSpanElement>(
						".txt_name_tournament"
					).textContent;
					presenceData.smallImageKey =
						document.querySelector<HTMLImageElement>(".img_tournament").src;
					presenceData.smallImageText = `Teams: ${
						document.querySelector<HTMLSpanElement>("#all_teams_param_tour")
							.textContent
					} | Prize: ${
						document.querySelector("[id-tss='prize_pool']").textContent
					}`;
					presenceData.buttons = [
						{
							label: "View Tournament",
							url: href,
						},
					];
					break;
				}
				default: {
					presenceData.state = document.title;
				}
			}
			break;
		}
		case "wiki.warthunder.com": {
			presenceData.details = "Browsing the wiki";
			const searchParams = new URLSearchParams(search),
				title =
					searchParams.get("title") ||
					document.querySelector<HTMLHeadingElement>("#firstHeading")
						.textContent,
				action = searchParams.get("action");
			if (action === "edit") presenceData.state = `Editing ${title}`;
			else if (action === "history")
				presenceData.state = `Viewing revision history of: ${title}`;
			else presenceData.state = title;
			break;
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
