const presence = new Presence({
	clientId: "1016991973531451502",
});

let lastPlaybackState: boolean,
	lastPath: string,
	browsingTimestamp = Math.floor(Date.now() / 1000),
	strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

async function getStrings() {
	return presence.getStrings(
		{
			pause: "general.paused",
			play: "general.playing",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

presence.on("UpdateData", async () => {
	const playback =
			!!document.querySelector("#title") ||
			(document.querySelectorAll("video").length &&
				document.querySelectorAll("video")[0].className !== "previewVideo"),
		curPath = document.location.pathname,
		newLang = await presence.getSetting<string>("lang").catch(() => "en"),
		presenceData: PresenceData = {
			largeImageKey: "logo",
		};

	if (lastPath !== curPath || lastPlaybackState !== playback) {
		lastPath = curPath;
		lastPlaybackState = playback;
		browsingTimestamp = Math.floor(Date.now() / 1000);
	}

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (!playback) {
		if (
			[
				"/anime-bo/",
				"/anime-sap-chieu/",
				"/anime-le/",
				"/danh-sach/",
				"/hoat-hinh-trung-quoc/",
			].some(e => curPath.startsWith(e))
		)
			presenceData.details = "Đang chọn phim";
		else if (curPath.startsWith("/account/info/"))
			presenceData.details = "Đang xem profile...";
		else if (curPath.startsWith("/tim-kiem/"))
			presenceData.details = "Đang tìm kiếm...";
		else if (curPath.startsWith("/account/login"))
			presenceData.details = "Đang đăng nhập...";
		else if (curPath.startsWith("/account/register"))
			presenceData.details = "Đang đăng ký...";
		else if (curPath.startsWith("/the-loai/"))
			presenceData.details = "Đang chọn thể loại phim";
		else if (curPath.startsWith("/anime/library/"))
			presenceData.details = "Đang xem thử viện alime ";
		else if (curPath.startsWith("/tu-phim"))
			presenceData.details = "Đang xem danh sách đã lưu trong hộp phim";
		else if (curPath.startsWith("/season/"))
			presenceData.details = "Đang chọn mùa phim";
		else if (curPath.startsWith("/phim/")) {
			presenceData.details = `Định xem phim ${
				document.querySelector<HTMLAnchorElement>(".Title").textContent
			}`;
		} else if (curPath.startsWith("/quen-mat-khau.html"))
			presenceData.details = "Đang bị quên mật khẩu kek.";
		else if (curPath.startsWith("/lich-chieu-phim.html"))
			presenceData.details = "Đang xem lịch chiếu anime";
		else presenceData.details = "Đang xem trang chủ...";
		presenceData.startTimestamp = browsingTimestamp;
		presence.setActivity(presenceData);
		return;
	}
	const [video] = document.querySelectorAll("video");

	if (!isNaN(video?.duration)) {
		const [titleArrOne] = (
				document.querySelectorAll(".Title")
					? document.querySelector(".Title").textContent
					: "Không tìm thấy còn cặc - Tập ?"
			).split(" - "),
			[startTimestamp, endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);
		presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused ? strings.pause : strings.play;
		presenceData.startTimestamp = startTimestamp;
		presenceData.endTimestamp = endTimestamp;

		presenceData.details = `Đang xem: ${titleArrOne} `;
		presenceData.state = `Tập: ${
			document.querySelector<HTMLAnchorElement>(".episode.playing").textContent
		}`;

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
		presence.setActivity(presenceData);
	}
});
