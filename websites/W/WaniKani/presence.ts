const presence: Presence = new Presence({
		clientId: "800166344023867443"
	}),
	largeImageKey = "logo",
	browsingTimestamp = Math.floor(Date.now() / 1000);

function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

presence.on("UpdateData", () => {
	const { hostname, pathname } = window.location,
		presenceData: PresenceData = {
			startTimestamp: browsingTimestamp
		};

	let details: string,
		state: string,
		smallImageKey: string,
		smallImageText: string;

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
						const lessons = +buttons[0].querySelector("span").textContent,
							reviews = +buttons[1].querySelector("span").textContent;
						details = "Viewing Dashboard";
						state = `${lessons} lessons | ${reviews} reviews`;
						smallImageText = document.querySelector(
							".user-summary__attribute > a"
						).textContent;
						if (lessons > reviews) {
							if (lessons < 25) smallImageKey = "lessons-1";
							else if (lessons < 50) smallImageKey = "lessons-25";
							else if (lessons < 100) smallImageKey = "lessons-50";
							else if (lessons < 250) smallImageKey = "lessons-100";
							else if (lessons < 500) smallImageKey = "lessons-250";
							else smallImageKey = "lessons-500";
						} else if (reviews < 1) smallImageKey = "reviews-0";
						else if (reviews < 50) smallImageKey = "reviews-1";
						else if (reviews < 100) smallImageKey = "reviews-50";
						else if (reviews < 250) smallImageKey = "reviews-100";
						else if (reviews < 500) smallImageKey = "reviews-250";
						else if (reviews < 1000) smallImageKey = "reviews-500";
						else smallImageKey = "reviews-1000";
					} else {
						details = "Browsing...";
						state = "Viewing Home Page";
					}
					break;
				}
				case "/review":
				case "/lesson": {
					details = "Browsing...";
					state =
						pathname === "/lesson"
							? "Viewing Lesson Summary"
							: "Viewing Reviews Summary";
					break;
				}
				case "/extra_study/session": {
					const characterElement = document.querySelector("#character"),
						characterType = characterElement.className;
					details = `Doing ${
						document.querySelector("#menu-bar-title").textContent
					}`;
					state = `${characterElement.textContent} | ${capitalize(
						characterType
					)} ${capitalize(document.querySelector("#question-type").className)}`;
					smallImageText = `${
						document.querySelector("#completed-count").textContent
					} complete, ${
						document.querySelector("#available-count").textContent
					} remaining. (${
						document.querySelector("#correct-rate").textContent
					}%)`;
					smallImageKey = characterType;
					break;
				}
				case "/review/session": {
					const characterElement = document.querySelector("#character"),
						characterType = characterElement.className;
					details = "Doing Reviews";
					state = `${characterElement.textContent} | ${capitalize(
						characterType
					)} ${capitalize(document.querySelector("#question-type").className)}`;
					smallImageText = `${
						document.querySelector("#completed-count").textContent
					} complete, ${
						document.querySelector("#available-count").textContent
					} remaining. (${
						document.querySelector("#correct-rate").textContent
					}%)`;
					smallImageKey = characterType;
					break;
				}
				case "/lesson/session": {
					try {
						const totalStats = document.querySelectorAll("#stats li > span"),
							characterType = document.querySelector("#main-info").className;
						details = "Learning Lessons";
						state = `${document.querySelector("#character").textContent} - ${
							document.querySelector("#meaning").textContent
						}`;
						smallImageKey = characterType;
						smallImageText = `${totalStats[0].textContent} radicals | ${
							totalStats[1].textContent
						} kanji | ${totalStats[2].textContent} vocab | ${
							document.querySelector("#completed-count").textContent
						} complete`;
					} catch (err) {
						// Likely practicing
						const characterType =
								document.querySelector("#main-info").className,
							totalStats = document.querySelectorAll("#stats li > span");
						details = "Practicing Lessons";
						state = `${
							document.querySelector("#character").textContent
						} | ${capitalize(characterType)} ${capitalize(
							document.querySelector("#question-type").className
						)}`;
						smallImageKey = characterType;
						smallImageText = `${totalStats[0].textContent} radicals | ${
							totalStats[1].textContent
						} kanji | ${totalStats[2].textContent} vocab | ${
							document.querySelector("#completed-count").textContent
						} complete`;
					}
					break;
				}
				case (pathname.match(/^\/(radicals|kanji|vocabulary)\/.+$/) || {})
					.input: {
					const [, type] = pathname.split("/");
					let textDescription =
						document.querySelector(".mnemonic-content").textContent;
					if (textDescription.length >= 50)
						textDescription = `${textDescription.substring(0, 50)}...`;

					details = `Browsing ${capitalize(type)}`;
					state = `${
						document.querySelector(`.${type.replace(/s$/, "")}-icon`)
							.textContent
					} | ${
						document.querySelector(`.${type.replace(/s$/, "")}-icon`).parentNode
							.childNodes[4].textContent
					}`;
					smallImageText = textDescription;
					smallImageKey = type.replace(/s$/, "");
					break;
				}
				case (pathname.match(/^\/users\/.+$/) || {}).input: {
					details = "Viewing User Profile";
					state = document.querySelector(".username").textContent;
					smallImageKey = "avatar";
					break;
				}
				default: {
					details = "Browsing...";
					state = `Viewing ${document.title.split(" / ").slice(1).join(" / ")}`;
				}
			}
			break;
		}
		case "knowledge.wanikani.com": {
			details = "Browsing WaniKani Knowledge...";
			[state] = document.title.split(" | ");
			break;
		}
		case "community.wanikani.com": {
			if (/^\/u\/.+$/.test(pathname)) {
				details = "Viewing User Profile";
				smallImageKey = "avatar";
				state = document.querySelector(".username").textContent;
				break;
			}
			details = "Browsing WaniKani Community...";
			[state] = document.title.split(" - ");
			break;
		}
	}

	if (details) presenceData.details = details;

	if (state) presenceData.state = state;

	if (smallImageKey) presenceData.smallImageKey = smallImageKey;

	if (smallImageText) presenceData.smallImageText = smallImageText;

	presenceData.largeImageKey = largeImageKey;

	presence.setActivity(presenceData);
});
