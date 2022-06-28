const presence = new Presence({
	clientId: "991078618866274364",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/ar0zfXY.png",
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname;
	if (path === "/") presenceData.details = "Browsing...";
	else if (path.includes("/home")){
		presenceData.details = "On dashboard";
		presenceData.state = document.querySelectorAll("div[class='home-content'] > div > div > div > div > home > div > home-react > div > div > section > section > div > div > div > div")[0].textContent + " - Rank : " + document.querySelectorAll("div[class='home-content'] > div > div > div > div > home > div > home-react > div > div > section > section > div > div > div > div")[4].textContent;
	}
	else if (path.includes("/training")){

		if (path.includes("/training/easy/")) {
			presenceData.details = "Training: Easy";
			presenceData.state = document.querySelector("h1[class='title']").textContent + " (" + document.querySelector("div[class='chart-inner']").textContent+ "%)";
		} else  if (path.includes("/training/medium/")) {
			presenceData.details = "Training: Medium";
			presenceData.state = document.querySelector("h1[class='title']").textContent + " (" + document.querySelector("div[class='chart-inner']").textContent + "%)";
		} else if (path.includes("/training/hard/")) {
			presenceData.details = "Training: Hard";
			presenceData.state = document.querySelector("h1[class='title']").textContent + " (" + document.querySelector("div[class='chart-inner']").textContent + "%)";
		} else if (path.includes("/training/expert/")) {
			presenceData.details = "Training: Hard";
			presenceData.state = document.querySelector("h1[class='title']").textContent + " (" + document.querySelector("div[class='chart-inner']").textContent + "%)";
		} else
				presenceData.details = "Looking at Practice";

	}
	else if (path.includes("/multiplayer"))
		if (path.includes("/multiplayer/clashofcode")) {
			presenceData.details = "Looking at Clash of Code";
			presenceData.state = "Rank : " + document.querySelector("span[class='rank-value']").textContent + " th";

		} else if (path.includes("/multiplayer/bot-programming")) {
			presenceData.details = "Training: Bot Programming";

			try {
				var nameLeague = document.querySelectorAll("div[id='content-details-league'] > div > div")[1].textContent
				presenceData.state = document.querySelector("h1[class='title']").textContent + " - Rank : " +nameLeague;

			} catch {
				presenceData.state = document.querySelector("h1[class='title']").textContent + " - Not yet solved";
			}
		} else if (path.includes("/multiplayer/codegolf")) {
			presenceData.details = "Training: Code Golf";
			try {
				var pourcent = document.querySelector("div[class='chart-inner']").textContent
				if (pourcent != "0")
					presenceData.state = document.querySelector("h1[class='title']").textContent + " (" + document.querySelector("span[class='rank-value']").textContent + document.querySelector("span[class='rank-suffix']").textContent + "/" + document.querySelector("span[class='rank-total']").textContent + ")";
				else
					presenceData.state = "Not yet solved";


			} catch {
				presenceData.state = document.querySelector("h1[class='title']").textContent + " (" + document.querySelector("span[class='rank-value']").textContent + document.querySelector("span[class='rank-suffix']").textContent + "/" + document.querySelector("span[class='rank-total']").textContent + ")";
			}

		} else if (path.includes("/multiplayer/optimization")) {
			presenceData.details = "Training: Optimization";
			try {
				var pourcent = document.querySelector("div[class='chart-inner']").textContent
				if (pourcent != "0")
					presenceData.state = document.querySelector("h1[class='title']").textContent + " (" + document.querySelector("span[class='rank-value']").textContent + document.querySelector("span[class='rank-suffix']").textContent + "/" + document.querySelector("span[class='rank-total']").textContent + ")";
				else
					presenceData.state = "Not yet solved";


			} catch {
				presenceData.state = document.querySelector("h1[class='title']").textContent + " (" + document.querySelector("span[class='rank-value']").textContent + document.querySelector("span[class='rank-suffix']").textContent + "/" + document.querySelector("span[class='rank-total']").textContent + ")";
			}
		} else
			presenceData.details = "Looking at Compete";


	else if (path.includes("/cooperate"))
		presenceData.details = "Looking at Cooperate";
	else if (path.includes("/cooperate"))
		presenceData.details = "Looking at Cooperate";
	else if (path.includes("/learn"))
		presenceData.details = "Looking at Learn";
	else if (path.includes("/events"))
		presenceData.details = "Looking at Events";
	else if (path.includes("/contribute/community"))
		presenceData.details = "Looking at Community";
	else if (path.includes("/contribute/my-contributions"))
		presenceData.details = "Looking at My Contributions";
	else if (path.includes("/live-streams"))
		presenceData.details = "Looking at Live Streams";
	else if (path.includes("/blog"))
		presenceData.details = "Looking at Blog";
	else if (path.includes("/forum"))
		presenceData.details = "Looking at Forum";
	else if (path.includes("/profile"))
		presenceData.details = "Looking at Profile";
	else if (path.includes("/settings"))
		presenceData.details = "Looking at Settings";
	else if (path.includes("/about"))
		presenceData.details = "Looking at Abouts";
	else if (path.includes("/careers"))
		presenceData.details = "Looking at Careers";
	else if (path.includes("/work"))
		presenceData.details = "Looking at Work";
	else if (path.includes("/legal/privacy-policy") && path.includes("/playgrounds"))
		presenceData.details = "Looking at Privacy Policy";
	else if (path.includes("/help-center"))
		presenceData.details = "Looking at FAQ";
	else if (path.includes("/start"))
		presenceData.details = "Not logged in";
	else if (path.includes("/ide")) {
		if (path.includes("/ide/puzzle/")) {
			presenceData.details = "Solving the challenge : " + document.querySelectorAll("h1[class='cg-ide-title'] > span")[document.querySelectorAll("h1[class='cg-ide-title'] > span").length - 1].textContent;
			try{
				var score = document.querySelector("span[class*='score-value']").textContent;
				if (score == "N/A")
					presenceData.state = "(0%)";
				else {
					try {
						var rank = document.querySelector("span[class='rank-value']").textContent;
						if (rank != "") {
							presenceData.state = rank + "th/" + document.querySelector("span[class='rank-total']").textContent;
						} else {
							presenceData.state = "(" + score + "%)";
						}
					} catch {
						presenceData.state = "(" + score + "%)";
					}
				}
			} catch {
				var rank = document.querySelector("span[class='league-value']").textContent;
				presenceData.state = "Rank : " + rank;
			}



		} else {
			presenceData.details = document.querySelectorAll("h1[class='cg-ide-title'] > span")[document.querySelectorAll("h1[class='cg-ide-title'] > span").length - 1].textContent;
			presenceData.state = "Time left : " + document.querySelector("span[class*='minutes']").textContent + "m : " + document.querySelector("span[class*='seconds']").textContent + "s";
		}


	} else if (path.includes("/clashofcode/clash/")) {
		presenceData.details = "Waiting for the Clash of Code";
		presenceData.buttons = [{ label: "Join the clash", url: document.querySelector("input[class='copy-url-button']").getAttribute("value") }]
	} else if (!path.includes("/legal/privacy-policy") &&path.includes("/playgrounds")){
		presenceData.details = document.querySelector("h1[class='playground_header-title'] > span").textContent;
		presenceData.state = "Learning";
	}

	if (presenceData.details)
		presence.setActivity(presenceData);
	else
		presence.setActivity();
});
