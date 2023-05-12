const presence = new Presence({
		clientId: "942782020055089192",
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
let namekey, doukey, charkey, keystr, largebox;

presence.on("UpdateData", async () => {
	const { pathname, search } = document.location,
		searchParams = new URLSearchParams(search),
		page = searchParams.get("page") || "1",
		presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
		};

	if (pathname.startsWith("/tim-kiem-truyen.html") && searchParams.has("key")) {
		presenceData.details = "Đang tìm kiếm từ khóa:";
		presenceData.state = `${
			document.querySelector("input").value
		} - Trang ${page}`;
		presenceData.smallImageKey = Assets.Search;
		presenceData.largeImageKey = "home";
	} else if (
		pathname.startsWith("/tim-kiem-tac-gia.html") &&
		searchParams.has("key")
	) {
		presenceData.details = "Đang tìm kiếm truyện của tác giả:";
		presenceData.state = `${
			document.querySelector("input").value
		} - Trang ${page}`;
		presenceData.smallImageKey = Assets.Search;
		presenceData.largeImageKey = "home";
	} else if (
		pathname.startsWith("/tim-kiem-doujinshi.html") &&
		searchParams.has("key")
	) {
		presenceData.details = "Đang tìm kiếm truyện là Doujin của:";
		presenceData.state = `${
			document.querySelector("input").value
		} - Trang ${page}`;
		presenceData.smallImageKey = Assets.Search;
		presenceData.largeImageKey = "home";
	} else if (
		pathname.startsWith("/tim-kiem-charater.html") &&
		searchParams.has("key")
	) {
		presenceData.details = "Đang tìm kiếm truyện có nhân vật:";
		presenceData.state = `${searchParams.get("key")} - Trang ${page}`;
		presenceData.smallImageKey = Assets.Search;
		presenceData.largeImageKey = "home";
	} else if (pathname === "/") {
		presenceData.details = "Đang duyệt trang chủ";
		presenceData.state = `Trang ${page}`;
		presenceData.smallImageKey = "surf";
		presenceData.largeImageKey = "home";
	} else if (pathname.startsWith("/forum/quote.php")) {
		presenceData.details = "Đang trả lời bình luận";
		presenceData.state = `Bình luận${
			document
				.querySelector("div[class='box-title']")
				.textContent.trim()
				.split("FORUM\n/\nQuay về topic\n/\nTrả lời kèm trích dẫn")[1]
		}`;
		presenceData.smallImageKey = "bell";
		presenceData.largeImageKey = "forum";
	} else if (searchParams.has("id")) {
		presenceData.details = document
			.querySelector("div[class='box-title']")
			.textContent.trim()
			.split("FORUM\n/\nQuay về item của bạn\n/\n")[1];
		presenceData.smallImageKey = "kho";
		presenceData.largeImageKey = "forum";
	} else if (pathname.startsWith("/tacgia=")) {
		presenceData.details = `Đang xem danh sách truyện của tác giả ${document
			.querySelectorAll("span[itemprop='name']")[2]
			.textContent.trim()}`;
		presenceData.state = `Trang ${page}`;
		presenceData.smallImageKey = "list";
		presenceData.largeImageKey = "truyen";
	} else if (pathname.startsWith("/char=")) {
		presenceData.details = `Đang xem danh sách truyện có nhân vật ${document
			.querySelectorAll("span[itemprop='name']")[2]
			.textContent.trim()}`;
		presenceData.state = `Trang ${page}`;
		presenceData.smallImageKey = "list";
		presenceData.largeImageKey = "truyen";
	} else if (pathname.startsWith("/doujin=")) {
		presenceData.details = `Đang xem danh sách truyện là doujin của ${document
			.querySelectorAll("span[itemprop='name']")[2]
			.textContent.trim()}`;
		presenceData.state = `Trang ${page}`;
		presenceData.smallImageKey = "list";
		presenceData.largeImageKey = "truyen";
	} else if (pathname.startsWith("/dang-tien-hanh.html")) {
		presenceData.details = "Đang xem danh sách truyện Đang tiến hành";
		presenceData.state = `Trang ${page}`;
		presenceData.smallImageKey = "list";
		presenceData.largeImageKey = "truyen";
	} else if (pathname.startsWith("/danh-sach.html")) {
		presenceData.details = "Đang xem danh sách truyện";
		presenceData.state = `Trang ${page}`;
		presenceData.smallImageKey = "list";
		presenceData.largeImageKey = "truyen";
	} else if (pathname.startsWith("/chap-moi.html")) {
		presenceData.details = "Đang xem danh sách truyện Có chap mới";
		presenceData.state = `Trang ${page}`;
		presenceData.smallImageKey = "list";
		presenceData.largeImageKey = "truyen";
	} else if (pathname.startsWith("/nhom-dich.html")) {
		presenceData.details = "Đang xem danh sách nhóm dịch";
		presenceData.state = `Trang ${page}`;
		presenceData.smallImageKey = "list";
		presenceData.largeImageKey = "truyen";
	} else if (pathname.startsWith("/da-hoan-thanh.html")) {
		presenceData.details = "Đang xem danh sách truyện Đã hoàn thành";
		presenceData.state = `Trang ${page}`;
		presenceData.smallImageKey = "list";
		presenceData.largeImageKey = "truyen";
	} else if (pathname.startsWith("/top-member.php")) {
		presenceData.details = "Đang xem Bảng xếp hạng thành viên";
		presenceData.smallImageKey = "top";
		presenceData.largeImageKey = "admin";
	} else if (pathname.startsWith("/top-waifu-tuan.php")) {
		presenceData.details = "Đang xem Bảng xếp hạng Waifu Tuần";
		presenceData.smallImageKey = "top";
		presenceData.largeImageKey = "admin";
	} else if (pathname.startsWith("/top-waifu.php")) {
		presenceData.details = "Đang xem Bảng xếp hạng Waifu";
		presenceData.smallImageKey = "top";
		presenceData.largeImageKey = "admin";
	} else if (pathname.startsWith("/top-waifu-idol.php")) {
		presenceData.details = "Đang xem Bảng xếp hạng Waifu Idol";
		presenceData.smallImageKey = "top";
		presenceData.largeImageKey = "admin";
	} else if (pathname.startsWith("/forum/user-")) {
		presenceData.details = "Đang xem tường Forum thành viên";
		presenceData.state = document
			.querySelector("h1[itemprop='name']")
			.textContent.trim();
		presenceData.smallImageKey = document.querySelector<HTMLLinkElement>(
			"link[rel='image_src']"
		).href;
		presenceData.largeImageKey = "forum";
		presenceData.buttons = [
			{
				label: `Xem tường ${document
					.querySelector("h1[itemprop='name']")
					.textContent.trim()}`,
				url: document.URL,
			},
		];
	} else if (pathname.startsWith("/user-")) {
		presenceData.details = "Đang xem tường Truyện thành viên";
		presenceData.state = document.querySelector("h2").textContent.trim();
		presenceData.smallImageKey = document.querySelector<HTMLLinkElement>(
			"link[rel='image_src']"
		).href;
		presenceData.largeImageKey = "truyen";
		presenceData.buttons = [
			{
				label: `Xem tường ${document.querySelector("h2").textContent.trim()}`,
				url: document.URL,
			},
		];
	} else if (pathname.startsWith("/forum/edit_pass.php")) {
		presenceData.details = "Đang đổi mật khẩu...";
		presenceData.smallImageKey = "pass";
		presenceData.largeImageKey = "home";
	} else if (pathname.startsWith("/avatar/profile.php")) {
		presenceData.details = "Đang đổi thông tin tài khoản...";
		presenceData.smallImageKey = "info";
		presenceData.largeImageKey = "truyen";
	} else if (pathname.startsWith("/forum/edit_chuky.php")) {
		presenceData.details = "Đang đổi chữ kí...";
		presenceData.smallImageKey = "chuky";
		presenceData.largeImageKey = "home";
	} else if (pathname.startsWith("/forum/edit_avatar.php")) {
		presenceData.details = "Đang đổi avatar...";
		presenceData.smallImageKey = "avt";
		presenceData.largeImageKey = "home";
	} else if (pathname.startsWith("/forum/reply.php")) {
		presenceData.details = "Đang xem trả lời bình luận trong Forum...";
		presenceData.state = `Trang ${
			Number(searchParams.get("start")) / 20 + 1 || "1"
		}`;
		presenceData.smallImageKey = "bell";
		presenceData.largeImageKey = "forum";
	} else if (pathname.startsWith("/inbox.php")) {
		if (searchParams.has("user")) {
			presenceData.details = document
				.querySelector("div[class='bar-title']")
				.textContent.trim();
			presenceData.smallImageKey = "chater";
			presenceData.largeImageKey = "home";
		} else {
			presenceData.details = "Đang xem danh sách tin nhắn";
			presenceData.state = `Trang ${page}`;
			presenceData.smallImageKey = "chat";
			presenceData.largeImageKey = "home";
		}
	} else if (pathname.startsWith("/forum/donate.php")) {
		presenceData.details = `Đang ${document
			.querySelector("title")
			.textContent.trim()}`;
		presenceData.smallImageKey = "donate";
		presenceData.largeImageKey = "admin";
	} else if (pathname.startsWith("/forum/yen.php")) {
		presenceData.details = `Đang chuyển tiền cho thành viên ${document
			.querySelector("b")
			.textContent.trim()}`;
		presenceData.smallImageKey = "money";
		presenceData.largeImageKey = "forum";
	} else if (
		!pathname.startsWith("/forum/t") &&
		pathname.includes("-xem-truyen-")
	) {
		presenceData.details = "Đang đọc truyện...";
		presenceData.state = `${document
			.querySelectorAll("span[itemprop='name']")[2]
			.textContent.trim()} - ${document
			.querySelectorAll("span[itemprop='name']")[3]
			.textContent.trim()}`;
		presenceData.smallImageKey = "doc";
		presenceData.largeImageKey = document.querySelector<HTMLLinkElement>(
			"link[rel='image_src']"
		).href;
		presenceData.buttons = [
			{
				label: "Đọc cùng",
				url: document.URL,
			},
		];
	} else if (
		!pathname.startsWith("/forum/t") &&
		pathname.includes("-doc-truyen-")
	) {
		presenceData.details = "Đang xem thông tin truyện...";
		presenceData.state = `${document
			.querySelectorAll("span[itemprop='name']")[2]
			.textContent.trim()}`;
		presenceData.buttons = [
			{
				label: "Xem truyện",
				url: document.URL,
			},
		];
		presenceData.smallImageKey = "xem";
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			"img[rel='image_src']"
		).src;
	} else if (pathname.startsWith("/forum/t")) {
		presenceData.details = "Đang xem topic ";
		presenceData.state = `${document
			.querySelectorAll("span[itemprop='name']")[3]
			.textContent.trim()} - Trang ${
			Number(searchParams.get("reply")) / 10 + 1 || "1"
		}`;
		presenceData.buttons = [
			{
				label: "Xem topic",
				url: document.URL,
			},
		];
		presenceData.smallImageKey = "xem";
		presenceData.largeImageKey = "forum";
	} else if (pathname.startsWith("/g/")) {
		presenceData.details = `Đang xem danh sách truyện của nhóm "${document
			.querySelectorAll("span[itemprop='name']")[2]
			.textContent.trim()}"`;
		presenceData.state = `Trang ${page}`;
		presenceData.smallImageKey = "list";
		presenceData.largeImageKey = "truyen";
	} else if (pathname === "/forum/") {
		presenceData.details = "Đang duyệt forum";
		presenceData.smallImageKey = "surf";
		presenceData.largeImageKey = "forum";
	} else if (
		pathname.startsWith("/forum/f") &&
		pathname.indexOf(".html") === 1
	) {
		presenceData.details = `Đang duyệt box ${document
			.querySelector("b")
			.textContent.trim()}`;
		presenceData.state = `Trang ${
			Number(searchParams.get("start")) / 20 + 1 || "1"
		}`;
		presenceData.smallImageKey = "surf";
		presenceData.largeImageKey = "forum";
	} else if (pathname.startsWith("/forum/c")) {
		largebox = document.querySelector("title").textContent.trim();
		largebox = largebox.substring(0, largebox.indexOf("-"));
		presenceData.details = `Đang duyệt danh mục ${largebox}`;
		presenceData.smallImageKey = "surf";
		presenceData.largeImageKey = "forum";
	} else if (pathname.startsWith("/forum/search-plus.php")) {
		presenceData.details = "Đang tìm kiếm truyện nâng cao";
		presenceData.smallImageKey = Assets.Search;
		presenceData.largeImageKey = "home";
		if (searchParams.has("search")) {
			keystr = searchParams.getAll("tag[]");
			namekey = searchParams.get("name")
				? `Từ khóa: ${searchParams.get("name")} - `
				: (namekey = "");
			doukey = searchParams.get("dou")
				? `Doujin: ${searchParams.get("dou")} - `
				: (doukey = "");
			charkey = searchParams.get("char")
				? `Nhân vật: ${searchParams.get("char")} - `
				: (charkey = "");

			type keytest = {
				[key: string]: string;
			};
			const keynum: keytest = {
				3: "3D Hentai",
				5: "Action",
				116: "Adult",
				203: "Adventure",
				20: "Ahegao",
				21: "Anal",
				249: "Angel",
				131: "Ảnh động",
				127: "Animal",
				22: "Animal girl",
				279: "Áo Dài",
				277: "Apron",
				115: "Artist CG",
				130: "Based Game",
				257: "BBM",
				251: "BBW",
				24: "BDSM",
				25: "Bestiality",
				133: "Big Ass",
				23: "Big Boobs",
				32: "Big Penis",
				267: "Blackmail",
				27: "Bloomers",
				28: "BlowJobs",
				29: "Body Swap",
				30: "Bodysuit",
				254: "Bondage",
				33: "Breast Sucking",
				248: "BreastJobs",
				31: "Brocon",
				242: "Brother",
				241: "Business Suit",
				39: "Catgirls",
				101: "Che ít",
				129: "Che nhiều",
				34: "Cheating",
				35: "Chikan",
				271: "Chinese Dress",
				100: "Có che",
				36: "Comedy",
				120: "Comic",
				210: "Condom",
				38: "Cosplay",
				2: "Cousin",
				275: "Crotch Tatto",
				269: "Cunniligus",
				40: "Dark Skin",
				262: "Daughter",
				268: "Deepthroat",
				132: "Demon",
				212: "DemonGirl",
				104: "Devil",
				105: "DevilGirl",
				253: "Dirty",
				41: "Dirty Old Man",
				260: "DogGirl",
				42: "Double Penetrantion",
				44: "Doujinshi",
				4: "Drama",
				43: "Drug",
				45: "Ecchi",
				245: "Elder Sister",
				125: "Elf",
				46: "Exhibitionism",
				123: "Fantasy",
				243: "Father",
				47: "Femdom",
				48: "Fingering",
				108: "Footjob",
				259: "Foxgirls",
				37: "Full Color",
				202: "Furry",
				50: "Futanari",
				51: "GangBang",
				206: "Garter Belts",
				52: "Gender Bender",
				106: "Ghost",
				56: "Glasses",
				264: "Gothic Lolita",
				53: "Group",
				55: "Guro",
				247: "Hairy",
				57: "Handjob",
				58: "Harem",
				102: "HentaiVN",
				80: "Historical",
				122: "Horror",
				59: "Housewife",
				60: "Humiliation",
				61: "Idol",
				244: "Imoutp",
				62: "Incest",
				26: "Incest (Côn Trùng)",
				280: "Isekai",
				99: "Không che",
				110: "Kimono",
				265: "Kuudere",
				63: "Lolicon",
				64: "Maids",
				273: "Manhua",
				114: "Manhwa",
				65: "Masturbation",
				119: "Mature",
				124: "Miko",
				126: "Milf",
				121: "Mind Break",
				113: "Mind Control",
				263: "Mizugi",
				66: "Monster",
				67: "Monstegirl",
				103: "Mother",
				205: "Nakadashi",
				1: "Netori",
				201: "Non-hen",
				68: "NTR",
				272: "Nun",
				69: "Nurse",
				211: "Old Man",
				71: "Oneshot",
				70: "Oral",
				209: "Osananajimi",
				72: "Paizuri",
				204: "Pantyhose",
				276: "Ponytail",
				73: "Pregnant",
				98: "Rape",
				258: "Rimjob",
				117: "Romance",
				207: "Ryona",
				134: "Scat",
				74: "School Uniform",
				75: "SchoolGir",
				87: "Series",
				88: "Sex Toys",
				246: "Shimapan",
				118: "Short Hentai",
				77: "Shota",
				76: "Shoujo",
				79: "Siscon",
				78: "Sister",
				82: "Slave",
				213: "Sleeping",
				84: "Small Boobs",
				278: "Son",
				83: "Sports",
				81: "Stockings",
				85: "Supernatural",
				250: "Sweating",
				86: "Swimsuit",
				266: "Tall Girl",
				91: "Teacher",
				89: "Tentacles",
				109: "Time Stop",
				90: "Tomboy",
				252: "Tracksuit",
				256: "Transformation",
				92: "Trap",
				274: "Truyện Việt",
				111: "Tsundere",
				93: "Twins",
				261: "Twintails",
				107: "Vampire",
				208: "Vanilla",
				95: "Virgin",
				270: "Webtoon",
				94: "X-ray",
				112: "Yandere",
				96: "Yaoi",
				97: "Yuri",
				128: "Zombie",
			};
			keystr = keystr
				.toString()
				.replace(
					new RegExp(`\\b(?:${Object.keys(keynum).join("|")})\\b`, "g"),
					(matched: string | number) => keynum[matched]
				);
			keystr = keystr ? `Từ khóa: ${keystr} - ` : (keystr = "");
			presenceData.state = `${namekey}${charkey}${doukey}${keystr}Trang ${page}`;
		} else presenceData.state = "Đang nhập dữ liệu tìm kiếm...";
	} else if (pathname.startsWith("/forum/nhan_tin.php")) {
		presenceData.details = "Đang nhắn tin...";
		presenceData.state = document.querySelector("h3").textContent.trim();
		presenceData.smallImageKey = "chater";
		presenceData.largeImageKey = "home";
	} else if (pathname.startsWith("/forum/mail.php")) {
		presenceData.details = "Đang xem hộp thư...";
		presenceData.state = `Trang ${page}`;
		presenceData.largeImageKey = "home";
		presenceData.smallImageKey = "chat";
	} else if (pathname.startsWith("/forum/free-market.php")) {
		presenceData.details = "Đang lướt chợ tự do...";
		presenceData.smallImageKey = "shop";
		presenceData.largeImageKey = "forum";
	} else if (pathname.startsWith("/forum/shop.php")) {
		presenceData.details = "Đang lướt shop...";
		presenceData.smallImageKey = "shop";
		presenceData.largeImageKey = "forum";
	} else if (pathname.startsWith("/forum/user_item.php")) {
		presenceData.details = "Đang xem kho đồ cá nhân...";
		presenceData.smallImageKey = "kho";
		presenceData.largeImageKey = "forum";
	} else if (pathname.startsWith("/forum/search_member.php")) {
		presenceData.details = "Đang tìm kiếm thành viên...";
		presenceData.smallImageKey = Assets.Search;
		presenceData.largeImageKey = "forum";
	} else if (pathname.startsWith("/forum/member.php")) {
		presenceData.details = "Đang xem danh sách thành viên...";
		presenceData.smallImageKey = "surf";
		presenceData.largeImageKey = "forum";
	} else if (pathname.startsWith("/admin/admin.php")) {
		presenceData.details = "Trong trang quản trị truyện...";
		presenceData.smallImageKey = "up";
		presenceData.largeImageKey = "home";
	} else if (pathname.startsWith("/bookmark-list.php")) {
		presenceData.details = "Đang xem danh sách truyện đang theo dõi";
		presenceData.state = `Trang ${page}`;
		presenceData.smallImageKey = "mark";
		presenceData.largeImageKey = "truyen";
	} else if (pathname.startsWith("/forum/huyhieu.php")) {
		presenceData.details = "Đang xem phòng trưng bày huy hiệu";
		presenceData.smallImageKey = "huyhieu";
		presenceData.largeImageKey = "home";
	} else if (pathname.startsWith("/forum/my_huyhieu.php")) {
		presenceData.details = "Đang xem phòng trưng bày huy hiệu cá nhân";
		presenceData.smallImageKey = "huyhieu";
		presenceData.largeImageKey = "home";
	} else if (pathname.startsWith("/forum/my_waifu.php")) {
		presenceData.details = "Đang xem danh sách waifu cá nhân";
		presenceData.smallImageKey = "waifu";
		presenceData.largeImageKey = "forum";
	} else if (pathname.startsWith("/forum/home_waifu.php")) {
		presenceData.details = "Đang lướt shop nhà waifu...";
		presenceData.smallImageKey = "shop";
		presenceData.largeImageKey = "forum";
	} else if (pathname.startsWith("/register.php")) {
		presenceData.details = "Đang đăng ký tài khoản...";
		presenceData.smallImageKey = "notlog";
		presenceData.largeImageKey = "home";
	} else if (pathname.startsWith("/login.php")) {
		presenceData.details = "Đang đăng nhập...";
		presenceData.smallImageKey = "notlog";
		presenceData.largeImageKey = "home";
	} else if (pathname.startsWith("/forgot-password.php")) {
		presenceData.details = "Đang lấy lại mật khẩu...";
		presenceData.smallImageKey = "notlog";
		presenceData.largeImageKey = "home";
	} else if (pathname.startsWith("/notification-reply.php")) {
		presenceData.details = "Đang xem trả lời bình luận trong cổng truyện...";
		presenceData.state = `Trang ${page}`;
		presenceData.smallImageKey = "chater";
		presenceData.largeImageKey = "home";
	} else if (pathname.startsWith("/notification-comment.php")) {
		presenceData.details = "Đang xem bình luận trong cổng truyện...";
		presenceData.state = `Trang ${page}`;
		presenceData.smallImageKey = "bell";
		presenceData.largeImageKey = "home";
	} else if (pathname.startsWith("/forum/new_topic.php")) {
		presenceData.details = "Đang tạo chủ đề mới...";
		presenceData.smallImageKey = "topic";
		presenceData.largeImageKey = "forum";
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
