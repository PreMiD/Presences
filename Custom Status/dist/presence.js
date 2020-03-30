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
	clientId: "673651706139246612",
});

presence.on("UpdateData", () =>
	__awaiter(this, void 0, void 0, function* () {
		const objectElement = document.querySelector("#object");

		if (
			objectElement &&
			objectElement.textContent &&
			JSON.parse(objectElement.textContent) &&
			Object.keys(JSON.parse(objectElement.textContent)).length > 0 &&
			JSON.parse(objectElement.textContent).details &&
			JSON.parse(objectElement.textContent).largeImageKey
		) {
			presence.setActivity(JSON.parse(objectElement.textContent));
		} else presence.setActivity();
	})
);
