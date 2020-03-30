var presence = new Presence({
		clientId: "647443051819565076",
	}),
	presenceData = {
		largeImageKey: "icon",
	};

presence.on("UpdateData", () =>
	__awaiter(this, void 0, void 0, function* () {
		var path = window.location.hash.substr(1);
		if (path == "action=watch") {
			var channelstate = document
				.querySelector(
					"div.player-linear-bottom-bar__channelstrip:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
				)
				.getAttribute("title");
			var titledetailes = document.querySelector(
				"div.player-linear-bottom-bar__channelstrip:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)"
			);
			var pageData = {
				state: "Channel: " + channelstate,
				details: "Watching: " + titledetailes.innerText,
				largeImageKey: "icon",
			};
			presence.setActivity(pageData);
		} else if (path.includes("offset")) {
			var statedetails = document.querySelector(
				".player-ui-bottom-bar-controls__main-info"
			);
			var movieVideo = {
				state: "Video: " + document.title,
				details: "Watching: " + statedetails.innerText,
				largeImageKey: "icon",
			};
			presence.setActivity(movieVideo);
		} else {
			var homepage = {
				details: "Browsing homepage.",
				largeImageKey: "icon",
			};
			presence.setActivity(homepage);
		}
	})
);
