const presence = new Presence({
		clientId: "787715073007026187",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

let lastPlaybackState: boolean,
	lastPath: string,
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const playback =
			!!document.querySelector("#title") ||
			(document.querySelectorAll("video").length &&
				document.querySelectorAll("video")[0].className !== "previewVideo"),
		curPath = document.location.pathname,
		presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/Y/Yoake/assets/logo.png",
		};

	if (lastPath !== curPath || lastPlaybackState !== playback) {
		lastPath = curPath;
		lastPlaybackState = playback;
		browsingTimestamp = Math.floor(Date.now() / 1000);
	}
	if (!playback) {
		if (curPath.startsWith("/entity.php")) {
			presenceData.details = document.querySelector("#entityTitle").textContent;
			presenceData.state = "Đang chọn tập...";
		} else if (curPath.startsWith("/profile.php"))
			presenceData.details = "Đang xem profile...";
		else if (curPath.startsWith("/search.php"))
			presenceData.details = "Đang tìm kiếm...";
		else if (curPath.startsWith("/login.php"))
			presenceData.details = "Đang đăng nhập...";
		else if (curPath.startsWith("/register.php"))
			presenceData.details = "Đang đăng ký...";
		else if (curPath.startsWith("/genres.php")) {
			presenceData.state = `Thể loại: ${
				document.querySelector(".genreh2").textContent
			}`;
			presenceData.details = "Đang chọn phim...";
		} else if (curPath.startsWith("/history.php"))
			presenceData.details = "Đang xem lịch sử...";
		else if (curPath.startsWith("/saved.php"))
			presenceData.details = "Đang xem danh sách theo dõi...";
		else if (curPath.startsWith("/reset-password"))
			presenceData.details = "Đang đặt lại mật khẩu...";
		else presenceData.details = "Đang xem trang chủ...";
		presenceData.startTimestamp = browsingTimestamp;

		if (
			!curPath.startsWith("/entity.php") &&
			!curPath.startsWith("/genres.php")
		)
			delete presenceData.state;
		delete presenceData.smallImageKey;

		presence.setActivity(presenceData, true);
		return;
	}

	const [video] = document.querySelectorAll("video");

	if (video && !isNaN(video.duration)) {
		const [titleArrOne, titleArrTwo] = (
			document.querySelector("#title")
				? document.querySelector("#title").textContent
				: "Không thấy tên phim!... - Tập ?"
		).split(" - ");
		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused
			? (await strings).pause
			: (await strings).play;
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);

		presenceData.details = `Đang xem: ${titleArrOne}`;
		presenceData.state = titleArrTwo;

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
		presence.setActivity(presenceData, true);
	}
});
