const presence = new Presence({
		clientId: "927785613309116476",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/C/Chia%20S%E1%BA%BB%20Nh%E1%BA%A1c/assets/logo.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location,
		[buttons, timestamps, cover] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("timestamps"),
			presence.getSetting<boolean>("cover"),
		]);
	if (pathname.startsWith("/hd")) {
		if (pathname === "/hd/video.html") presenceData.details = "Đang tìm video";
		else if (pathname.endsWith("v-video.html"))
			presenceData.details = "Đang tìm video Việt Nam";
		else if (pathname.endsWith("us-video.html"))
			presenceData.details = "Đang tìm video Âu Mỹ";
		else if (pathname.endsWith("c-video.html"))
			presenceData.details = "Đang tìm video Hoa";
		else if (pathname.endsWith("k-video.html"))
			presenceData.details = "Đang tìm video Hàn";
		else if (pathname.endsWith("l-video.html"))
			presenceData.details = "Đang tìm video Live";
		else if (pathname.endsWith("h-video.html"))
			presenceData.details = "Đang tìm video hài";
		else if (pathname.endsWith("j-video.html"))
			presenceData.details = "Đang tìm video Nhật";
		else if (pathname.endsWith("f-video.html"))
			presenceData.details = "Đang tìm video Pháp";
		else if (pathname.endsWith("o-video.html"))
			presenceData.details = "Đang tìm video nước khác";
		else {
			const { paused, currentTime, duration } =
				document.querySelector<HTMLVideoElement>("video");
			presenceData.details = document.querySelector<HTMLHeadingElement>(
				"body > section > div.container > div > div.col-md-9 > div:nth-child(4) > div.col-md-4 > div > div.card-body > h2"
			).textContent;
			presenceData.state = document
				.querySelector<HTMLLIElement>(
					"body > section > div.container > div > div.col-md-9 > div:nth-child(4) > div.col-md-4 > div > div.card-body > ul > li:nth-child(1)"
				)
				.textContent.slice(7);
			if (cover) {
				presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
					"#companion_cover > img"
				).src;
			}
			if (timestamps) {
				delete presenceData.startTimestamp;

				if (!paused) {
					[presenceData.startTimestamp, presenceData.endTimestamp] =
						presence.getTimestamps(duration, currentTime);
				}
			}
			if (buttons)
				presenceData.buttons = [{ label: "Xem video", url: document.URL }];
			presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = paused ? "Đã dừng" : "Đang phát";
		}
	} else if (
		pathname.startsWith("/mp3") ||
		pathname.startsWith("/nghe-album") ||
		document.querySelector("#csnplayer > div.jw-overlays.jw-reset")
	) {
		if (pathname.startsWith("/mp3/vietnam"))
			presenceData.details = "Đang tìm nhạc Việt Nam";
		else if (pathname.startsWith("/mp3/us-uk"))
			presenceData.details = "Đang tìm nhạc Âu Mỹ";
		else if (pathname.startsWith("/mp3/chinese"))
			presenceData.details = "Đang tìm nhạc Hoa";
		else if (pathname.startsWith("/mp3/korea"))
			presenceData.details = "Đang tìm nhạc Hàn";
		else if (pathname.startsWith("/mp3/japan"))
			presenceData.details = "Đang tìm nhạc Nhật";
		else if (pathname.startsWith("/mp3/france"))
			presenceData.details = "Đang tìm nhạc Pháp";
		else if (pathname.startsWith("/mp3/other"))
			presenceData.details = "Đang tìm nhạc nước khác";
		else if (pathname.startsWith("/mp3/beat-playback"))
			presenceData.details = "Đang tìm beat/playback";
		else if (document.querySelector("#csnplayer > div.jw-overlays.jw-reset")) {
			const { paused, currentTime, duration } =
				document.querySelector<HTMLVideoElement>("video");
			presenceData.details = document.querySelector<HTMLHeadingElement>(
				"body > section > div.container > div > div.col-md-9 > div:nth-child(4) > div.col-md-4 > div > div.card-body > h2"
			).textContent;
			presenceData.state = document
				.querySelector<HTMLLIElement>(
					"body > section > div.container > div > div.col-md-9 > div:nth-child(4) > div.col-md-4 > div > div.card-body > ul > li:nth-child(1)"
				)
				.textContent.slice(7);
			if (cover) {
				presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
					"#companion_cover > img"
				).src;
			}
			if (timestamps) {
				delete presenceData.startTimestamp;

				if (!paused) {
					[presenceData.startTimestamp, presenceData.endTimestamp] =
						presence.getTimestamps(duration, currentTime);
				}
			}
			if (buttons)
				presenceData.buttons = [{ label: "Nghe bài hát", url: document.URL }];
			presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = paused ? "Đã dừng" : "Đang phát";
		}
	} else if (
		pathname.includes("/nhac-hot") ||
		pathname.startsWith("/bang-xep-hang")
	)
		presenceData.details = "Đang xem bảng xếp hạng";
	else if (pathname.startsWith("/ca-si")) {
		presenceData.details = "Đang xem hồ sơ ca sĩ:";
		presenceData.state = document.querySelector<HTMLHeadingElement>(
			"body > section > div.box_profile > div > div > div.thumb-mask.media.align-items-stretch.d-flex.align-content-center.justify-content-center > div > div > h4"
		).textContent;
		if (buttons)
			presenceData.buttons = [{ label: "Xem ca sĩ", url: document.URL }];
	} else if (pathname.startsWith("/user")) {
		presenceData.details = "Đang xem hồ sơ người dùng:";
		presenceData.state = document.querySelector<HTMLHeadingElement>(
			"body > section > div.box_profile > div > div.box_detail_profile.media-body.align-self-center > h4"
		).textContent;
		if (buttons)
			presenceData.buttons = [{ label: "Xem người dùng", url: document.URL }];
	} else if (pathname.startsWith("/dang-tai"))
		presenceData.details = "Đang đăng tải nhạc";
	else if (pathname.startsWith("/chu-de")) {
		presenceData.details = "Đang tìm nhạc theo chủ đề:";
		presenceData.state = document.querySelector<HTMLHeadingElement>(
			"body > section > div.container > div > div.col-md-9 > div > div.media.media-tab > div > h2"
		).textContent;
	} else if (href === "https://chiasenhac.vn/")
		presenceData.details = "Trang chủ";
	presence.setActivity(presenceData);
});
