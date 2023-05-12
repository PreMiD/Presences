const presence = new Presence({
	clientId: "630101652380188692",
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

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/YFnN57M.png",
	};

	if (window.location.href.includes(".glitch.me")) {
		presenceData.details = "Viewing a webpage";
		presenceData.state = window.location.hostname;
	} else if (window.location.href.includes("status.glitch.com"))
		presenceData.details = "https://status.glitch.com";
	else if (window.location.href.includes("support.glitch.com")) {
		if (window.location.pathname.toLowerCase() === "/") {
			presenceData.details = "Viewing support topics";
			presenceData.state = "Latest topics";
		} else if (window.location.pathname.toLowerCase() === "/latest") {
			presenceData.details = "Viewing support topics";
			presenceData.state = "Latest topics";
		} else if (window.location.pathname.toLowerCase() === "/new") {
			presenceData.details = "Viewing support topics";
			presenceData.state = "New topics";
		} else if (window.location.pathname.toLowerCase() === "/unread") {
			presenceData.details = "Viewing support topics";
			presenceData.state = "Unread topics";
		} else if (window.location.pathname.toLowerCase() === "/top") {
			presenceData.details = "Viewing support topics";
			presenceData.state = "Top topics";
		} else if (window.location.pathname.toLowerCase() === "/categories") {
			presenceData.details = "Viewing support topics";
			presenceData.state = "Categories";
		} else if (
			window.location.href.toLowerCase().includes("support.glitch.com/t/")
		) {
			presenceData.details = "Viewing a topic:";
			presenceData.state = document.title;
		} else if (
			window.location.href.toLowerCase().includes("support.glitch.com/u/")
		) {
			presenceData.details = "Viewing a user profile:";
			presenceData.state = document.querySelector(
				"body > section > div > div > div > section > section > div > div > div > div > h2 "
			).textContent;
		}
	} else {
		presenceData.details = "Viewing a page:";
		if (window.location.pathname.toLowerCase() === "/")
			presenceData.state = "Homepage";
		else if (window.location.pathname.toLowerCase().includes("/questions")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Questions";
		} else if (window.location.pathname.toLowerCase().includes("/create")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Create";
		} else if (window.location.pathname.toLowerCase().includes("/about")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "About";
		} else if (window.location.pathname.toLowerCase().includes("/culture")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Blog & Culture";
		} else if (window.location.pathname.toLowerCase().includes("/help")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Help & FAQ";
		} else if (window.location.pathname.toLowerCase().includes("/legal")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Legal";
		} else if (window.location.pathname.toLowerCase().includes("edit")) {
			presenceData.details = "Editing a project:";
			presenceData.state = document.querySelector(
				"body > div > div > header > nav > button > div > span"
			).textContent;
		} else if (window.location.pathname.toLowerCase().includes("~")) {
			presenceData.details = "Viewing a project:";
			presenceData.state = window.location.pathname.replace("/", "");
		} else if (window.location.pathname.toLowerCase().includes("@")) {
			presenceData.details = "Viewing a team or user:";
			presenceData.state = window.location.pathname.replace("/", "");
		} else delete presenceData.details;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
