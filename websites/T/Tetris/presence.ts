const presence = new Presence({
		clientId: "1178463662382518272",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/cdEP9LJ.png",
}

interface TetrisFrameData {
	lines: string;
	score: string;
	level: string;
}
let iframeData: TetrisFrameData = {
	lines: "0",
	score: "0",
	level: "1",
};

presence.on("iFrameData", (data: TetrisFrameData) => {
	iframeData = data;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location,
		pathList = pathname.split("/").filter(Boolean);

	switch (pathList[0] ?? "") {
		case "": {
			presenceData.details = "Browsing home page";
			break;
		}
		case "article": {
			presenceData.details = "Reading an article";
			presenceData.state = document.querySelector<HTMLHeadingElement>(".headline").textContent;
			break;
		}
		case "play-tetris": {
			presenceData.details = "Playing Tetris";
			presenceData.state = `Level ${iframeData.level}`;
			presenceData.smallImageKey = Assets.Question;
			presenceData.smallImageText = `Lines: ${iframeData.lines} | Score: ${iframeData.score}`;
			break;
		}
		default: {
			presenceData.details = "Browsing";
			presenceData.state = document.title;
			break;
		}
	}

	presence.setActivity(presenceData);
});
