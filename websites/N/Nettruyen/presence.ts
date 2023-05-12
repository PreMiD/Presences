const presence = new Presence({
	clientId: "817063719288700939",
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

let lastPath: string,
	browsingTimestamp = Math.floor(Date.now() / 1000);

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

presence.on("UpdateData", async () => {
	const curPath = document.location.pathname,
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/h9AaSGw.png",
		};

	if (lastPath !== curPath) {
		lastPath = curPath;
		browsingTimestamp = Math.floor(Date.now() / 1000);

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
	}

	if (curPath.startsWith("/hot"))
		presenceData.details = "Đang xem truyện hot nhất...";
	else if (
		curPath.startsWith("/theo-doi") ||
		curPath.startsWith("/Secure/ComicFollowed.aspx")
	)
		presenceData.details = "Đang xem truyện theo dõi...";
	else if (curPath.startsWith("/lich-su"))
		presenceData.details = "Đang xem lịch sử...";
	else if (curPath.startsWith("/tim-truyen-nang-cao"))
		presenceData.details = "Tìm truyện nâng cao...";
	else if (curPath.startsWith("/tim-truyen")) {
		presenceData.state = `Thể loại: ${
			document.querySelector(
				"#ctl00_divRight > div > .ModuleContent > .nav > .active > a"
			).textContent
		}`;
		presenceData.details = "Đang tìm truyện...";
	} else if (curPath.startsWith("/truyen-con-gai"))
		presenceData.details = "Đang tìm truyện con gái...";
	else if (curPath.startsWith("/truyen-con-trai"))
		presenceData.details = "Đang tìm truyện con trai...";
	else if (curPath.startsWith("/Secure/Dashboard.aspx"))
		presenceData.details = "Đang xem thông tin chung...";
	else if (curPath.startsWith("/Secure/UserProfile.aspx"))
		presenceData.details = "Đang thông tin tài khoản...";
	else if (curPath.startsWith("/Secure/ComicList.aspx"))
		presenceData.details = "Đang xem truyện đã đăng...";
	else if (curPath.startsWith("/Secure/Comments.aspx"))
		presenceData.details = "Đang xem bình luận...";
	else if (curPath.startsWith("/Secure/Notifications.aspx"))
		presenceData.details = "Đang xem thông báo...";
	else if (curPath.startsWith("/Secure/ChangePassword.aspx"))
		presenceData.details = "Đang đổi mật khẩu...";
	else if (curPath.startsWith("/Secure/Register.aspx"))
		presenceData.details = "Đang đăng ký...";
	else if (curPath.startsWith("/Secure/Login.aspx"))
		presenceData.details = "Đang đăng nhập...";
	else if (curPath.startsWith("/Secure/RecoverPassword.aspx"))
		presenceData.details = "Quên mật khẩu :<";
	else if (curPath.startsWith("/truyen-tranh")) {
		const tmp = document.querySelector(".txt-primary");
		if (tmp === null) {
			presenceData.details = document.querySelector(
				".detail-info > div > div:nth-child(2) > div > a > span"
			).textContent;
			presenceData.state = "Đang chọn chap...";
		} else {
			presenceData.details = tmp.querySelector("a").textContent;
			presenceData.state = `Đang đọc: ${tmp
				.querySelector("span")
				.textContent.substr(2)}`;
		}
	} else presenceData.details = "Đang xem trang chủ...";
	presenceData.startTimestamp = browsingTimestamp;

	if (
		!curPath.startsWith("/truyen-tranh") &&
		!curPath.startsWith("/tim-truyen")
	)
		delete presenceData.state;
	delete presenceData.smallImageKey;

	presence.setActivity(presenceData, false);
	return;
});
