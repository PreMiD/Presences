const presence = new Presence({
	clientId: "1016312551958642698",
});

const enum Assets {
	LOGO = "large-image",
	CHART_SEARCH = "chart-search",
	CHART_HYPORANKED = "chart-hyporanked",
	CHART_EXPONENTIAL = "chart-exponential",
	CHART_HARD = "chart-hard",
	CHART_INTERMEDIATE = "chart-intermediate",
	CHART_EASY = "chart-easy",
	CHART_HISTORY = "chart-history",
	CHART_POSSESION = "chart-possesion",
	CHART_HOT = "chart-hot",
	CHART_COLD = "chart-cold",
	CHART_MULTIPLAYER = "chart-multiplayer",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		details: "Sorryfield",
		smallImageKey: Assets.LOGO,
	};
	if (
		document.location.pathname === "/" ||
		document.location.pathname === "/sorrygle" ||
		document.location.pathname.startsWith("/song/")
	) {
		presenceData.largeImageKey = Assets.LOGO;
		presenceData.smallImageKey = null;
	}
	if (document.location.pathname === "/")
		presenceData.details = "Viewing Homepage";
	if (document.location.pathname === "/sorrygle")
		presenceData.details = "Sorrygle";
	if (document.location.pathname.startsWith("/song/")) {
		presenceData.details = "Listening the song";
		const songName = document
			.querySelector(".title")
			.innerHTML.replace('<i class="icon fa-fw fas fa-music"></i>&nbsp;', "")
			.replace('<i class="icon fa-fw fas fa-lock"></i>&nbsp;', "")
			.replace('<span class="desc">&nbsp;', " ")
			.replace("</span>", "")
			.replace("&amp;", "&");
		let songArtist = document
			.querySelector(".song")
			.children[2].innerHTML.split("&nbsp;")[0];
		if (document.querySelector(".title").innerHTML.includes("fa-lock"))
			songArtist = `🔒 ${songArtist}`; // locked music
		presenceData.state = `${songArtist} - ${songName}`;
		presenceData.buttons = [
			{ label: "Listen the song", url: document.location.href },
		];
	}
	if (document.location.pathname === "/java") {
		if (document.location.href.includes("?")) {
			presenceData.details = "Java! Singleplay";
			const chartHeader = document.querySelector(".chart-header");
			presenceData.state = `${
				chartHeader.children[2].children[0].innerHTML
			} Lv.${document.querySelector(".level").innerHTML} / ${
				chartHeader.children[1].children[1].innerHTML
			} - ${chartHeader.children[1].children[0].innerHTML}`;
			presenceData.buttons = [
				{ label: "Play the chart", url: document.location.href },
			];
		} else {
			presenceData.details = "Java!";
			presenceData.state = "Selecting chart";
			const image = document
				.querySelector(".active")
				.children[0].innerHTML.replace(
					'<img class="disc" src="/media/images/chart-',
					""
				)
				.replace('.jpg">', "")
				.toUpperCase();
			let imageKey = "";

			switch (image) {
				case "SEARCH":
					imageKey = Assets.CHART_SEARCH;
					presenceData.state = "Searching charts";
					break;
				case "HYPORANKED":
					imageKey = Assets.CHART_HYPORANKED;
					break;
				case "EXPONENTIAL":
					imageKey = Assets.CHART_EXPONENTIAL;
					break;
				case "HARD":
					imageKey = Assets.CHART_HARD;
					break;
				case "INTERMEDIATE":
					imageKey = Assets.CHART_INTERMEDIATE;
					break;
				case "EASY":
					imageKey = Assets.CHART_EASY;
					break;
				case "HISTORY":
					imageKey = Assets.CHART_HISTORY;
					break;
				case "POSSESION":
					imageKey = Assets.CHART_POSSESION;
					break;
				case "HOT":
					imageKey = Assets.CHART_HOT;
					break;
				case "COLD":
					imageKey = Assets.CHART_COLD;
					break;
				case "MULTIPLAYER":
					imageKey = Assets.CHART_MULTIPLAYER;
					presenceData.state = "Selecting multiplayer room";
					break;
			}

			presenceData.largeImageKey = imageKey;
			presenceData.buttons = [
				{ label: "Play Java!", url: document.location.href },
			];
		}
	}
	if (document.location.pathname === "/java/multiplayer") {
		presenceData.details = "Java! Multiplayer";
		presenceData.largeImageKey = Assets.CHART_MULTIPLAYER;
		if (document.querySelector(".room-header")) {
			const roomUsers = document
				.querySelector(".room-header")
				.children[1].innerHTML.replace(
					'<i class="icon fa-fw fas fa-users"></i>&nbsp;',
					""
				)
				.replace("/", "of");
			presenceData.state = `${
				document
					.querySelector(".room-header")
					.children[0].innerHTML.split("</span>")[1]
			} (${roomUsers})`;
			presenceData.buttons = [
				{ label: "Join room", url: document.location.href },
			];
		}
		if (document.querySelector(".chart-header")) {
			const chartHeader = document.querySelector(".chart-header");
			presenceData.state = `${
				chartHeader.children[2].children[0].innerHTML
			} Lv.${document.querySelector(".level").innerHTML} / ${
				chartHeader.children[1].children[1].innerHTML
			} - ${chartHeader.children[1].children[0].innerHTML}`;
		}
	}

	presence.setActivity(presenceData);
});
