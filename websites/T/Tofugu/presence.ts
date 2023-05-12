const presence = new Presence({
		clientId: "958766344311025786",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/9UDFSMZ.png",
		startTimestamp: browsingTimestamp,
	};

	switch (location.host) {
		case "www.tofugu.com": {
			const [, category, path] = location.pathname.split("/");
			switch (category) {
				case "": {
					presenceData.details = "Viewing the homepage";
					break;
				}
				case "japanese": {
					if (path) {
						presenceData.details = "Viewing a Japanese article";
						presenceData.state =
							document.querySelector(".article-highlight").textContent;
					} else {
						presenceData.details = "Viewing category";
						presenceData.state = document.querySelector("h1 > a").textContent;
					}
					break;
				}
				case "interviews": {
					if (path) {
						presenceData.details = "Viewing an interview article";
						presenceData.state =
							document.querySelector(".article-highlight").textContent;
					} else {
						presenceData.details = "Viewing category";
						presenceData.state = document.querySelector("h1 > a").textContent;
					}
					break;
				}
				case "reviews": {
					if (path) {
						presenceData.details = "Viewing a review article";
						presenceData.state =
							document.querySelector(".article-highlight").textContent;
					} else {
						presenceData.details = "Viewing category";
						presenceData.state = document.querySelector("h1 > a").textContent;
					}
					break;
				}
				case "news": {
					if (path) {
						presenceData.details = "Viewing a news article";
						presenceData.state = document.querySelector("h2").textContent;
					} else {
						presenceData.details = "Viewing category";
						presenceData.state = document.querySelector("h1 > a").textContent;
					}
					break;
				}
				case "travel": {
					if (path) {
						presenceData.details = "Viewing a travel article";
						presenceData.state =
							document.querySelector(".article-highlight").textContent;
					} else {
						presenceData.details = "Viewing category";
						presenceData.state = document.querySelector("h1 > a").textContent;
					}
					break;
				}
				case "japanese-grammar": {
					if (path) {
						presenceData.details = "Viewing a Japanese grammar article";
						presenceData.state =
							document.querySelector(".article-highlight").textContent;
					} else {
						presenceData.details = "Viewing category";
						presenceData.state = document.querySelector("h1 > a").textContent;
					}
					break;
				}
				case "japanese-learning-resources-database": {
					if (path) {
						presenceData.details =
							"Viewing a Japanese learning resource article";
						presenceData.state =
							document.querySelector(".article-highlight").textContent;
					} else {
						presenceData.details = "Viewing category";
						presenceData.state = document.querySelector("h1 > a").textContent;
					}
					break;
				}
				case "japan": {
					if (path) {
						presenceData.details = "Viewing a Japan article";
						presenceData.state =
							document.querySelector(".article-highlight").textContent;
					} else {
						presenceData.details = "Viewing category";
						presenceData.state = document.querySelector("h1 > a").textContent;
					}
					break;
				}
				case "series": {
					if (path) {
						presenceData.details = "Viewing an article series";
						presenceData.state =
							document.querySelector(".article-highlight").textContent;
					} else {
						presenceData.details = "Viewing category";
						presenceData.state = document.querySelector("h1 > a").textContent;
					}
					break;
				}
				case "jobs": {
					if (path) {
						presenceData.details = "Viewing a job listing";
						presenceData.state = document.querySelector("h2").textContent;
					} else presenceData.details = "Viewing job listings";

					break;
				}
				default: {
					presenceData.details = "Browsing";
					presenceData.state = document.querySelector("h1 > a").textContent;
				}
			}
			break;
		}
		case "kana-quiz.tofugu.com": {
			switch (document.querySelector(".App > div").className) {
				case "start": {
					presenceData.details = "Preparing to practice kana";
					presenceData.state =
						document.querySelector<HTMLLabelElement>(".check").htmlFor ===
						"practice-hiragana"
							? "Hiragana"
							: "Katakana";
					break;
				}
				case "quiz-page": {
					presenceData.details = "Practicing kana";
					presenceData.state =
						document.querySelector(".focused-card span").textContent;
					break;
				}
				case "results": {
					const [, correct, total, percent] = document
						.querySelector(".results > h3")
						.textContent.match(/.*?(\d+)\/(\d+).*?([\d.]+)/);
					presenceData.details = "Viewing kana quiz results";
					presenceData.state = `${correct}/${total} (${percent}%)`;
					break;
				}
			}
			break;
		}
	}

	presence.setActivity(presenceData);
});
