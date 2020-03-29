var presence = new Presence({
	clientId: "654906151523057664",
	mediaKeys: false
})

var browsingStamp = Math.floor(Date.now() / 1000),
	href = new URL(document.location.href),
	presenceData = {
		details: <string>'In construction',
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
			this._function = parameter
		},
		get present() {
			return this._function !== null
		}
	};

(() => {

	if (document.querySelector("section.game")) {
		updateCallback.function = () => {
			presenceData.details = document.querySelector(".game-info__section--map .game-info__value").textContent
			if (document.querySelector(".score__round") || document.querySelector(".score__final")) {
				presenceData.state = (Number(document.querySelector(".game-info__section--round .game-info__value").textContent.split(" / ")[0]) + 1) + " of 5, " + document.querySelector(".game-info__section--score .game-info__value").textContent + " points"
				if (document.querySelector(".game-info__section--round .game-info__value").textContent.split(" / ")[0] === "5") {
					presenceData.state = "Finished, " + document.querySelector(".game-info__section--score .game-info__value").textContent + " points"
				}
			} else {
				presenceData.state = document.querySelector(".game-info__section--round .game-info__value").textContent.split(" / ")[0] + " of 5, " + document.querySelector(".game-info__section--score .game-info__value").textContent + " points"
			}
		}
	} else if (href.pathname === "/") {
		presenceData.details = "Viewing the home page"
	} else if (href.pathname === "/maps" || href.pathname === "/maps/") {
		presenceData.details = "Looking for a map"
	} else if (href.pathname.startsWith("/maps")) {
		if (document.querySelector(".map__title")) {
			presenceData.details = "Viewing a map"
			presenceData.state = document.querySelector(".map__title").textContent
		} else {
			presenceData.details = "Looking for a map"
		}
	} else if (href.pathname.startsWith("/user/")) {
		presenceData.details = "Viewing a user profile"
		presenceData.state = document.querySelector(".profile-summary__nick").textContent
	} else if (href.pathname.startsWith("/daily-challenges")) {
		presenceData.details = "Viewing a page"
		presenceData.state = "Daily Challenges"
	} else if (href.pathname.startsWith("/pro")) {
		presenceData.details = "Viewing a page"
		presenceData.state = "PRO Membership"
	} else if (href.pathname.startsWith("/static")) {
		let pageNames = {
			"faq.html": "FAQ",
			"terms.html": "Terms of Service",
			"privacy.html": "Privacy Policy"
		}
		presenceData.details = "Viewing a page"
		presenceData.state = pageNames[href.pathname.split("/")[2]]
	} else if (href.pathname.startsWith("/me")) {
		if (href.pathname.split("/")[2] === undefined) {
			presenceData.details = "Viewing their own profile"
		} else {
			let pageNames = {
				"settings": "Settings",
				"leagues": "Leagues",
				"activities": "Activities",
				"current": "Ongoing games",
				"likes": "Favorite maps",
				"badges": "Badges",
				"maps": "My maps",
				"map-maker": "Map Maker"
			}
			presenceData.details = "Viewing a personal page"
			presenceData.state = pageNames[href.pathname.split("/")[2]]
		}
	}

})();

if (updateCallback.present) {
	presence.on("UpdateData", async () => {
		resetData()
		updateCallback.function();
		cleanData()
		presence.setActivity(presenceData);
	})
} else {
	cleanData()
	presence.on("UpdateData", async () => {
		presence.setActivity(presenceData)
	})
}

/**
 * Initialize presenceData
 */
function resetData() {
	presenceData = {
		details: <string>'In construction',
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
	if (presenceData.state === null) delete presenceData.state
	if (presenceData.endTimestamp === null) delete presenceData.endTimestamp
}