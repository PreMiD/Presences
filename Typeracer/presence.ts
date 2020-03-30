var presence = new Presence({
	clientId: "655247212728811530"
});

var browsingStamp = Math.floor(Date.now() / 1000),
	href = new URL(document.location.href),
	presenceData = {
		details: <string>"In construction",
		state: <string>null,
		largeImageKey: <string>"lg",
		startTimestamp: <number>browsingStamp,
		endTimestamp: <number>null
	},
	updateCallback = {
		_function: null,
		get function() {
			return this._function;
		},
		set function(parameter) {
			this._function = parameter;
		},
		get present() {
			return this._function !== null;
		}
	},
	raceStamp = null;

(() => {
	if (href.hostname === "play.typeracer.com") {
		/*

		Part 1
		play.typeracer.com (game page)

		*/

		updateCallback.function = () => {
			if (document.querySelector(".gameView")) {
				presenceData.details = "Playing a race";
				let gameStatusLabel = document.querySelector(".gameStatusLabel")
					.textContent;

				if (gameStatusLabel === "Waiting for more people...") {
					presenceData.state = "Waiting for more people...";
					if (raceStamp === null) raceStamp = Math.floor(Date.now() / 1000);
					presenceData.startTimestamp = raceStamp;
				} else if (gameStatusLabel === "The race is about to start!") {
					let timeString = document.querySelector(".countdownPopup .time")
						.textContent;
					presenceData.state = "Counting down...";
					presenceData.endTimestamp =
						Math.floor(Date.now() / 1000) +
						Number(
							document
								.querySelector(".countdownPopup .time")
								.textContent.slice(1)
						);
					raceStamp = null;
				} else if (
					gameStatusLabel === "The race is on! Type the text below:" ||
					gameStatusLabel === "Go!"
				) {
					const textBox = document.querySelector(
						"table.gameView > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td > div > div"
					);
					const lettersTotal = textBox.textContent.length;
					let lettersTyped = 0;
					for (var i in textBox.children) {
						if (
							typeof textBox.children[i] !== "number" &&
							typeof textBox.children[i] !== "function"
						) {
							if (
								getComputedStyle(textBox.children[i]).color ===
								"rgb(153, 204, 0)"
							) {
								lettersTyped += textBox.children[i].textContent.length;
							}
						}
					}
					let percentage =
						Math.round((lettersTyped / lettersTotal) * 10000) / 100;
					let wpm = document
						.querySelector(".rankPanelWpm-self")
						.textContent.toUpperCase();
					presenceData.state = `${percentage}%, ${wpm}`;
					if (raceStamp === null) raceStamp = Math.floor(Date.now() / 1000);
					presenceData.startTimestamp = raceStamp;
				} else if (
					gameStatusLabel === "The race has ended." ||
					gameStatusLabel.startsWith("You finished")
				) {
					presenceData.details = "Just finished with a race";
					let wpm = document
						.querySelector(".rankPanelWpm-self")
						.textContent.toUpperCase();
					let accuracy = document.querySelector(
						".tblOwnStats > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(2)"
					).textContent;
					let time = document.querySelector(
						".tblOwnStats > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2)"
					).textContent;
					presenceData.state = `${wpm}, ${accuracy} acc., ${time}`;
					presenceData.startTimestamp = browsingStamp;
				}
			} else {
				presenceData.details = "Viewing the home page";
			}
		};
	} else if (href.hostname === "data.typeracer.com") {
		/*

		Part 2
		data.typeracer.com (pit stop and misc. pages)

		*/

		let path = href.pathname.slice(1).split("/");

		if (path[0] === "pit") {
			if (path[1] === "profile") {
				presenceData.details = "Viewing a racer profile";
				presenceData.state =
					document.querySelector("#profileUsername").textContent || null;
			} else if (path[1] === "text_info") {
				presenceData.details = "Viewing a text";
				presenceData.state = href.searchParams.get("id");
			} else if (path[1] === "result") {
				presenceData.details = "Viewing a race result";
				presenceData.state = `Race ${
					href.searchParams.get("id").split("|")[2]
				} of ${href.searchParams
					.get("id")
					.split("|")[1]
					.slice(3)}`;
			} else if (path[1] === "race_history") {
				presenceData.details = "Viewing someone's race history";
				presenceData.state = href.searchParams.get("user") || null;
			} else if (path[1] === "home") {
				presenceData.details = "Viewing the pit stop";
			} else if (path[1] === "competitions") {
				presenceData.details = "Viewing the competition result";
				let option = document
					.querySelector("option[selected]")
					.textContent.trim();
				let strong = document
					.querySelector("div.themeContent > div:nth-child(5) > strong")
					.textContent.trim()
					.slice(0, -1)
					.split(" ");
				if (option === "day") presenceData.state = strong.join(" ");
				else if (option === "week")
					presenceData.state = `${strong[1]} ${strong[2]}, ${strong[4]}`;
				else if (option === "month")
					presenceData.state = `${strong[3]} ${strong[4]}`;
				else if (option === "year") presenceData.state = strong[2];
			} else if (path[1] === "login") {
				presenceData.details = "Logging in";
			} else {
				let pageNames = {
					upgrade_account: "Upgrade your account",
					tos: "Terms of Service",
					privacy_poicy: "Privacy Policy"
				};
				presenceData.details = "Viewing a page";
				presenceData.state = pageNames[path[1]];
			}
		} else if (path[0] === "misc") {
			if (path[1] === "about") {
				presenceData.details = "Viewing a page";
				presenceData.state = "About";
			}
		} else if (path[0] === "admin") {
			presenceData.details = "Viewing school admin pages";
		}
	}
})();

if (updateCallback.present) {
	presence.on("UpdateData", async () => {
		resetData();
		updateCallback.function();
		cleanData();
		presence.setActivity(presenceData);
	});
} else {
	cleanData();
	presence.on("UpdateData", async () => {
		presence.setActivity(presenceData);
	});
}

/**
 * Initialize presenceData
 */
function resetData() {
	presenceData = {
		details: <string>"In construction",
		state: <string>null,
		largeImageKey: <string>"lg",
		startTimestamp: <number>browsingStamp,
		endTimestamp: <number>null
	};
}

/**
 * Cleans presenceData
 */
function cleanData() {
	if (presenceData.details === null) delete presenceData.details;
	if (presenceData.state === null) delete presenceData.state;
	if (presenceData.startTimestamp === null) delete presenceData.startTimestamp;
	if (presenceData.endTimestamp === null) delete presenceData.endTimestamp;
}
