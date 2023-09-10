const presence = new Presence({
	clientId: "1016312551958642698",
});

const enum Assets {
	LOGO = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/logo.png",
	CHART_SEARCH = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/0.jpg",
	CHART_HYPORANKED = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/1.jpg",
	CHART_EXPONENTIAL = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/2.jpg",
	CHART_HARD = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/3.jpg",
	CHART_INTERMEDIATE = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/4.jpg",
	CHART_EASY = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/5.jpg",
	CHART_NEW = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/6.jpg",
	CHART_HISTORY = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/7.jpg",
	CHART_POSSESSION = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/8.jpg",
	CHART_HOT = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/9.jpg",
	CHART_COLD = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/10.jpg",
	CHART_MULTIPLAYER = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/11.jpg",
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
	if (pathname === "/") {
		presenceData.details = "곡 선택 중";
		presenceData.state = document.querySelector(".menu>.desc").textContent;
	}
	if (pathname === "/sorrygle") presenceData.details = "쏘리글";
	if (pathname.startsWith("/song/")) {
		if (pathname.includes("edit")) {
			if (href.includes("?")) {
				presenceData.details = "노래 수정 중";
				presenceData.state = `${
					document.querySelector<HTMLInputElement>("input[name=artist-title]")
						.value
				} - ${
					document.querySelector<HTMLInputElement>("input[name=title]").value
				}`;
			} else presenceData.details = "노래 추가 중";
		} else {
			presenceData.details = "노래 듣는 중";
			presenceData.state = `${
				document.querySelector(".song").children[2].childNodes[0].textContent
			} - ${document.querySelector(".title").textContent.trim()}`;
			const duration = document
				.querySelector("time>.desc")
				?.textContent.split(":");
			if (duration) {
				presenceData.endTimestamp =
					Math.floor(Date.now() / 1000) +
					(parseInt(duration[0].replace("(-", "")) * 60 +
						parseInt(duration[1].replace(")", ""))) +
					1;
			} else delete presenceData.endTimestamp;
			presenceData.buttons = [{ label: "듣기", url: href }];
		}
	}
	if (pathname === "/playlist") presenceData.details = "재생 목록 확인 중";
	if (pathname.startsWith("/playlist/")) {
		if (pathname.includes("edit")) {
			presenceData.details = `재생 목록 편집 중: ${
				document.querySelector<HTMLInputElement>("input[name=name]").value
			}`;
			presenceData.state = `${
				document.querySelector("article").querySelector("div[class=desc]")
					.textContent
			}`;
		} else {
			presenceData.details = document
				.querySelector("title")
				.textContent.replace(" - 쏘리들", "")
				.replace("재생 목록", "재생 목록 듣는 중");
			presenceData.state = `${
				document.querySelector(".current").children[0].children[7].childNodes[1]
					.childNodes[0].textContent
			} - ${
				document.querySelector(".current").children[0].children[7].childNodes[0]
					.textContent
			}`;
			const duration = document
				.querySelector("time>.desc")
				?.textContent.split(":");
			if (duration) {
				presenceData.endTimestamp =
					Math.floor(Date.now() / 1000) +
					(parseInt(duration[0].replace("(-", "")) * 60 +
						parseInt(duration[1].replace(")", ""))) +
					1;
			} else delete presenceData.endTimestamp;
			presenceData.buttons = [{ label: "듣기", url: href }];
		}
	}
	if (pathname === "/karaoke") presenceData.details = "노래방: 로비";
	if (pathname.startsWith("/karaoke/")) {
		presenceData.details = `노래방: ${document
			.querySelector("title")
			.textContent.replace(" - 노래방 - 쏘리들", "")} | ${
			document.querySelectorAll(".right")[1].textContent
		}곡 대기 중`;
		presenceData.state = document.querySelectorAll(".left")[1].textContent;
	}
	if (pathname.startsWith("/java")) {
		presenceData.details = "자바!";
		presenceData.largeImageKey = Assets.LOGO;
		delete presenceData.smallImageKey;
		if (pathname === "/java" && !href.includes("?")) {
			presenceData.details = "자바! 싱글플레이어";
			const image = document
				.querySelector<HTMLImageElement>(".active>div>img")
				.src.replace("https://sorry.daldal.so/media/images/chart-", "")
				.replace(".jpg", "")
				.toUpperCase();
			let imageKey = "",
				menuName = "";
			presenceData.smallImageKey = Assets.LOGO;

			switch (image) {
				case "SEARCH":
					imageKey = Assets.CHART_SEARCH;
					presenceData.state = `채보 검색 중: ${
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
					presenceData.details = "자바! 멀티플레이어";
					presenceData.state = "방 선택 중";
					break;
			}
			if (menuName !== "") presenceData.state = `채보 선택 중: ${menuName}`;

			presenceData.largeImageKey = imageKey;
			presenceData.buttons = [{ label: "자바! 플레이하기", url: href }];
		} else if (pathname.includes("/edit")) {
			presenceData.state = `채보 수정 중: ${document
				.querySelector("title")
				.textContent.replace(" - 자바! - 쏘리들", "")}`;
		} else if (pathname.includes("/studio")) {
			presenceData.state = document
				.querySelector("title")
				.textContent.replace(" - 자바! - 쏘리들", "");
		} else if (pathname.includes("/shop")) presenceData.state = "상점";
		else if (pathname.includes("/sync")) presenceData.state = "환경 설정";
		else if (pathname === "/java/multiplayer") {
			presenceData.details = "자바! 멀티플레이어";
			presenceData.largeImageKey = Assets.CHART_MULTIPLAYER;
			if (document.querySelector(".room-header")) {
				presenceData.state = `${
					document.querySelector(".room-header").children[0].childNodes[1]
						.textContent
				} (${document
					.querySelector(".room-header")
					.children[1].textContent.trim()
					.replace("/", " of ")})`;
				presenceData.buttons = [{ label: "방 참여하기", url: href }];
			}
			if (document.querySelector(".chart-header")) {
				const chartHeader = document.querySelector(".chart-header");
				presenceData.state = `${
					chartHeader.children[2].children[0].textContent
				} Lv.${document.querySelector(".level").textContent} / ${
					chartHeader.children[1].children[1].textContent
				} - ${chartHeader.children[1].children[0].textContent}`;
			}
		} else if (href.includes("?")) {
			presenceData.details = "자바! 싱글플레이어";
			const chartHeader = document.querySelector(".chart-header");
			presenceData.state = `${
				chartHeader.children[2].children[0].textContent
			} Lv.${document.querySelector(".level").textContent} / ${
				chartHeader.children[1].children[1].textContent
			} - ${chartHeader.children[1].children[0].textContent}`;
			presenceData.buttons = [{ label: "채보 플레이하기", url: href }];
		}
	}
	presence.setActivity(presenceData);
});