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

const presence = new Presence({ clientId: "653156362548805652" });
const pages = {
	"/docs": "Documention",
	"/login": "Login Page",
};

presence.on("UpdateData", () =>
	__awaiter(this, void 0, void 0, function* () {
		const page = document.location.pathname;
		const head = document.querySelector(
			"#page-wrapper > div > div > div > div > div.panel-heading"
		);

		let data = {
			largeImageKey: "ap-logo_new",
			startTimestamp: Math.floor(Date.now() / 1000),
		};

		if (pages[page] || pages[page.slice(0, -1)]) {
			data.details = pages[page] || pages[page.slice(0, -1)];
		} else if (head && head.textContent == "Configuration Editor") {
			data.details = "Configuration Page";
		} else if (head && head.textContent == "Infractions") {
			data.details = "Infraction List";
		} else if (head && head.textContent == "Guild Weekly Message Throughput") {
			data.details = "Guild Stats";
		} else if (head && head.textContent == " Guild Banner") {
			data.details = "Guild Info Page";
		} else {
			data.details = "Read to Documentation";
		}

		if (data.details && data.details != "") presence.setActivity(data);
	})
);
