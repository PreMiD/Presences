const presence = new Presence({
	clientId: "788274557571170314",
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
			largeImageKey: "https://i.imgur.com/rkmqU73.png",
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
	const truyen = curPath.startsWith("/truyen"),
		sangTac = curPath.startsWith("/sang-tac");

	if (curPath.startsWith("/ke-sach"))
		presenceData.details = "Đang xem tủ sách...";
	else if (curPath.startsWith("/thong-bao"))
		presenceData.details = "Đang xem thông báo...";
	else if (curPath.startsWith("/tin-nhan"))
		presenceData.details = "Đang nhắn tin...";
	else if (curPath.startsWith("/bookmark"))
		presenceData.details = "Đang xem bookmark...";
	else if (curPath.startsWith("/tim-kiem"))
		presenceData.details = "Đang tìm kiếm...";
	else if (curPath.startsWith("/danh-sach"))
		presenceData.details = "Đang xem danh sách truyện...";
	else if (curPath.startsWith("/lich-su-doc"))
		presenceData.details = "Đang xem lịch sử đọc truyện...";
	else if (curPath.startsWith("/login"))
		presenceData.details = "Đang đang nhập...";
	else if (curPath.startsWith("/password/reset"))
		presenceData.details = "Đang đặt lại mật khẩu...";
	else if (curPath.startsWith("/register"))
		presenceData.details = "Đang đăng ký...";
	else if (curPath.startsWith("/thanh-vien")) {
		presenceData.details = `Đang xem tường của: ${
			document.querySelector(".profile-intro>.profile-intro_name").textContent
		}`;
	} else if (curPath.startsWith("/xuat-ban")) {
		const title = document.querySelector(".volume-title>a");
		if (title) {
			presenceData.details = `Đang xem: ${title.textContent} (${
				document.querySelector(".publisher-name>a").textContent
			} phát hành)`;
			presenceData.state = `Tác giả: ${
				document.querySelector(".info-value>a").textContent
			}`;
		} else presenceData.details = "Đang tìm truyện bản quyền...";
	} else if (curPath.startsWith("/action"))
		presenceData.details = "Đang xem bảng điều khiển...";
	else if (curPath.startsWith("/nhom-dich")) {
		const name = document.querySelector(".page-name");
		if (name) {
			presenceData.details = `Đang xem nhóm dịch: ${name.textContent.substring(
				40
			)}`;
		} else presenceData.details = "Đang xem danh sách nhóm dịch...";
	} else if (truyen || sangTac || curPath.startsWith("/convert")) {
		const name = document.querySelector(".series-name-group>.series-name>a"),
			title = document.querySelector(".rd_sidebar-name>h5>a");
		if (name || title) {
			presenceData.details = name
				? "Đang chọn chap..."
				: `Đang đọc truyện: ${title.textContent}`;
			presenceData.state = name
				? name.textContent
				: document.querySelector(".title-top>h4").textContent;
		} else {
			presenceData.details = `Đang tìm ${
				truyen ? "truyện" : sangTac ? "sáng tác" : "convert"
			} ...`;
		}
	} else if (curPath.startsWith("/thao-luan")) {
		const title = document.querySelector(".sect-title>a");
		if (title) {
			presenceData.details = `Đang đọc: ${title.textContent}`;
			presenceData.state = `Tác giả: ${
				document.querySelector(".author_name>a").textContent
			}`;
		} else presenceData.details = "Đang xem danh sách thảo luận...";
	} else presenceData.details = "Đang xem trang chủ...";

	presenceData.startTimestamp = browsingTimestamp;
	presence.setActivity(presenceData);
});
