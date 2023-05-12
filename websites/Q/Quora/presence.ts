const presence = new Presence({
		clientId: "798449961691250709",
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

let question, taxonomy, account: string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/WBwFUzx.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname.match(/[A-Za-z]+.quora.com/)) {
		if (document.location.hostname.match(/[A-Za-z]{4,}.quora.com/)) {
			taxonomy = document.querySelector(
				"#mainContent > div.q-flex.qu-alignItems--center.qu-flexWrap--wrap > div > span > span > a > span > span > span"
			).textContent;
			presenceData.details = "Viewing space:";
			presenceData.state = taxonomy;
		} else {
			switch (document.location.pathname) {
				case "/": {
					presenceData.details = "Viewing homepage";
					break;
				}
				case "/notifications": {
					presenceData.details = "Viewing notifications";
					break;
				}
				case "/following": {
					presenceData.details = "Viewing feed";
					break;
				}
				case "/answer": {
					presenceData.details = "Viewing questions to be answered";
					break;
				}
				case "/answer/requests": {
					presenceData.details = "Viewing answer requests";
					break;
				}
				case "/answer/answer_later": {
					presenceData.details = "Viewing answer drafts";
					break;
				}
				default:
					if (document.location.pathname.includes("/topic/")) {
						taxonomy = document.querySelector(
							"#mainContent > div:nth-child(1) > div > div > div.q-flex.qu-flexDirection--column.qu-justifyContent--space-around.qu-ml--medium > div.CssComponent-sc-1oskqb9-0.EditWrapper___StyledCssComponent-sc-6vsimt-0.feqBgP > div > div.q-box.qu-display--inline-block > div > span > span > span > span"
						).textContent;
						presenceData.details = "Viewing topic:";
						presenceData.state = taxonomy;
					} else if (document.location.pathname.includes("/profile/")) {
						account = document.querySelector(
							"#mainContent > div.q-flex.qu-flexDirection--column > div > div.q-flex.qu-flexDirection--column > div.q-flex.qu-alignItems--flex-start.qu-justifyContent--space-between > div.CssComponent-sc-1oskqb9-0.EditWrapper___StyledCssComponent-sc-6vsimt-0.feqBgP > div > div.q-box.qu-display--inline-block > div > div > div > div > span"
						).textContent;
						presenceData.details = "Viewing profile:";
						presenceData.state = account;
					} else if (
						document.location.pathname.match(/^\/[A-Za-z0-9%-]+\/answer\//)
					) {
						question = document.querySelector(
							"#mainContent > div > div.q-box.qu-borderAll.qu-borderRadius--small.qu-borderColor--raised.qu-boxShadow--small.qu-bg--raised > div.q-box.qu-pt--medium.qu-px--medium.qu-pb--tiny > div.q-box.qu-mb--medium.qu-mt--small > div > span > span > a > div > div > div > div > span > span"
						).textContent;
						account = document.querySelector(
							"#mainContent > div > div.q-box.qu-borderAll.qu-borderRadius--small.qu-borderColor--raised.qu-boxShadow--small.qu-bg--raised > div.q-box.qu-pt--medium.qu-px--medium.qu-pb--tiny > div.q-box.qu-mb--small > div > div > div.q-box.qu-alignSelf--center.qu-flex--auto > div.q-text.qu-dynamicFontSize--regular.qu-truncateLines--3.qu-passColorToLinks > span > span.CssComponent-sc-1oskqb9-0.AbstractSeparatedItems___StyledCssComponent-sc-46kfvf-0.bxBZxD > span.q-text.qu-bold > div > div > div > div > div > a > div > span"
						).textContent;
						presenceData.details = `Viewing ${account}'s answer for:`;
						presenceData.state = question;
					} else if (document.location.pathname.match(/^\/[A-Za-z0-9%-]+/)) {
						question = document.querySelector(
							"#mainContent > div.q-box.qu-borderBottom > div > div.q-text.qu-dynamicFontSize--xlarge.qu-bold.qu-color--gray_dark_dim.qu-passColorToLinks.qu-lineHeight--regular > span > span > div > div > div > span > span"
						).textContent;
						presenceData.details = "Viewing question:";
						presenceData.state = question;
					}
			}
		}

		if (!presenceData.details) presence.setActivity();
		else presence.setActivity(presenceData);
	}
});
