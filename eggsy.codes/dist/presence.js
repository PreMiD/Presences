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

const presence = new Presence({
	clientId: "653220659887079434",
});

presence.on("UpdateData", () =>
	__awaiter(this, void 0, void 0, function* () {
		/* THIS IS EASY AND EFFICIENT! */
		if (document.location.pathname != "/projects/premid/custom-status") {
			// Adding this, probably not needed but it's fine.
			const details = document.querySelector("[name~=premid-details][content]")
					? document.querySelector("[name~=premid-details][content]").content
					: null,
				state = document.querySelector("[name~=premid-state][content]")
					? document.querySelector("[name~=premid-state][content]").content
					: null,
				smallImage = document.querySelector(
					"[name~=premid-smallImage][content]"
				)
					? document.querySelector("[name~=premid-smallImage][content]").content
					: null;

			if (state && details)
				presence.setActivity({
					largeImageKey: "ec-logo",
					details: details,
					state: state,
					smallImageKey: smallImage ? smallImage : "SOMETHING-SKETCHY",
					startTimestamp: Math.floor(Date.now() / 1000),
				});
			else
				presence.setActivity({
					largeImageKey: "ec-logo",
					details: "Viewing a page:",
					state: "Homepage",
					startTimestamp: Math.floor(Date.now() / 1000),
				});
		}
	})
);
