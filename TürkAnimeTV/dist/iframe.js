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
var iframe = new iFrame();
iframe.on("UpdateData", () =>
	__awaiter(this, void 0, void 0, function* () {
		let video = document.querySelector("video");
		if (video) {
			let videoMessage = {
				paused: video.paused,
				duration: video.duration,
				currentTime: video.currentTime,
			};
			iframe.send(videoMessage);
		}
	})
);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFHMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBRS9CLElBQUksS0FBSyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTlELElBQUksS0FBSyxFQUFFO1FBRVAsSUFBSSxZQUFZLEdBQVE7WUFDcEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1lBQ3BCLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtZQUN4QixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7U0FDakMsQ0FBQTtRQUdELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FFN0I7QUFJTCxDQUFDLENBQUEsQ0FBQyxDQUFDIn0=
