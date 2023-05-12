const presence = new Presence({
	clientId: "857504781438681089",
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

function getQuery() {
	return JSON.parse(
		`{"${decodeURI(location.search.substring(1))
			.replaceAll('"', '\\"')
			.replaceAll("&", '","')
			.replaceAll("=", '":"')}"}`
	);
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/1EEUg5a.png",
		},
		player = document.querySelector(".playbar_wrap");
	if (!(player.querySelector("input.progress") as HTMLInputElement).disabled) {
		const playButton: HTMLButtonElement =
			player.querySelector("button.icon-player");

		[, presenceData.endTimestamp] = presence.getTimestamps(
			presence.timestampFromFormat(
				player
					.querySelector(".time_current")
					.textContent.replace(
						player.querySelector(".time_current").querySelector("span.hidden")
							.textContent,
						""
					)
			),
			presence.timestampFromFormat(
				player
					.querySelector(".time_all")
					.textContent.replace(
						player.querySelector(".time_all").querySelector("span.hidden")
							.textContent,
						""
					)
			)
		);
		presenceData.details = `${player.querySelector("p.title").textContent} - ${
			player.querySelector("p.artist").textContent
		}`;
		if (playButton.className.includes("btn-player-play")) {
			presenceData.smallImageKey = Assets.Pause;
			presenceData.smallImageText = "일시 정지";
		} else if (playButton.className.includes("btn-player-pause")) {
			presenceData.smallImageKey = Assets.Play;
			presenceData.smallImageText = "재생";
		}
	} else {
		const { location } = window;
		if (location.pathname === "/") presenceData.details = "메인";
		else {
			switch (0) {
				case location.pathname.indexOf("/search"): {
					presenceData.smallImageKey = Assets.Search;
					presenceData.details = "검색";
					presenceData.state = getQuery().keyword;

					switch (location.pathname) {
						case "/search/track": {
							presenceData.details += "(곡)";
							break;
						}
						case "/search/album": {
							presenceData.details += "(앨범)";
							break;
						}
						case "/search/artist": {
							presenceData.details += "(아티스트)";
							break;
						}
						case "/search/theme": {
							presenceData.details += "(테마리스트)";
							break;
						}
						case "/search/lyrics":
							{
								presenceData.details += "(가사)";
								// No default
							}
							break;
					}

					break;
				}
				case location.pathname.indexOf("/new"): {
					presenceData.smallImageKey = Assets.Search;
					presenceData.details = "최근 발매 음악";

					if (location.pathname === "/new/track")
						presenceData.details += "(곡)";
					else if (location.pathname === "/new/album")
						presenceData.details += "(앨범)";

					break;
				}
				case location.pathname.indexOf("/help"): {
					presenceData.details = "고객센터";

					switch (0) {
						case location.pathname.indexOf("/help/notice"): {
							presenceData.state = "공지사항";
							break;
						}
						case location.pathname.indexOf("/help/faq"): {
							presenceData.state = "자주 묻는 문의";
							break;
						}
						case location.pathname.indexOf("/help/qna"):
							{
								presenceData.state = "1:1 문의";
								// No default
							}
							break;
					}
					break;
				}
				case location.pathname.indexOf("/detail/channel"): {
					presenceData.smallImageKey = Assets.Search;
					presenceData.details = "테마리스트";
					presenceData.state = document.querySelector("p.title").textContent;

					break;
				}
				case location.pathname.indexOf("/detail/album"): {
					presenceData.smallImageKey = Assets.Search;
					presenceData.details = "앨범";
					presenceData.state = `${
						document.querySelector("p.title").textContent
					} - ${document.querySelector("p.artist").textContent}`;

					break;
				}
				default:
					if (location.pathname === "/browse") {
						presenceData.smallImageKey = Assets.Search;
						presenceData.details = document.querySelector(
							".chart_content_head>h4"
						).textContent;
					} else if (location.pathname.indexOf("/storage") === 0) {
						presenceData.smallImageKey = Assets.Search;
						presenceData.smallImageText = "보관함";
						presenceData.details = "보관함";
					} else if (location.pathname.indexOf("/purchase") === 0)
						presenceData.details = "이용권";
					else if (location.pathname === "/intro")
						presenceData.details = "소개";
			}
		}
	}
	presence.setActivity(presenceData);
});
