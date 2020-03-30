var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
var presence = new Presence({
		clientId: "657402289132273668",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	});
presence.on("UpdateData", () =>
	__awaiter(this, void 0, void 0, function* () {
		var presenceData = {
			largeImageKey: "memerator",
		};
		if (document.location.pathname == "/") {
			presenceData.details = "Viewing home page";
		} else if (document.location.pathname.includes("following")) {
			user = document.querySelector("#fix > span");
			fol = document.querySelector(
				"body > div.container > div > div > div > p:nth-child(2)"
			);
			presenceData.details = "Viewing who " + user.innerText + " is following";
			presenceData.state = fol.innerText;
		} else if (document.location.pathname.includes("followers")) {
			user = document.querySelector("#fix > span");
			fol = document.querySelector(
				"body > div.container > div > div > div > p:nth-child(2)"
			);
			presenceData.details = "Viewing " + user.innerText + "'s followers";
			presenceData.state = fol.innerText;
		} else if (document.location.pathname.includes("/profile/")) {
			user = document.querySelector("#fix > span");
			presenceData.details = "Viewing Profile";
			presenceData.state = user.innerText;
		} else if (document.location.pathname == "/ratings") {
			presenceData.details = "Viewing memes they've rated";
		} else if (document.location.pathname.includes("/ratings")) {
			presenceData.details = "Viewing ratings for a meme";
		} else if (document.location.pathname.includes("/meme/recents")) {
			presenceData.details = "Viewing recent memes";
		} else if (document.location.pathname.includes("/meme/reports")) {
			presenceData.details = "Viewing memes they've reported";
		} else if (document.location.pathname.includes("/meme/submit")) {
			presenceData.details = "Submitting a meme";
		} else if (document.location.pathname.includes("/meme/following")) {
			presenceData.details = "Viewing memes from following";
		} else if (document.location.pathname.includes("/meme/topmemers")) {
			presenceData.details = "Viewing the top memers";
		} else if (document.location.pathname.includes("/meme/top")) {
			presenceData.details = "Viewing the top memes";
		} else if (document.location.pathname.includes("/report")) {
			presenceData.details = "Reporting a meme!";
		} else if (document.location.pathname.includes("/transfer")) {
			presenceData.details = "Transferring a meme!";
		} else if (document.location.pathname.includes("/meme")) {
			user = document.querySelector("#memeid");
			author = document.querySelector(
				"body > div.container > div > div > div.col > p:nth-child(2) > a"
			);
			presenceData.details = "Viewing Meme " + user.innerText;
			presenceData.state = " by " + author.innerText;
		} else if (document.location.pathname.includes("/settings")) {
			presenceData.details = "Managing their settings";
		} else if (document.location.pathname.includes("/notification")) {
			presenceData.details = "Viewing their notifications";
		} else if (document.location.pathname.includes("/login")) {
			presenceData.details = "Logging in...";
		} else if (document.location.pathname.includes("/register")) {
			presenceData.details = "Registering!";
		} else if (document.location.pathname.includes("/stats")) {
			presenceData.details = "Viewing Site Stats";
		} else if (document.location.pathname.includes("/unrated")) {
			presenceData.details = "Viewing Unrated Memes";
		} else if (document.location.pathname.includes("/transfers")) {
			presenceData.details = "Viewing Meme Transfers";
		} else if (document.location.pathname.includes("/staff")) {
			presenceData.details = "Viewing Staff Members";
		} else if (document.location.pathname.includes("/support")) {
			presenceData.details = "Viewing Support Pages";
		} else if (document.location.pathname.includes("/search")) {
			user = document.querySelector(
				"body > div.container > div > div > div > div > div.bootstrap-table.bootstrap4 > div.fixed-table-toolbar > div > input"
			);
			presenceData.details = "Searching for users";
			if (user != null && user.value != "" && user.value != null) {
				presenceData.state = '"' + user.value + '"';
			}
		} else if (document.location.pathname.includes("/api")) {
			presenceData.details = "Viewing the API";
		} else if (document.location.pathname.includes("/pro")) {
			presenceData.details = "Viewing the Pro Page";
		}
		if (presenceData.details == null) {
			presence.setTrayTitle();
			presence.setActivity();
		} else {
			presence.setActivity(presenceData);
		}
	})
);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsRUFFRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUMxQixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDcEMsQ0FBQyxDQUFDO0FBSUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBRWpDLElBQUksWUFBWSxHQUFHO1FBQ2YsYUFBYSxFQUFFLFdBQVc7S0FDN0IsQ0FBQztJQUVBLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3JDLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7S0FDNUM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBQztRQUMxRCxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUM1QyxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx5REFBeUQsQ0FBQyxDQUFBO1FBQ3ZGLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDO1FBQ3pFLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFDO1FBQzFELElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQzVDLEdBQUcs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
