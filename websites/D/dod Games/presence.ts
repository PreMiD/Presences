const presence = new Presence({
	clientId: "937393073539911730",
});

let isInGame = false,
	timeStarted = Date.now();

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
		},
		playerName = document.querySelector(
			"#component_top_right_loginasname_text"
		).textContent,
		urls = document.querySelectorAll("#topBarDownLink");
	let openRooms = 0;

	for (const url of urls) {
		if (url.textContent.includes("&room=")) openRooms++;

		// Draw It
		if (url.textContent.includes("game=drawit&room=")) {
			if (!isInGame) {
				timeStarted = Date.now();
				isInGame = true;
			}

			let round = document.querySelector("#round b").textContent;
			round = round.replaceAll(" ", "");
			const scores = document.querySelectorAll("#playersContainer .player");
			for (let i = 0; i < scores.length; i++) {
				if (scores[i].querySelector(".name").textContent === playerName) {
					if (
						(document.querySelector("#drawtools") as HTMLElement).style
							.display !== "none"
					) {
						presenceData.smallImageKey = "molivaki";
						presenceData.smallImageText = "Ζωγραφίζει";
					}

					presenceData.state = `Σκορ: ${
						scores[i].querySelector(".score").textContent
					} | Γύρος: ${round} | Θέση #${
						parseInt(scores[i].getAttribute("index")) + 1
					}/${scores.length}`;
				}
			}
			if (scores.length < 10) {
				presenceData.buttons = [
					{
						label: "Join Game",
						url: url.textContent,
					},
				];
			}
			presenceData.details = "Παίζει Ζωγράφισέ Το";
			presenceData.startTimestamp = timeStarted;
			break;
		} else if (url.textContent.includes("game=quiz&room=")) {
			// Quiz
			if (!isInGame) {
				timeStarted = Date.now();
				isInGame = true;
			}
			presenceData.buttons = [
				{
					label: "Join Game",
					url: url.textContent,
				},
			];

			const scores = document.querySelectorAll(
				"#playersContainer .numberAndPlayerContainer"
			);
			for (let i = 0; i < scores.length; i++) {
				if (
					scores[i].querySelector(".quiz_playerName").textContent === playerName
				) {
					presenceData.state = `Σκορ: ${
						scores[i].querySelector(".quiz_playerPoints").textContent
					} | Γύρος: ${
						parseInt(document.querySelector("#countRound").textContent) || "–"
					} | Θέση #${parseInt(
						scores[i].querySelector(".quiz_playerNumber").textContent
					)}/${scores.length}`;
				}
			}
			presenceData.details = "Παίζει Κουίζ";
			presenceData.startTimestamp = timeStarted;
			break;
		} else if (url.textContent.includes("game=agonia&room=")) {
			// Αγωνία
			const nPlayers = parseInt(
				document.querySelector("#agonia_content").className.match(/\d+/g)[0]
			);
			if (!isInGame) {
				timeStarted = Date.now();
				isInGame = true;
			}

			interface PlayerState {
				score: string;
				winner: boolean;
			}

			const playerClassNames = [
					"agonia_player1",
					"agonia_player2",
					"agonia_player3",
					"agonia_player4",
				],
				state: { [key: string]: PlayerState } = {};
			for (const playerClassName of playerClassNames) {
				const player = document.querySelector(`#${playerClassName}`);
				if (player) {
					const playerName = player.querySelector(".gnh_name").textContent;
					if (playerName) {
						state[playerName] = {
							score: player.querySelector(".gnh_score_text").textContent,
							winner: false,
						};
					}
				}
			}
			if (
				document.querySelector("#gameover_content").parentElement.style
					.display !== "none"
			) {
				const gameOverClassNames = [
					"gameover_user1",
					"gameover_user2",
					"gameover_user3",
					"gameover_user4",
				];
				for (const gameOverClassName of gameOverClassNames) {
					const player = document.querySelector(`#${gameOverClassName}`);
					if (
						player &&
						(player.querySelector(".gameover_userphotowin") as HTMLElement)
							.style.display !== "none"
					) {
						const winnerName = player.getAttribute("shownname");
						if (winnerName in state) state[winnerName].winner = true;
					}
				}
			}
			let stateString = "";
			for (const key in state) {
				const value = state[key];
				stateString += `${value.winner ? " 🏆 " : ""}${key}: ${value.score} – `;
			}
			if (Object.keys(state).length === nPlayers)
				presenceData.state = stateString.substring(0, stateString.length - 3);
			else {
				presenceData.state = `${
					Object.keys(state).length
				}/${nPlayers} παίκτες...`;
				presenceData.buttons = [
					{
						label: "Join Game",
						url: url.textContent,
					},
				];
			}
			presenceData.details = `Παίζει Αγωνία | 💪🏻 ${document
				.querySelector(".mytr")
				.getAttribute("elo")}`;
			presenceData.startTimestamp = timeStarted;
			break;
		} else if (url.textContent.includes("game=tichu&room=")) {
			// Tichu

			if (!isInGame) {
				timeStarted = Date.now();
				isInGame = true;
			}

			interface PlayerState {
				name: string;
				bet: string;
			}

			const teamPlayers: string[] = [],
				opPlayers: string[] = [],
				playerState: { [key: string]: PlayerState } = {},
				bot = document.querySelector(
					"#nickholder_bottom .playerName"
				).textContent,
				up = document.querySelector("#nickholder_up .playerName").textContent,
				left = document.querySelector(
					"#nickholder_left .playerName"
				).textContent,
				right = document.querySelector(
					"#nickholder_right .playerName"
				).textContent;

			if (bot) playerState.bot = { name: bot, bet: null };
			if (up) playerState.up = { name: up, bet: null };
			if (left) playerState.left = { name: left, bet: null };
			if (right) playerState.right = { name: right, bet: null };

			for (const pos of ["up", "left", "right"]) {
				if (!(pos in playerState)) continue;
				const betElement = document.querySelector(
					`#nickholder_${pos} #tichugrand`
				) as HTMLElement;
				if (betElement.style.display !== "none")
					playerState[pos].bet = betElement.className;
			}

			let betElement = document.querySelector("#btnTichuToggle") as HTMLElement;
			if (betElement.style.display !== "none") playerState.bot.bet = "tichu";

			betElement = document.querySelector("#btnGrandToggle") as HTMLElement;
			if (betElement.style.display !== "none") playerState.bot.bet = "grand";

			for (const pos in playerState) {
				const player = playerState[pos];
				(["bot", "up"].includes(pos) ? teamPlayers : opPlayers).push(
					`${
						player.bet === "tichu" ? "🟠" : player.bet === "grand" ? "🔴" : ""
					}${player.name}`
				);
			}

			if (teamPlayers.length === 2 && opPlayers.length === 2) {
				presenceData.state = `(${teamPlayers[0]}, ${teamPlayers[1]}) ${
					document.querySelector("#txtMyTeamScore").textContent
				} – ${document.querySelector("#txtOpTeamScore").textContent} (${
					opPlayers[0]
				}, ${opPlayers[1]})`;
			} else {
				presenceData.state = `${
					teamPlayers.length + opPlayers.length
				}/4 παίκτες...`;
				presenceData.buttons = [
					{
						label: "Join Game",
						url: url.textContent,
					},
				];
			}
			presenceData.details = `Παίζει Tichu | 💪🏻 ${document
				.querySelector(".mytr")
				.getAttribute("elo")}`;
			presenceData.startTimestamp = timeStarted;
			break;
		}
	}
	if (!openRooms) isInGame = false;
	if (isInGame) presence.setActivity(presenceData);
	else presence.setActivity();
});
