const presence: Presence = new Presence({
		clientId: "800166344023867443",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTypeAsset(string: string) {
	switch (string.toLowerCase()) {
		case "kanji":
			return Assets.Kanji;
		case "radical":
			return Assets.Radical;
		case "vocabulary":
			return Assets.Vocabulary;
		default:
			return null;
	}
}

const enum Assets {
	Logo = "https://i.imgur.com/NdlB8M5.png",
	Avatar = "https://i.imgur.com/WktQVUN.png",
	Kanji = "https://i.imgur.com/3VQ6BhT.png",
	Radical = "https://i.imgur.com/k9mTFJ6.png",
	Vocabulary = "https://i.imgur.com/eyykDXt.png",
	Lessons0 = "https://i.imgur.com/p8sMdUY.png",
	Lessons1 = "https://i.imgur.com/XbtRrhO.png",
	Lessons25 = "https://i.imgur.com/m4rS03b.png",
	Lessons50 = "https://i.imgur.com/cbFgaEd.png",
	Lessons100 = "https://i.imgur.com/MduMzt8.png",
	Lessons250 = "https://i.imgur.com/bOmgrNx.png",
	Lessons500 = "https://i.imgur.com/0IOnYWQ.png",
	Reviews0 = "https://i.imgur.com/ObYQyy4.png",
	Reviews1 = "https://i.imgur.com/wyokDrz.png",
	Reviews50 = "https://i.imgur.com/JX6TIer.png",
	Reviews100 = "https://i.imgur.com/zkb6BKC.png",
	Reviews250 = "https://i.imgur.com/t5bywqD.png",
	Reviews500 = "https://i.imgur.com/5ZzUjZC.png",
	Reviews1000 = "https://i.imgur.com/FANzfMN.png",
}

presence.on("UpdateData", () => {
	const { hostname, pathname } = document.location,
		presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		};

	switch (hostname) {
		case "wanikani.com":
		case "www.wanikani.com": {
			switch (pathname) {
				case "/":
				case "/dashboard":
				case "/login": {
					const buttons = document.querySelectorAll(
						".lessons-and-reviews__button"
					);
					if (buttons.length === 2) {
						const lessons =
								+buttons[0].querySelector<HTMLSpanElement>("span").textContent,
							reviews =
								+buttons[1].querySelector<HTMLSpanElement>("span").textContent;
						presenceData.details = "Viewing Dashboard";
						presenceData.state = `${lessons} lessons | ${reviews} reviews`;
						presenceData.smallImageText =
							document.querySelector<HTMLAnchorElement>(
								".user-summary__attribute > a"
							).textContent;
						if (lessons > reviews) {
							if (lessons < 25) presenceData.smallImageKey = Assets.Lessons1;
							else if (lessons < 50)
								presenceData.smallImageKey = Assets.Lessons25;
							else if (lessons < 100)
								presenceData.smallImageKey = Assets.Lessons50;
							else if (lessons < 250)
								presenceData.smallImageKey = Assets.Lessons100;
							else if (lessons < 500)
								presenceData.smallImageKey = Assets.Lessons250;
							else presenceData.smallImageKey = Assets.Lessons500;
						} else if (reviews < 1)
							presenceData.smallImageKey = Assets.Reviews0;
						else if (reviews < 50) presenceData.smallImageKey = Assets.Reviews1;
						else if (reviews < 100)
							presenceData.smallImageKey = Assets.Reviews50;
						else if (reviews < 250)
							presenceData.smallImageKey = Assets.Reviews100;
						else if (reviews < 500)
							presenceData.smallImageKey = Assets.Reviews250;
						else if (reviews < 1000)
							presenceData.smallImageKey = Assets.Reviews500;
						else presenceData.smallImageKey = Assets.Reviews1000;
					} else {
						presenceData.details = "Browsing";
						presenceData.state = "Viewing Home Page";
					}
					break;
				}
				case "/review":
				case "/lesson": {
					presenceData.details = "Browsing";
					presenceData.state =
						pathname === "/lesson"
							? "Viewing Lesson Summary"
							: "Viewing Reviews Summary";
					break;
				}
				case "/extra_study/session": {
					const characterElement =
							document.querySelector<HTMLDivElement>("#character"),
						characterType = characterElement.className;
					presenceData.details = `Doing ${
						document.querySelector<HTMLDivElement>("#menu-bar-title")
							.textContent
					}`;
					presenceData.state = `${characterElement.textContent} | ${capitalize(
						characterType
					)} ${capitalize(
						document.querySelector<HTMLDivElement>("#question-type").className
					)}`;
					presenceData.smallImageText = `${
						document.querySelector<HTMLSpanElement>("#completed-count")
							.textContent
					} complete, ${
						document.querySelector<HTMLSpanElement>("#available-count")
							.textContent
					} remaining. (${
						document.querySelector<HTMLSpanElement>("#correct-rate").textContent
					}%)`;
					presenceData.smallImageKey = getTypeAsset(characterType);
					break;
				}
				case "/review/session": {
					const characterElement =
							document.querySelector<HTMLDivElement>("#character"),
						characterType = characterElement.className;
					presenceData.details = "Doing Reviews";
					presenceData.state = `${characterElement.textContent} | ${capitalize(
						characterType
					)} ${capitalize(
						document.querySelector<HTMLDivElement>("#question-type").className
					)}`;
					presenceData.smallImageText = `${
						document.querySelector<HTMLSpanElement>("#completed-count")
							.textContent
					} complete, ${
						document.querySelector<HTMLSpanElement>("#available-count")
							.textContent
					} remaining. (${
						document.querySelector<HTMLSpanElement>("#correct-rate").textContent
					}%)`;
					presenceData.smallImageKey = getTypeAsset(characterType);
					break;
				}
				case "/lesson/session": {
					try {
						const totalStats = document.querySelectorAll("#stats li > span");
						presenceData.details = "Learning Lessons";
						presenceData.state = `${
							document.querySelector<HTMLDivElement>("#character").textContent
						} - ${
							document.querySelector<HTMLDivElement>("#meaning").textContent
						}`;
						presenceData.smallImageKey = getTypeAsset(
							document.querySelector<HTMLDivElement>("#main-info").className
						);
						presenceData.smallImageText = `${
							totalStats[0].textContent
						} radicals | ${totalStats[1].textContent} kanji | ${
							totalStats[2].textContent
						} vocab | ${
							document.querySelector<HTMLSpanElement>("#completed-count")
								.textContent
						} complete`;
					} catch (err) {
						// Likely practicing
						const characterType =
								document.querySelector<HTMLDivElement>("#main-info").className,
							totalStats = document.querySelectorAll("#stats li > span");
						presenceData.details = "Practicing Lessons";
						presenceData.state = `${
							document.querySelector<HTMLDivElement>("#character").textContent
						} | ${capitalize(characterType)} ${capitalize(
							document.querySelector<HTMLDivElement>("#question-type").className
						)}`;
						presenceData.smallImageKey = getTypeAsset(characterType);
						presenceData.smallImageText = `${
							totalStats[0].textContent
						} radicals | ${totalStats[1].textContent} kanji | ${
							totalStats[2].textContent
						} vocab | ${
							document.querySelector<HTMLSpanElement>("#completed-count")
								.textContent
						} complete`;
					}
					break;
				}
				case (pathname.match(/^\/(radicals|kanji|vocabulary)\/.+$/) || {})
					.input: {
					const [, type] = pathname.split("/");
					let textDescription =
						document.querySelector<HTMLElement>(
							".mnemonic-content"
						).textContent;
					if (textDescription.length >= 50)
						textDescription = `${textDescription.substring(0, 50)}...`;

					presenceData.details = `Browsing ${capitalize(type)}`;
					presenceData.state = `${
						document.querySelector<HTMLSpanElement>(
							`.${type.replace(/s$/, "")}-icon`
						).textContent
					} | ${
						document.querySelector<HTMLSpanElement>(
							`.${type.replace(/s$/, "")}-icon`
						).parentNode.childNodes[4].textContent
					}`;
					presenceData.smallImageText = textDescription;
					presenceData.smallImageKey = getTypeAsset(type.replace(/s$/, ""));
					break;
				}
				case (pathname.match(/^\/users\/.+$/) || {}).input: {
					presenceData.details = "Viewing User Profile";
					presenceData.state =
						document.querySelector<HTMLSpanElement>(".username").textContent;
					presenceData.smallImageKey = Assets.Avatar;
					break;
				}
				default: {
					presenceData.details = "Browsing";
					presenceData.state = `Viewing ${document.title
						.split(" / ")
						.slice(1)
						.join(" / ")}`;
				}
			}
			break;
		}
		case "knowledge.wanikani.com": {
			presenceData.details = "Browsing WaniKani Knowledge";
			presenceData.state = document.title.split(" | ")[0];
			break;
		}
		case "community.wanikani.com": {
			if (/^\/u\/.+$/.test(pathname)) {
				presenceData.details = "Viewing User Profile";
				presenceData.smallImageKey = Assets.Avatar;
				presenceData.state =
					document.querySelector<HTMLHeadingElement>(".username").textContent;
				break;
			}
			presenceData.details = "Browsing WaniKani Community";
			presenceData.state = document.title.split(" - ")[0];
			break;
		}
	}

	presence.setActivity(presenceData);
});
