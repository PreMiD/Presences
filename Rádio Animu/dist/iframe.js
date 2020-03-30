var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
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
					: new P(function (resolve) {
							resolve(result.value);
					  }).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
var iframe = new iFrame();
iframe.on("UpdateData", () =>
	__awaiter(this, void 0, void 0, function* () {
		if (
			document.querySelector("#playpause") !== null &&
			document.querySelector("#playpause").className == "playing"
		) {
			iframe.send({
				iframe_radio: {
					artist: document.querySelector(".status").textContent.split(" - ")[0],
					title: document.querySelector(".status").textContent.split(" - ")[1],
					playing: true,
				},
			});
		}
	})
);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztBQUMxQixNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDbEMsSUFDQyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUk7UUFDN0MsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxFQUMxRDtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDWCxZQUFZLEVBQUU7Z0JBQ2IsTUFBTSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLEtBQUssRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRSxPQUFPLEVBQUUsSUFBSTthQUNiO1NBQ0QsQ0FBQyxDQUFDO0tBQ0g7QUFDRixDQUFDLENBQUEsQ0FBQyxDQUFDIn0=
