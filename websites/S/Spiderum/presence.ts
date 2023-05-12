const presence = new Presence({
		clientId: "721266123282317333",
	}),
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
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/b1NnqZa.jpg",
	};

	if (document.location.hostname === "spiderum.com") {
		presenceData.startTimestamp = browsingTimestamp;
		if (
			document.location.pathname.includes("/bai-dang/viet-bai") ||
			document.location.pathname.includes("/bai-dang/viet-tiep/")
		) {
			presenceData.details = "Đang viết bài";
			presenceData.smallImageKey = Assets.Writing;
		} else if (document.location.pathname.startsWith("/hot")) {
			presenceData.details = "Đang xem các bài viết hot";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.startsWith("/controversial")) {
			presenceData.details = "Đang xem:";
			presenceData.state = "Các bài viết sôi nổi";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/top-writer")) {
			presenceData.details = "Đang xem:";
			presenceData.state = "Top Writter";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.startsWith("/top")) {
			presenceData.details = "Đang xem:";
			presenceData.state = "Top bài viết nhiều upvote nhất";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.startsWith("/new")) {
			presenceData.details = "Đang xem:";
			presenceData.state = "Các bài viết mới nhất";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/bai-dang/")) {
			presenceData.details = "Đang xem bài viết:";
			presenceData.state = document.querySelector(".title > h1").textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/nguoi-dung/")) {
			presenceData.details = "Đang xem trang cá nhân:";
			presenceData.state = `${
				document.querySelector(".display-name").textContent
			} (${document.querySelector(".nickname").textContent})`;
		} else if (document.location.pathname.includes("/s/all/")) {
			presenceData.details = "Đang xem:";
			presenceData.state = "Tất cả bài viết";
			presenceData.smallImageKey = Assets.Reading;
		} else if (
			document.location.pathname.includes("/s/quan-diem-tranh-luan/")
		) {
			presenceData.details = "Đang xem danh mục:";
			presenceData.state = document.querySelector(
				"#category-heading > div.text-box > div.title"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/s/truyen-cam-hung/")) {
			presenceData.details = "Đang xem danh mục:";
			presenceData.state = document.querySelector(
				"#category-heading > div.text-box > div.title"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/s/khoa-hoc-cong-nghe/")) {
			presenceData.details = "Đang xem danh mục:";
			presenceData.state = document.querySelector(
				"#category-heading > div.text-box > div.title"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/s/science2vn/")) {
			presenceData.details = "Đang xem danh mục:";
			presenceData.state = document.querySelector(
				"#category-heading > div.text-box > div.title"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/s/the-thao/")) {
			presenceData.details = "Đang xem danh mục:";
			presenceData.state = document.querySelector(
				"#category-heading > div.text-box > div.title"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/s/game/")) {
			presenceData.details = "Đang xem danh mục:";
			presenceData.state = document.querySelector(
				"#category-heading > div.text-box > div.title"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/s/su-kien-spiderum/")) {
			presenceData.details = "Đang xem danh mục:";
			presenceData.state = document.querySelector(
				"#category-heading > div.text-box > div.title"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/s/otakulture/")) {
			presenceData.details = "Đang xem danh mục:";
			presenceData.state = document.querySelector(
				"#category-heading > div.text-box > div.title"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/s/sang-tac/")) {
			presenceData.details = "Đang xem danh mục:";
			presenceData.state = document.querySelector(
				"#category-heading > div.text-box > div.title"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/s/comics/")) {
			presenceData.details = "Đang xem danh mục:";
			presenceData.state = document.querySelector(
				"#category-heading > div.text-box > div.title"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/s/phim/")) {
			presenceData.details = "Đang xem danh mục:";
			presenceData.state = document.querySelector(
				"#category-heading > div.text-box > div.title"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/s/sach/")) {
			presenceData.details = "Đang xem:";
			presenceData.state = document.querySelector(
				"#category-heading > div.text-box > div.title"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/s/an-choi/")) {
			presenceData.details = "Đang xem:";
			presenceData.state = document.querySelector(
				"#category-heading > div.text-box > div.title"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/s/ky-nang/")) {
			presenceData.details = "Đang xem:";
			presenceData.state = document.querySelector(
				"#category-heading > div.text-box > div.title"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/s/am-nhac/")) {
			presenceData.details = "Đang xem:";
			presenceData.state = document.querySelector(
				"#category-heading > div.text-box > div.title"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/s/english-zone/")) {
			presenceData.details = "Đang xem:";
			presenceData.state = document.querySelector(
				"#category-heading > div.text-box > div.title"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/s/chuyen-tro-tam-su/")) {
			presenceData.details = "Đang xem:";
			presenceData.state = document.querySelector(
				"#category-heading > div.text-box > div.title"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/danh-muc-khac")) {
			presenceData.details = "Đang xem:";
			presenceData.state = "Danh sách các danh mục";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/vieclam")) {
			presenceData.details = "Đang tìm việc làm";
			presenceData.state =
				"Cần cù thì bù siêng năng, chỉ có làm thì mới có ăn :(";
			presenceData.smallImageKey = Assets.Reading;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
