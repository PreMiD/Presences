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
		clientId: "692230804402864148",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	});
presence.on("UpdateData", () =>
	__awaiter(this, void 0, void 0, function* () {
		var presenceData = {
			largeImageKey: "mini_logo",
			smallImageKey: actionPlay(),
			smallImageText: "suamusica.com.br",
			details: getTrackPlaying(),
			state: getArtistPlaying(),
			startTimestamp: 0,
			endTimestamp: 0,
		};
		if (presenceData.details == null) {
			presence.setTrayTitle();
			presence.setActivity();
		} else {
			presence.setActivity(presenceData);
		}
	})
);
function elementExist(element) {
	if (typeof element != "undefined" && element != null) {
		return true;
	} else {
		return false;
	}
}
function getTrackPlaying() {
	const element = document.querySelector("#trackInfo > a");
	if (elementExist(element) && element.innerHTML.length > 0) {
		return "🎧  " + firstLetterUp(element.innerHTML);
	} else {
		return "📀 Navegando...";
	}
}
function getArtistPlaying() {
	const element = document.querySelector("#trackInfo > span > a");
	if (elementExist(element) && element.innerHTML != " - ") {
		return "🎤  " + firstLetterUp(element.innerHTML);
	} else {
		return "🇧🇷 suamusica.com.br";
	}
}
function actionPlay() {
	const element = document.querySelector("a.btnPlayer.playPause.pause");
	if (elementExist(element)) {
		return "play";
	} else {
		return "pause";
	}
}
function firstLetterUp(str) {
	return str.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
		return a.toUpperCase();
	});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsRUFFRSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUMxQixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FFcEMsQ0FBQyxDQUFDO0FBRVAsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ2pDLElBQUksWUFBWSxHQUFHO1FBQ2YsYUFBYSxFQUFFLFdBQVc7UUFDMUIsYUFBYSxFQUFFLFVBQVUsRUFBRTtRQUMzQixjQUFjLEVBQUUsa0JBQWtCO1FBQ2xDLE9BQU8sRUFBRSxlQUFlLEVBQUU7UUFDMUIsS0FBSyxFQUFFLGdCQUFnQixFQUFFO1FBQ3pCLGNBQWMsRUFBRSxDQUFDO1FBQ2pCLFlBQVksRUFBRSxDQUFDO0tBQ2xCLENBQUM7SUFFRixJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQzlCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDMUI7U0FBTTtRQUNILFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDdEM7QUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBTUgsU0FBUyxZQUFZLENBQUMsT0FBTztJQUN6QixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxXQUFXLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtRQUNwRCxPQUFPLElBQUksQ0FBQztLQUNmO1NBQU07UUFDSCxPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNMLENBQUM7QUFLRCxTQUFTLGVBQWU7SUFDcEIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pELElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN2RCxPQUFPLE1BQU0sR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3BEO1NBQU07UUFDSCxPQUFPLGlCQUFpQixDQUFDO0tBQzVCO0FBQ0wsQ0FBQztBQUtELFNBQVMsZ0JBQWdCO0lBQ3JCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUNoRSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxJQUFJLEtBQUssRUFBRTtRQUNyRCxPQUFPLE1BQU0sR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3BEO1NBQU07UUFDSCxPQUFPLHVCQUF1QixDQUFDO0tBQ2xDO0FBQ0wsQ0FBQztBQUtELFNBQVMsVUFBVTtJQUNmLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUN0RSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN2QixPQUFPLE1BQU0sQ0FBQztLQUNqQjtTQUFNO1FBQ0gsT0FBTyxPQUFPLENBQUM7S0FDbEI7QUFDTCxDQUFDO0FBS0QsU0FBUyxhQUFhLENBQUMsR0FBRztJQUN0QixPQUFPLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUYsQ0FBQyJ9
