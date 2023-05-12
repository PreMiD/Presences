const presence = new Presence({
	clientId: "845354103118364672",
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

let matchStart: number = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/KPoJ18U.png",
		},
		currentGameState = await getPageletiable("game.currentGameState");

	switch (currentGameState) {
		case "loading":
		case "UiLoadingOverlay": {
			presenceData.details = "Loading...";
			break;
		}
		case "MainMenu": {
			presenceData.details = "Lurking in main menu";
			break;
		}
		case "Cosmetics":
		case "UiCosmeticSelectorOverlay": {
			presenceData.details = "Viewing cosmetics";
			break;
		}
		case "Profile": {
			presenceData.details = "Viewing their profile";
			break;
		}
		case "Shop":
		case "UiPreviewPackOverlay": {
			presenceData.details = "Browsing Shop";
			break;
		}
		case "Friends":
		case "UiFriendAddOverlay": {
			presenceData.details = "Viewing their friends";
			break;
		}
		case "Leaderboards": {
			presenceData.details = "Browsing leaderboards";
			break;
		}
		case "UiLoginOverlay": {
			presenceData.details = "Loging in";
			break;
		}
		case "UiSettingsOverlay": {
			presenceData.details = "Changing settings";
			break;
		}
		case "UiSeasonPurchaseOverlay": {
			presenceData.details = "Buying a Battle Pass";
			break;
		}
		default:
			if (
				currentGameState.startsWith("UiSeason") ||
				currentGameState === "UiPreviewItemOverlay"
			)
				presenceData.details = "Viewing Battle Pass";
			else {
				switch (currentGameState) {
					case "UiChallengesOverlay": {
						presenceData.details = "Viewing challenges";
						break;
					}
					case "UiBuyGemsOverlay": {
						presenceData.details = "Buying gems";
						break;
					}
					case "VideoAd": {
						presenceData.details = "Watching video ad";
						break;
					}
					case "Countdown":
					case "Lobby": {
						presenceData.details = "In Lobby";
						presenceData.state = "Waiting for game to start";

						break;
					}
					case "Game":
					case "UiReportPlayerOverlay":
					case "UiLeaveOverlay": {
						presenceData.details = "In Game";
						break;
					}
					case "Plane": {
						presenceData.details = "In Game";
						presenceData.state = "Flying plane";

						break;
					}
					case "Parachute": {
						presenceData.details = "In Game";
						presenceData.state = "Parachuting";

						break;
					}
					case "Dead":
					case "UiGameOver":
					case "UiSpectator":
					case "UiFeedbackOverlay": {
						presenceData.details = "In Game";
						presenceData.state = "Dead";

						break;
					}
					case "UiMapOverlay": {
						presenceData.details = "In Game";
						presenceData.state = "Viewing map";

						break;
					}
					default:
						presence.error(`Unknown state: ${currentGameState}`);
				}
			}
	}

	const playing =
		presenceData.details === "In Game" || presenceData.details === "In Lobby";

	if (playing && !matchStart) matchStart = Math.floor(Date.now() / 1000);
	else if (!playing && matchStart) matchStart = null;

	presenceData.startTimestamp = matchStart;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});

function getPageletiable(js: string): Promise<string> {
	const eventName = "PreMiD_ZombsRoyale_Pageletiable";

	return new Promise<string>(resolve => {
		const script = document.createElement("script"),
			_listener = (data: CustomEvent) => {
				script.remove();
				resolve(JSON.parse(data.detail));
				window.removeEventListener(eventName, _listener, true);
			};

		window.addEventListener(eventName, _listener);
		script.id = eventName;
		script.appendChild(
			document.createTextNode(`
     var pmdPL = new CustomEvent("${eventName}", {detail: JSON.stringify(${js})});
     window.dispatchEvent(pmdPL);
     `)
		);

		(document.body || document.head || document.documentElement).appendChild(
			script
		);
	});
}
