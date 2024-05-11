const presence = new Presence({
	clientId: "1016312551958642698",
});

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/logo.png",
	ChartSearch = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/3.jpg",
	ChartHypoRanked = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/5.jpg",
	ChartByDifficulty = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/4.jpg",
	ChartNew = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/6.jpg",
	ChartHistory = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/7.jpg",
	ChartPossession = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/8.jpg",
	ChartHot = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/9.jpg",
	ChartCold = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/10.jpg",
	ChartMultiPlayer = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/11.jpg",
	ChartSpotlighted = "https://cdn.rcd.gg/PreMiD/websites/S/Sorryfield/assets/2.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Sorryfield",
			largeImageKey: Assets.Logo,
		},
		{ pathname, href } = document.location;
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
			presenceData.type = ActivityType.Listening;
			presenceData.state = `${
				document.querySelector(".song").children[2].childNodes[0].textContent
			} - ${document.querySelector(".title").textContent.trim()}`;
			presenceData.buttons = [{ label: "듣기", url: href }];
			const playing = document
				.querySelector<HTMLElement>(".control>button>i")
				.classList.contains("fa-pause");
			presenceData.smallImageKey = playing ? Assets.Play : Assets.Pause;
			presenceData.smallImageText = playing ? "재생 중" : "일시 정지";
			const duration = document
				.querySelector("time>.desc")
				?.textContent.split(":");
			if (duration && playing) {
				const nowTime =
					Math.floor(Date.now() / 1000) +
					(parseInt(duration[0].replace("(-", "")) * 60 +
						parseInt(duration[1].replace(")", ""))) +
					1;
				presenceData.endTimestamp = nowTime;
				if (nowTime <= Math.floor(Date.now() / 1000)) {
					delete presenceData.endTimestamp;
					presenceData.smallImageKey = Assets.Stop;
				}
			} else delete presenceData.endTimestamp;
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
			presenceData.buttons = [{ label: "듣기", url: href }];
			presenceData.type = ActivityType.Listening;
			const playing = document
				.querySelector<HTMLElement>(".control>button>i")
				.classList.contains("fa-pause");
			presenceData.smallImageKey = playing ? Assets.Play : Assets.Pause;
			presenceData.smallImageText = playing ? "재생 중" : "일시 정지";
			const duration = document
				.querySelector("time>.desc")
				?.textContent.split(":");
			if (duration && playing) {
				const nowTime =
					Math.floor(Date.now() / 1000) +
					(parseInt(duration[0].replace("(-", "")) * 60 +
						parseInt(duration[1].replace(")", ""))) +
					1;
				presenceData.endTimestamp = nowTime;
				if (nowTime <= Math.floor(Date.now() / 1000)) {
					delete presenceData.endTimestamp;
					presenceData.smallImageKey = Assets.Stop;
				}
			} else delete presenceData.endTimestamp;
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
		presenceData.largeImageKey = Assets.Logo;
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
			presenceData.smallImageKey = Assets.Logo;

			switch (image) {
				case "SEARCH":
					imageKey = Assets.ChartSearch;
					presenceData.state = `채보 검색 중: ${
						document.querySelector<HTMLInputElement>("#search").value
					}`;
					break;
				case "HYPORANKED":
					imageKey = Assets.ChartHypoRanked;
					menuName = "내 순위가 아래인 채보";
					break;
				case "BY_DIFFICULTY":
					imageKey = Assets.ChartByDifficulty;
					menuName = "전체 채보";
					for (let i = 0; i < 32; i++) {
						if (
							document
								.querySelectorAll(".difficulty-bar>.item")
								[i].getAttribute("data-active") === "true"
						) {
							menuName = `난도 ${i === 31 ? "30+" : i.toString()} 채보`;
							break;
						}
					}
					break;
				case "NEW":
					imageKey = Assets.ChartNew;
					menuName = "신상 채보";
					break;
				case "HISTORY":
					imageKey = Assets.ChartHistory;
					menuName = "내가 최근 완주한 채보";
					break;
				case "POSSESSION":
					imageKey = Assets.ChartPossession;
					menuName = "내가 소장한 곡의 채보";
					break;
				case "HOT":
					imageKey = Assets.ChartHot;
					menuName = "요즘 북적이는 채보";
					break;
				case "COLD":
					imageKey = Assets.ChartCold;
					menuName = "요즘 안 북적이는 채보";
					break;
				case "SPOTLIGHTED":
					imageKey = Assets.ChartSpotlighted;
					menuName = "오늘의 픽";
					break;
				case "MULTIPLAYER":
					imageKey = Assets.ChartMultiPlayer;
					presenceData.details = "자바! 멀티플레이어";
					presenceData.state = "방 선택 중";
					break;
			}
			if (menuName !== "") {
				presenceData.state = `${
					document
						.querySelector(".mode-selection>.body>.mode-串")
						.classList.contains("active")
						? "串"
						: document
								.querySelector(".mode-selection>.body>.mode-本")
								.classList.contains("active")
						? "本"
						: "雙"
				} 채보 선택 중: ${menuName}`;
			}

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
		} else if (pathname.includes("/record/")) {
			presenceData.details = `${
				document.querySelector<HTMLElement>(".header-profile>.left>a")
					.textContent
			}님의 리플레이: ${`${
				document
					.querySelector<HTMLElement>(".header-profile>.right")
					.textContent.split("%")[0]
			}%`}`;
			presenceData.state = `Lv.${
				document.querySelector<HTMLDivElement>(".chart-header>.level")
					.textContent
			} / ${document
				.querySelector<HTMLTitleElement>("title")
				.textContent.split(" by ")[0]
				.slice(2)} ${
				document.querySelector<HTMLDivElement>(".chart-header>.tail>div")
					.textContent
			}`;
			presenceData.type = ActivityType.Watching;
			presenceData.buttons = [{ label: "리플레이 보기", url: href }];
		} else if (pathname.includes("/shop")) presenceData.state = "상점";
		else if (pathname.includes("/sync")) presenceData.state = "환경 설정";
		else if (pathname.includes("/ranking")) {
			presenceData.state = `${
				document.querySelector("h2").textContent
			} 모드 짬 랭킹`;
		} else if (pathname === "/java/multiplayer") {
			presenceData.details = "자바! 멀티플레이어";
			presenceData.largeImageKey = Assets.ChartMultiPlayer;
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
