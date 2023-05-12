const presence = new Presence({
	clientId: "630550023133724692",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}
let deck;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/RPjfGtz.png",
		smallImageKey: "icon",
	};

	switch (document.location.pathname) {
		case "/": {
			presenceData.details = "Browsing Decks..";
			presenceData.state = "at Homepage";
			presenceData.smallImageText = "browsing";

			break;
		}
		case "/decklists": {
			presenceData.details = "Looking at Decklists";
			presenceData.state = `Page: ${
				document.querySelectorAll(".current")[0].firstElementChild.textContent
			} top: ${
				document.querySelector("#deck_lists").lastElementChild.firstElementChild
					.children[2].textContent
			} by ${
				document.querySelector("#deck_lists").lastElementChild.firstElementChild
					.children[1].ENTITY_NODE
			}`;
			presenceData.smallImageText = (
				document.querySelector("#deck_lists").lastElementChild.firstElementChild
					.children[2].firstElementChild as HTMLLinkElement
			).href;

			break;
		}
		case "/top_decks": {
			presenceData.details = "Looking at Top decks";
			presenceData.state = `Current Meta: ${document
				.querySelectorAll(".sortable")[0]
				.children[1].firstElementChild.children[1].textContent.replace(
					"Most Used Cards",
					""
				)}`;
			presenceData.largeImageKey = "banner";
			presenceData.smallImageKey = "icon";
			presenceData.smallImageText = "looking";

			break;
		}
		case "/top_cards": {
			presenceData.details = "Looking at Top Cards";
			(presenceData.state = `Top Card: ${
				document.querySelectorAll(".sortable")[0].children[1].firstElementChild
					.children[2].textContent
			} Price: ${
				document.querySelectorAll(".sortable")[0].children[1].firstElementChild
					.children[4].textContent
			}`),
				(presenceData.largeImageKey = "banner");
			presenceData.smallImageKey = "icon";
			presenceData.smallImageText = "looking";

			break;
		}
		case "/new_deck": {
			deck = (document.getElementsByName("deck_name")[0] as HTMLInputElement)
				.value;
			presenceData.details = "Building Deck";
			presenceData.state = `Editing: ${deck}`;
			presenceData.largeImageKey = "banner";
			presenceData.smallImageKey = "icon";
			presenceData.smallImageText = "creating deck";

			break;
		}
		default:
			if (
				document.location.pathname.includes("/deck") &&
				/\d/.test("/deck/8205")
			) {
				deck = document.querySelectorAll(".large-12.columns.panel")[0]
					.firstElementChild.textContent;
				presenceData.details = `Viewing deck: ${deck} (archetype: ${
					document.querySelectorAll(".large-12.columns.panel")[0].children[1]
						.children[10].textContent
				})`;
				presenceData.state = `by: ${
					document.querySelectorAll(".large-12.columns.panel")[0].children[1]
						.children[1].textContent
				}, price: ${
					document
						.querySelectorAll(".large-12.columns.panel")[1]
						.children[1].textContent.replace("\n", ":")
						.split(":")[1]
				}`;
				presenceData.largeImageKey = "banner";
				presenceData.smallImageKey = "icon";
				presenceData.smallImageText = document.location.href;
			}
	}
	presence.setActivity(presenceData);
});
