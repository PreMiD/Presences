const presence = new Presence({
		clientId: "870850875562819595"
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
		browsing: "presence.activity.browsing"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let video = {
		current: 0,
		duration: 0,
		paused: true
	},
	Sub: string;

presence.on(
	"iFrameData",
	(data: { current: number; duration: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const [time, privacy, buttons] = await Promise.all([
			presence.getSetting<boolean>("timestamps"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons")
		]),
		title =
			document.querySelector(
				"#contenedor > div.module > div.content > header > h1"
			)?.textContent ?? "ไม่ทราบชื่อ",
		titlemovies =
			document.querySelector(
				"#single > div.content > div.sheader > div.data > h1"
			)?.textContent ?? "ไม่ทราบชื่อ",
		playvdo =
			document.querySelector("#info > h1")?.textContent ?? "ไม่ทราบชื่อเรื่อง",
		pathArray = document.location.toString().split("/"),
		presenceData: PresenceData = {
			largeImageKey: "site",
			startTimestamp: browsingTimestamp
		};
	let movie, episode;
	if (pathArray[3].includes("?s=")) {
		presenceData.details = "กำลังค้นหา";
		presenceData.state = (
			document.querySelector(".content.rigth.csearch > header > h1")
				?.textContent ?? "ไม่พบสิ่งที่คุณกำลังค้นหา"
		)
			.split("ผลการค้นหา:")
			.pop();
		presenceData.smallImageKey = "search";
	} else if (!privacy && (pathArray[4] === "page" || pathArray[5] === "page")) {
		presenceData.details = `หน้า ${pathArray[pathArray.indexOf("page") + 1]}`;
		presenceData.state = title;
	} else {
		switch (pathArray[3]) {
			case "genre":
				presenceData.details = "ประเภท";
				presenceData.state = title;
				break;
			case "catalog":
				presenceData.details = "หมวดหมู่";
				presenceData.state = title;
				break;
			case "category":
				presenceData.details = "หมวดหมู่";
				presenceData.state = title;
				break;
			case "tag":
				presenceData.details = "รวมอนิเมะ";
				presenceData.state = title.split("รวมอนิเมะ").pop();
				break;
			case "release":
				presenceData.details = "ปี";
				presenceData.state = title;
				break;
			case "movies":
				presenceData.details = "เดอะมูฟวี่";
				presenceData.state = titlemovies;
				if (titlemovies === "มูฟวี่") {
					const movieinfo = titlemovies.split(/(เดอะ)?(มูฟวี่)/);
					movie = movieinfo.pop();
					if (movie === "ซับไทย")
						movie = movie.replace((Sub = "ซับไทย"), "").trim();
					else if (movie === "พากย์ไทย")
						movie = movie.replace((Sub = "พากย์ไทย"), "").trim();
					movie = `เดอะมูฟวี่ ${movie} ${Sub}`;
					if (privacy) presenceData.details = movie;
					else if (!privacy) {
						presenceData.state = movie;
						[presenceData.details] = movieinfo;
					}
				}
				presenceData.smallImageKey = video.paused ? "pause" : "playing";
				presenceData.smallImageText = video.paused
					? (await strings).pause
					: (await strings).play;
				if (!video.paused) {
					[, presenceData.endTimestamp] = presence.getTimestamps(
						Math.floor(video.current),
						Math.floor(video.duration)
					);
				}
				if (buttons) {
					presenceData.buttons = [
						{
							label: "ดูเดอะมูฟวี่",
							url: document.location.href.replace(/#\d+/, "")
						}
					];
				} else {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
				break;
			case "anime":
				if (pathArray[4] !== "page") {
					const ep =
						document.querySelector(
							"#single > div.content > div.sheader > div.data > h1"
						)?.textContent ?? "ไม่ทราบชื่อตอน";
					presenceData.startTimestamp = browsingTimestamp;
					presenceData.details = "เลือกตอน";
					presenceData.state = `${ep.split("ตอนที่")[0]}`;
				} else presenceData.details = "อนิเมะอัพเดตล่าสุด";

				break;
			case "ep":
				if (playvdo.includes("ตอนที่")) {
					const info = playvdo.split("ตอนที่");
					episode = info.pop();
					if (episode === "ซับไทย")
						episode = episode.replace((Sub = "ซับไทย"), "").trim();
					else if (episode === "พากย์ไทย")
						episode = episode.replace((Sub = "พากย์ไทย"), "").trim();
					episode = `ตอนที่ ${episode}`;
					if (privacy) presenceData.details = episode;
					else if (!privacy) {
						presenceData.state = episode;
						[presenceData.details] = info;
					}
				} else {
					let info;
					if (playvdo === "ซับไทย") info = playvdo.replace("ซับไทย", "").trim();
					else if (playvdo === "พากย์ไทย")
						info = playvdo.replace("พากย์ไทย", "").trim();
					episode = "กำลังดู";
					presenceData.state = info;
					presenceData.details = episode;
				}
				presenceData.smallImageKey = video.paused ? "pause" : "playing";
				presenceData.smallImageText = video.paused
					? (await strings).pause
					: (await strings).play;
				if (!video.paused) {
					[, presenceData.endTimestamp] = presence.getTimestamps(
						Math.floor(video.current),
						Math.floor(video.duration)
					);
				}
				if (buttons) {
					presenceData.buttons = [
						{
							label: "ดูอนิเมะ",
							url: document.location.href.replace(/#\d+/, "")
						}
					];
				}
				break;
			default:
				presenceData.details = "อนิเมะอัพเดตล่าสุด";
				break;
		}
	}
	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (privacy) {
		delete presenceData.state;
		delete presenceData.buttons;
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
