const presence = new Presence({
	clientId: "1195051461822914640",
});

const enum Assets {
	Logo = "https://i.imgur.com/7pI9X5M.png",
}

const boards: { [board: string]: string } = {
		"/3/": "3DCG",
		"/a/": "Anime & Manga",
		"/aco/": "Adult Cartoons",
		"/adv/": "Advice",
		"/an/": "Animals & Nature",
		"/asp/": "Alternative Sports",
		"/b/": "Random",
		"/bant/": "International/Random",
		"/biz/": "Business & Finance",
		"/c/": "Anime/Cute",
		"/cgl/": "Cosplay & EGL",
		"/ck/": "Food & Cooking",
		"/cm/": "Cute/Male",
		"/co/": "Comics & Cartoons",
		"/d/": "Hentai/Alternative",
		"/diy/": "Do*It*Yourself",
		"/e/": "Ecchi",
		"/f/": "Flash",
		"/fa/": "Fashion",
		"/fit/": "Fitness",
		"/g/": "Technology",
		"/gd/": "Graphic Design",
		"/gif/": "Adult GIF",
		"/h/": "Hentai",
		"/hc/": "Hardcore",
		"/hm/": "Handsome Men",
		"/hr/": "High Resolution",
		"/i/": "Oekaki",
		"/ic/": "Artwork/Critique",
		"/his/": "History & Humanities",
		"/int/": "International",
		"/jp/": "Otaku Culture",
		"/k/": "Weapons",
		"/lit/": "Literature",
		"/lgbt/": "LGBT",
		"/m/": "Mecha",
		"/mlp/": "Pony",
		"/mu/": "Music",
		"/news/": "Current News",
		"/n/": "Transportation",
		"/o/": "Auto",
		"/out/": "Outdoors",
		"/p/": "Photography",
		"/po/": "Papercraft & Origami",
		"/pol/": "Politically Incorrect",
		"/pw/": "Professional Wrestling",
		"/qst/": "Quests",
		"/r/": "Adult Requests",
		"/r9k/": "ROBOT9001",
		"/s4s/": "Shit 4chan Says",
		"/s/": "Sexy Beautiful Women",
		"/sci/": "Science & Math",
		"/soc/": "Cams & Meetups",
		"/sp/": "Sports",
		"/t/": "Torrents",
		"/tg/": "Traditional Games",
		"/toy/": "Toys",
		"/trash/": "Off*topic",
		"/trv/": "Travel",
		"/tv/": "Television & Film",
		"/u/": "Yuri",
		"/v/": "Video Games",
		"/vg/": "Video Game Generals",
		"/vm/": "Video Games/Multiplayer",
		"/vmg/": "Video Games/Mobile",
		"/vip/": "Very Important Posts",
		"/vp/": "Pokémon",
		"/vr/": "Retro Games",
		"/vrpg/": "Video Games/RPG",
		"/vst/": "Video Games/Strategy",
		"/vt/": "Virtual YouTubers",
		"/w/": "Anime/Wallpapers",
		"/wg/": "Wallpapers/General",
		"/wsg/": "Worksafe GIF",
		"/wsr/": "Worksafe Requests",
		"/x/": "Paranormal",
		"/xs/": "Extreme Sports",
		"/y/": "Yaoi",
	},
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	},
	{ pathname } = document.location;

	if (document.location.pathname === "/")
		presenceData.details = "Viewing the front page";
	else if (document.location.pathname.startsWith("/faq"))
		presenceData.details = "Reading the FAQ";
	else if (document.location.pathname.startsWith("/rules"))
		presenceData.details = "Reading the rules";
	else if (document.location.pathname.startsWith("/4channews"))
		presenceData.details = "Viewing news posts";
	else {
		for (const board in boards) {
			if (document.location.pathname.includes(board))
				presenceData.details = `Browsing ${board} - ${boards[board]}`;
		}

		if (document.location.pathname.includes("/thread/")) {
			const threadNum = document.location.pathname.split("/").at(-1),
				threadSubject = document.querySelector(".subject").textContent;

			if (threadSubject)
				presenceData.state = `>>${threadNum} - "${threadSubject}"`;
			else presenceData.state = `>>${threadNum}`;
		} else if (document.location.pathname.includes("/archive"))
			presenceData.state = "Checking the archive";
	}

	presence.setActivity(presenceData);
});
