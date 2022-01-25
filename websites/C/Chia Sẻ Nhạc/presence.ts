const presence = new Presence({
		clientId: "927785613309116476"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "lg",
			startTimestamp: browsingTimestamp
		},
		path = document.location.pathname,
		[buttons, timestamps, cover] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("timestamps"),
			presence.getSetting<boolean>("cover")
		]);
	if (path.startsWith("/hd")) {
		if (path === "/hd/video.html") presenceData.details = "Đang tìm video";
		else if (path.endsWith("v-video.html"))
			presenceData.details = "Đang tìm video Việt Nam";
		else if (path.endsWith("us-video.html"))
			presenceData.details = "Đang tìm video Âu Mỹ";
		else if (path.endsWith("c-video.html"))
			presenceData.details = "Đang tìm video Hoa";
		else if (path.endsWith("k-video.html"))
			presenceData.details = "Đang tìm video Hàn";
		else if (path.endsWith("l-video.html"))
			presenceData.details = "Đang tìm video Live";
		else if (path.endsWith("h-video.html"))
			presenceData.details = "Đang tìm video hài";
		else if (path.endsWith("j-video.html"))
			presenceData.details = "Đang tìm video Nhật";
		else if (path.endsWith("f-video.html"))
			presenceData.details = "Đang tìm video Pháp";
		else if (path.endsWith("o-video.html"))
			presenceData.details = "Đang tìm video nước khác";
		else {
			let paused = !document
				.querySelector<HTMLDivElement>(
					"#csnplayer > div.jw-controls.jw-reset > div.jw-display.jw-reset > div > div > div.jw-display-icon-container.jw-display-icon-display.jw-reset > div"
				)
				.ariaLabel.includes("Pause");
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
				const timeLeft = presence.timestampFromFormat(
					document.querySelector<HTMLDivElement>(
						"#csnplayer > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-countdown"
					).textContent
				);
				if (Date.now() / 1000 >= Date.now() / 1000 + timeLeft) paused = true;

				if (!paused) presenceData.endTimestamp = Date.now() / 1000 + timeLeft;
			}
			if (buttons)
				presenceData.buttons = [{ label: "Xem video", url: document.URL }];
			presenceData.smallImageKey = paused ? "paused" : "play";
			presenceData.smallImageText = paused ? "Đã dừng" : "Đang phát";
		}
	} else if (
		path.startsWith("/mp3") ||
		path.startsWith("/nghe-album") ||
		document.querySelector("#csnplayer > div.jw-overlays.jw-reset")
	) {
		if (path.startsWith("/mp3/vietnam"))
			presenceData.details = "Đang tìm nhạc Việt Nam";
		else if (path.startsWith("/mp3/us-uk"))
			presenceData.details = "Đang tìm nhạc Âu Mỹ";
		else if (path.startsWith("/mp3/chinese"))
			presenceData.details = "Đang tìm nhạc Hoa";
		else if (path.startsWith("/mp3/korea"))
			presenceData.details = "Đang tìm nhạc Hàn";
		else if (path.startsWith("/mp3/japan"))
			presenceData.details = "Đang tìm nhạc Nhật";
		else if (path.startsWith("/mp3/france"))
			presenceData.details = "Đang tìm nhạc Pháp";
		else if (path.startsWith("/mp3/other"))
			presenceData.details = "Đang tìm nhạc nước khác";
		else if (path.startsWith("/mp3/beat-playback"))
			presenceData.details = "Đang tìm beat/playback";
		else if (document.querySelector("#csnplayer > div.jw-overlays.jw-reset")) {
			let paused = !document
				.querySelector<HTMLDivElement>(
					"#csnplayer > div.jw-controls.jw-reset > div.jw-display.jw-reset > div > div > div.jw-display-icon-container.jw-display-icon-display.jw-reset > div"
				)
				.ariaLabel.includes("Pause");
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
				const timeLeft = presence.timestampFromFormat(
					document.querySelector<HTMLDivElement>(
						"#csnplayer > div.jw-controls.jw-reset > div.jw-controlbar.jw-reset > div.jw-reset.jw-button-container > div.jw-icon.jw-icon-inline.jw-text.jw-reset.jw-text-countdown"
					).textContent
				);
				if (Date.now() / 1000 >= Date.now() / 1000 + timeLeft) paused = true;

				if (!paused) presenceData.endTimestamp = Date.now() / 1000 + timeLeft;
			}
			if (buttons)
				presenceData.buttons = [{ label: "Nghe bài hát", url: document.URL }];
			presenceData.smallImageKey = paused ? "paused" : "play";
			presenceData.smallImageText = paused ? "Đã dừng" : "Đang phát";
		}
	} else if (path.includes("/nhac-hot") || path.startsWith("/bang-xep-hang"))
		presenceData.details = "Đang xem bảng xếp hạng";
	else if (path.startsWith("/ca-si")) {
		presenceData.details = "Đang xem hồ sơ ca sĩ:";
		presenceData.state = document.querySelector<HTMLHeadingElement>(
			"body > section > div.box_profile > div > div > div.thumb-mask.media.align-items-stretch.d-flex.align-content-center.justify-content-center > div > div > h4"
		).textContent;
		if (buttons)
			presenceData.buttons = [{ label: "Xem ca sĩ", url: document.URL }];
	} else if (path.startsWith("/user")) {
		presenceData.details = "Đang xem hồ sơ người dùng:";
		presenceData.state = document.querySelector<HTMLHeadingElement>(
			"body > section > div.box_profile > div > div.box_detail_profile.media-body.align-self-center > h4"
		).textContent;
		if (buttons)
			presenceData.buttons = [{ label: "Xem người dùng", url: document.URL }];
	} else if (path.startsWith("/dang-tai"))
		presenceData.details = "Đang đăng tải nhạc";
	else if (path.startsWith("/chu-de")) {
		presenceData.details = "Đang tìm nhạc theo chủ đề:";
		presenceData.state = document.querySelector<HTMLHeadingElement>(
			"body > section > div.container > div > div.col-md-9 > div > div.media.media-tab > div > h2"
		).textContent;
	} else if (document.location.href === "https://chiasenhac.vn/")
		presenceData.details = "Trang chủ";
	presence.setActivity(presenceData);
});
