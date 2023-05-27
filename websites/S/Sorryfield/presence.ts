const presence = new Presence({
	clientId: "1016312551958642698",
});

const enum Assets {
	LOGO = "https://i.imgur.com/TxuMfTd.png",
	CHART_SEARCH = "https://i.imgur.com/IyyYNPb.jpg",
	CHART_HYPORANKED = "https://i.imgur.com/RDMG4bg.jpg",
	CHART_EXPONENTIAL = "https://i.imgur.com/MAi9c8K.jpg",
	CHART_HARD = "https://i.imgur.com/6NkL3hh.jpg",
	CHART_INTERMEDIATE = "https://i.imgur.com/hRMaDwD.jpg",
	CHART_EASY = "https://i.imgur.com/BLQqUN1.jpg",
	CHART_NEW = "https://i.imgur.com/PpA5uhv.jpg",
	CHART_HISTORY = "https://i.imgur.com/LxwfWhY.jpg",
	CHART_POSSESSION = "https://i.imgur.com/C42Fbsi.jpg",
	CHART_HOT = "https://i.imgur.com/xt6IZxO.jpg",
	CHART_COLD = "https://i.imgur.com/E9xnBoS.jpg",
	CHART_MULTIPLAYER = "https://i.imgur.com/fdGfvt2.jpg",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Sorryfield",
			smallImageKey: Assets.LOGO,
		},
		{ pathname, href } = document.location;
	if (
		pathname === "/" ||
		pathname === "/sorrygle" ||
		pathname.startsWith("/song/")
	) {
		presenceData.largeImageKey = Assets.LOGO;
		delete presenceData.smallImageKey;
	}
	if (pathname === "/") presenceData.details = "곡 선택 중";
	if (pathname === "/sorrygle") presenceData.details = "쏘리글";
	if (pathname.startsWith("/song/")) {
		presenceData.details = "노래 듣는 중";
		let songArtist = document
			.querySelector(".song")
			.children[2].innerHTML.split("&nbsp;")[0];
		/* Why innerHTML?
		 * Because removing another expression of artist.
		 * Other expressions of artist name and song name are separated by '&nbsp;' in Sorryfield.
		 * '.textContent' does not have '&nbsp;'.
		 */
		if (document.querySelector(".title").textContent.includes("fa-lock"))
			songArtist = `🔒 ${songArtist}`; // Hidden song from the search.
		presenceData.state = `${songArtist} - ${document
			.querySelector(".title")
			.textContent.trim()}`;
		presenceData.buttons = [{ label: "Listen", url: href }];
	}
	if (pathname.startsWith("/java")) {
		presenceData.details = "자바!";
		presenceData.largeImageKey = Assets.LOGO;
		delete presenceData.smallImageKey;
		if (pathname.includes("/edit")) {
			presenceData.state = `채보 수정 중 - ${document
				.querySelector("title")
				.textContent.replace(" - 자바! - 쏘리들", "")}`;
		} else if (pathname.includes("/studio")) {
			presenceData.state = document
				.querySelector("title")
				.textContent.replace(" - 자바! - 쏘리들", "");
		} else if (pathname.includes("/shop")) presenceData.state = "상점";
		else if (pathname.includes("/sync")) presenceData.state = "환경 설정";
		else if (href.includes("/java/")) {
			presenceData.state = document
				.querySelector(".title")
				.children[1].firstChild.textContent.trim();
		} else if (href.includes("?")) {
			presenceData.details = "자바! 싱글플레이어";
			const chartHeader = document.querySelector(".chart-header");
			presenceData.state = `${
				chartHeader.children[2].children[0].innerHTML
			} Lv.${document.querySelector(".level").innerHTML} / ${
				chartHeader.children[1].children[1].innerHTML
			} - ${chartHeader.children[1].children[0].innerHTML}`;
			presenceData.buttons = [{ label: "채보 플레이하기", url: href }];
		} else {
			const image = document
				.querySelector(".active>div>img")
				.attributes[1].value.replace("/media/images/chart-", "")
				.replace(".jpg", "")
				.toUpperCase();
			let imageKey = "",
				menuName = "";
			presenceData.smallImageKey = Assets.LOGO;

			switch (image) {
				case "SEARCH":
					imageKey = Assets.CHART_SEARCH;
					presenceData.state = `채보 검색 중 - ${
						document.querySelector<HTMLInputElement>("#search").value
					}`;
					break;
				case "HYPORANKED":
					imageKey = Assets.CHART_HYPORANKED;
					menuName = "내 순위가 아래인 채보";
					break;
				case "EXPONENTIAL":
					imageKey = Assets.CHART_EXPONENTIAL;
					menuName = "경지에 다다른 채보";
					break;
				case "HARD":
					imageKey = Assets.CHART_HARD;
					menuName = "어려운 채보";
					break;
				case "INTERMEDIATE":
					imageKey = Assets.CHART_INTERMEDIATE;
					menuName = "적당한 채보";
					break;
				case "EASY":
					imageKey = Assets.CHART_EASY;
					menuName = "쉬운 채보";
					break;
				case "NEW":
					imageKey = Assets.CHART_NEW;
					menuName = "신상 채보";
					break;
				case "HISTORY":
					imageKey = Assets.CHART_HISTORY;
					menuName = "내가 최근 완주한 채보";
					break;
				case "POSSESSION":
					imageKey = Assets.CHART_POSSESSION;
					menuName = "내가 소장한 곡의 채보";
					break;
				case "HOT":
					imageKey = Assets.CHART_HOT;
					menuName = "요즘 북적이는 채보";
					break;
				case "COLD":
					imageKey = Assets.CHART_COLD;
					menuName = "요즘 안 북적이는 채보";
					break;
				case "MULTIPLAYER":
					imageKey = Assets.CHART_MULTIPLAYER;
					presenceData.state = "멀티플레이어 방 선택 중";
					break;
			}
			if (menuName !== "") presenceData.state = `채보 선택 중 - ${menuName}`;

			presenceData.largeImageKey = imageKey;
			presenceData.buttons = [{ label: "자바! 플레이하기", url: href }];
		}
	}
	if (pathname === "/java/multiplayer") {
		presenceData.details = "자바! 멀티플레이어";
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
			presenceData.buttons = [{ label: "방 참여하기", url: href }];
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
