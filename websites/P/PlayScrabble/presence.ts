const presence = new Presence({
		clientId: "",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	};
	const { pathname } = document.location,
		pathList = pathname.split("/").filter(Boolean);

	switch (pathList[0]) {
		case "play": {
			const gameElement = document.querySelector<HTMLDivElement>(
				"[class*='ScrabbleGame_rightGamePanel'] > div > div:nth-child(2)"
			);
			if (gameElement) {
				const activePlayerName = document.querySelector<HTMLSpanElement>(
						".game_player_info.switched_active_text"
					).textContent,
					gameType = gameElement.textContent.replace(/\s{2}/, ""),
					score = document.querySelector<HTMLDivElement>(
						".game_player_score_block"
					).textContent,
					time = document.querySelector<HTMLDivElement>(
						".game_player_timer_block"
					).textContent;
				if (
					document.querySelector<HTMLImageElement>(
						"[src*='roundSummaryBackground']"
					)
				) {
					presenceData.details = "Viewing round summary";
				} else {
					presenceData.details = `Playing ${gameType}`;
					presenceData.state = `My score: ${score} | My time remaining: ${time}`;
					presenceData.smallImageKey = document.querySelector<HTMLImageElement>(
						"[class*='switched_active'] [class*='Avatar'] img"
					).src;
					presenceData.smallImageText = activePlayerName;
				}
			} else {
				presenceData.details = "Setting up a game";
				switch (pathList[1]) {
					case "ai":
						presenceData.state = "Playing against AI";
						break;
					case "friend":
						presenceData.state = "Playing with friends";
						break;
					case "online":
						presenceData.state = "Playing online";
						break;
				}
			}
			break;
		}
	}

	presence.setActivity(presenceData);
});
