const presence = new Presence({
	clientId: "808664560936026122",
});

async function getStrings() {
	return presence.getStrings(
		{
			buttonJoinGame: "kahoot.buttonJoinGame",
			viewHome: "general.viewHome",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

function getInviteLink() {
	return document.querySelector<HTMLInputElement>("#input-invite").value;
}

function getCurrentPlayer() {
	const playerNameElement = document
			.querySelector(".player-name.me"),
		playerName = playerNameElement.textContent.substring(
			0,
			playerNameElement.textContent.length - 5
		),
		playerElement = playerNameElement.closest(".player"),
		playerRank = +playerElement.querySelector(".player-rank").textContent.match(/\d+/)[0],
		playerScore = +playerElement.querySelector(".player-score").textContent.match(/\d+/)[0];
	return {
		element: playerElement,
		name: playerName,
		rank: playerRank,
		score: playerScore,
	};
}

function isUserDrawer() {
	return getDrawer() === getCurrentPlayer().element;
}

function getDrawer() {
	return document.querySelector(".player-avatar-container .drawing:not([style*='display: none'])")?.closest(".player");
}

function getTimeRemaining() {
	return +document.querySelector("#game-clock").textContent;
}

function isInGame() {
	const gameElement = document.querySelector<HTMLElement>("#game");
	if (!gameElement) return false;
	return gameElement.style.display !== "none";
}

function getCurrentWord() {
	return [...document.querySelectorAll("#game-word .hints [class*='hint']")].map(e => e.textContent).join("");
}

function getRevealedWord() {
	return document.querySelector(".reveal .word").textContent;
}

function getGameRound() {
	return document.querySelector("#game-round").textContent;
}

function getGameWinner() {
	return document.querySelector(".podest-1 .rank-name").textContent;
}

enum GamePhase {
	WaitingForDrawer,
	ChoosingWord,
	RevealAnswer,
	GameResults,
	PrivateRoom,
	Browsing,
}

function getGamePhase() {
	if (document.querySelector(".overlay.show")) {
		if (document.querySelector(".room.show")) return GamePhase.PrivateRoom;
		if (document.querySelector(".words.show")) return GamePhase.ChoosingWord;
	}
	if (document.querySelector(".reveal.show")) return GamePhase.RevealAnswer;
	if (document.querySelector(".result.show")) return GamePhase.GameResults;
	if (document.querySelector("#game-word .description.waiting")) return GamePhase.WaitingForDrawer;
	return GamePhase.Browsing;
}

// game clock: #game-clock
// canvas: #game-canvas > canvas
// - overlay: .overlay.show
// - overlay: .overlay-content
//   - private game: .room.show
//   - choosing word: .words.show
// - reveal: .reveal.show
//   - word: .word
// - result: .result.show
//   - winner: .podest-1
//     - name: .rank-name
// invite link: #input-invite | .value to get link
// game round: #game-round (Game Round N)
// game word: #game-word
// - .description
//   - .waiting (waiting)
// - .hints
//   - [class*="hint"] (hint)
// .player
// - .player-rank (rank) {#N}
// - .player-score (score) {N points}
// - .player-name (name)
// player name: .player-name.me | <name> (You)
// drawer: .player-avatar-container .drawing:not([style*="display: none"])
// language doesn't matter... assuming english

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/au4OO2A.jpg",
		},
		buttons = await presence.getSetting<boolean>("buttons"),
		newLang = await presence.getSetting<string>("lang").catch(() => "en"),
		round = document.querySelector("#round").textContent;

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (document.querySelector("#containerGamePlayers").textContent && !round) {
		presenceData.details = round;
		if (buttons) {
			presenceData.buttons = [
				{
					label: strings.buttonJoinGame.replace(": {0}", ""),
					url: document.location.href,
				},
			];
		}
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	} else presenceData.details = strings.viewHome;
	presence.setActivity(presenceData);
});
