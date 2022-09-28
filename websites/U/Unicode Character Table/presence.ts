const presence = new Presence({
		clientId: "1024322774782713977",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/oDtbM69.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, search } = window.location,
		pathSplit = pathname
			.split("/")
			.filter(x => x)
			.slice(1);

	switch (pathSplit[0] ?? "") {
		case "": {
			presenceData.details = "Browsing list of unicode characters";
			presenceData.state =
				document.querySelector<HTMLSpanElement>(".box__title").textContent;
			break;
		}
		case "alphabets": {
			if (pathSplit[1]) {
				presenceData.details = "Browsing alphabet";
				presenceData.state =
					document.querySelector<HTMLSpanElement>("h1").textContent;
			} else {
				presenceData.details = "Browsing list of alphabets";
			}
			break;
		}
		case "alt-codes": {
			presenceData.details = "Browsing list of Windows alt codes";
			break;
		}
		case "blocks": {
			presenceData.details = "Browsing unicode blocks";
			if (pathSplit[1]) {
				`${(presenceData.state =
					document.querySelector<HTMLHeadingElement>("h1").textContent)} (${
					document
						.querySelector<HTMLSpanElement>(".page-content__info-range")
						.textContent.match(/([A-Z0-9]{4,6}—[A-Z0-9]{4,6})/)[1]
				})`;
			}
			break;
		}
		case "emoji": {
			presenceData.details = "Browsing list of emojis";
			if (pathSplit[1]) {
				presenceData.state =
					document.querySelector<HTMLHeadingElement>("h1").textContent;
			}
			break;
		}
		case "holidays": {
			if (pathSplit[1]) {
				presenceData.details = "Browsing holiday symbols";
				presenceData.state =
					document.querySelector<HTMLHeadingElement>("h1").textContent;
			} else {
				presenceData.details = "Browsing list of holiday sets";
			}
			break;
		}
		case "html-entities": {
			presenceData.details = "Browsing list of HTML entities";
			break;
		}
		case "kaomoji": {
			presenceData.details = "Browsing list of kaomoji";
			break;
		}
		case "search": {
			presenceData.details = "Searching for characters";
			presenceData.state = new URLSearchParams(search).get("q");
			break;
		}
		case "sets": {
			presenceData.details = "Browsing symbol sets";
			if (pathSplit[1]) {
				presenceData.state =
					document.querySelector<HTMLHeadingElement>("h1").textContent;
			}
			break;
		}
		case "text-art": {
			presenceData.details = "Browsing text art";
			break;
		}
		case "tools": {
			switch (pathSplit[1] ?? "") {
				case "": {
					presenceData.details = "Browsing list of tools";
					break;
				}
				case "braile": {
					presenceData.details = "Using the Braille translator";
					break;
				}
				case "decoder": {
					presenceData.details = "Using the Unicode decoder";
					break;
				}
				case "encoder": {
					presenceData.details = "Using the HTML encoder";
					break;
				}
				case "flip": {
					presenceData.details = "Using the flip text tool";
					break;
				}
				case "generator": {
					presenceData.details = "Using the Unicode table generator";
					break;
				}
				case "gothic": {
					presenceData.details = "Using the Gothic-style text generator";
					break;
				}
				case "morse": {
					presenceData.details = "Using the Morse code converter";
					break;
				}
				case "nickname-generator": {
					presenceData.details = "Using the stylish text generator";
					break;
				}
				case "password-generator": {
					presenceData.details = "Using the password generator";
					break;
				}
				case "register-converter": {
					presenceData.details = "Using the case converter";
					break;
				}
				case "strikethrough-text": {
					presenceData.details = "Using the strikethrough text generator";
					break;
				}
				case "text-to-symbols": {
					presenceData.details = "Using the text to symbols converter";
					break;
				}
				case "word-counter": {
					presenceData.details = "Using the word counter";
					break;
				}
			}
			break;
		}
		default: {
			if (/^[0-9A-F]{4,6}$/.test(pathSplit[0])) {
				presenceData.details = "Viewing a unicode character";
				presenceData.state =
					document.querySelector<HTMLHeadingElement>(
						"#symbol-title"
					).textContent;
				presenceData.smallImageKey = document.querySelector<HTMLImageElement>(
					".symbol__item-symbol"
				)?.src;
				presenceData.buttons = [
					{
						label: "View character",
						url: href,
					},
				];
			} else {
				presenceData.details = "Browsing";
				presenceData.state =
					document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
					document.title.match(/(.+) - Unicode Character Table$/)[1];
			}
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
