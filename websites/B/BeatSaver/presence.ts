const presence = new Presence({
		clientId: "837997079208525835",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum OtherAssets {
	"360DegreeEasy" = "https://i.imgur.com/OjCC0a2.png",
	"360DegreeExpert" = "https://i.imgur.com/Yzo8x11.png",
	"360DegreeExpertPlus" = "https://i.imgur.com/hIVjHVn.png",
	"360DegreeHard" = "https://i.imgur.com/kDRa5yC.png",
	"360DegreeNormal" = "https://i.imgur.com/2B47zsQ.png",
	"360Degree" = "https://i.imgur.com/ZZIy47j.png",
	"90DegreeEasy" = "https://i.imgur.com/PyfCdsU.png",
	"90DegreeExpert" = "https://i.imgur.com/Oh4JK87.png",
	"90DegreeExpertPlus" = "https://i.imgur.com/w7Lrg26.png",
	"90DegreeHard" = "https://i.imgur.com/614eBsR.png",
	"90DegreeNormal" = "https://i.imgur.com/Lyinu0R.png",
	LawlessEasy = "https://i.imgur.com/g89WIhy.png",
	LawlessExpert = "https://i.imgur.com/MwJO8XO.png",
	LawlessExpertPlus = "https://i.imgur.com/2Pkfbsz.png",
	LawlessHard = "https://i.imgur.com/zq7N05l.png",
	LawlessNormal = "https://i.imgur.com/Sm9lHhc.png",
	LightshowEasy = "https://i.imgur.com/PdQg0hR.png",
	LightshowExpert = "https://i.imgur.com/XoOh1hC.png",
	LightshowExpertPlus = "https://i.imgur.com/1CEVUT6.png",
	LightshowHard = "https://i.imgur.com/ltthw6g.png",
	LightshowNormal = "https://i.imgur.com/AkFJbtq.png",
	LegacyEasy = "https://i.imgur.com/KvYCJE8.png",
	LegacyExpert = "https://i.imgur.com/GEEPOJ4.png",
	LegacyExpertPlus = "https://i.imgur.com/Di0s2HS.png",
	LegacyHard = "https://i.imgur.com/X8gYxVN.png",
	LegacyNormal = "https://i.imgur.com/cbfykqi.png",
	NoArrowsEasy = "https://i.imgur.com/paIHyy8.png",
	NoArrowsExpert = "https://i.imgur.com/bDKWwVA.png",
	NoArrowsExpertPlus = "https://i.imgur.com/2qeKbua.png",
	NoArrowsHard = "https://i.imgur.com/a6CVhdU.png",
	NoArrowsNormal = "https://i.imgur.com/Uw6Ci9A.png",
	OneSaberEasy = "https://i.imgur.com/3JR9H4i.png",
	OneSaberExpert = "https://i.imgur.com/OpdqBoF.png",
	OneSaberExpertPlus = "https://i.imgur.com/3FgTB6G.png",
	OneSaberHard = "https://i.imgur.com/VTLKvXF.png",
	OneSaberNormal = "https://i.imgur.com/6AhE9Oy.png",
	StandardEasy = "https://i.imgur.com/7jE3gMV.png",
	StandardExpert = "https://i.imgur.com/c5lpTfm.png",
	StandardExpertPlus = "https://i.imgur.com/aZyA5kb.png",
	StandardHard = "https://i.imgur.com/41pumvg.png",
	StandardNormal = "https://i.imgur.com/FqAg2k7.png",
}

presence.on("UpdateData", async () => {
	const [time, buttons, cover] = await Promise.all([
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("cover"),
		]),
		presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/B/BeatSaver/assets/logo.png",
			startTimestamp: browsingTimestamp,
		};

	if (document.location.href.includes("/?q=")) {
		presenceData.details = "Searching Beatmaps";
		presenceData.state = (
			document.querySelector("input.form-control") as HTMLInputElement
		).value;
	} else if (document.location.pathname.includes("/maps/")) {
		if (document.querySelector("a[class~='active']")) {
			presenceData.smallImageKey =
				OtherAssets[
					`${
						document
							.querySelector<HTMLImageElement>("a[class~='active'] img")
							.title.split(" ")[1]
					}${document
						.querySelector<HTMLImageElement>("a[class~='active'] img")
						.title.split(" ")[0]
						.replace("+", "Plus")}` as keyof typeof OtherAssets
				];
			presenceData.smallImageText = `${
				(
					document
						.querySelector("a[class~='active']")
						.childNodes.item(0) as HTMLImageElement
				).alt
			} ${
				document.querySelector("a[class~='active']").childNodes.item(1)
					.textContent
			}`;
			if (cover) {
				presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
					"[alt='Cover Image']"
				).src;
			}

			if (
				document.querySelector(
					".list-group-item.d-flex.justify-content-between:nth-child(2) > span"
				) &&
				document.querySelector(
					".list-group-item.d-flex.justify-content-between:nth-child(2) > span"
				).textContent === "Bot"
			) {
				presenceData.smallImageKey = "showauto";
				presenceData.smallImageText = "Made using AI";
			}

			presenceData.details = document.querySelector(
				".card-header.d-flex"
			).childNodes[0].textContent;
			if (presenceData.details === "") presenceData.details = "<NO NAME>";

			presenceData.state = `Uploaded by ${
				document.querySelector(
					".list-group-item.d-flex.justify-content-between a"
				).textContent
			}`;
			presenceData.buttons = [
				{
					label: "View Page",
					url: document.location.href,
				},
				{
					label: "View Uploader's Profile",
					url: `https://beatsaver.com${document
						.querySelector(".list-group-item.d-flex.justify-content-between a")
						.getAttribute("href")}`,
				},
			];
		}
	} else if (document.location.pathname.includes("/profile")) {
		presenceData.details = "Viewing Profile";
		presenceData.state = document.querySelector("h4").textContent;
		presenceData.buttons = [
			{
				label: "View Profile",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/playlists/")) {
		presenceData.details = "Viewing Playlist";
		presenceData.state = document.querySelector(".ms-4")?.textContent;
		presenceData.buttons = [
			{
				label: "View Playlist",
				url: document.location.href,
			},
		];
		if (cover) {
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>("img[alt='Cover']")?.src;
		}
	} else if (document.location.pathname === "/") {
		presenceData.details = "Browsing Beatmaps";
		if (
			document.querySelector(".filter-dropdown > span") &&
			document.querySelector(".filter-dropdown > span").textContent !==
				"Filters"
		) {
			presenceData.state = `Filters: ${
				document.querySelector(".filter-dropdown > span").textContent
			}`;
		}
	}

	switch (document.location.pathname) {
		case "/mappers":
			presenceData.details = "Browsing Mappers";
			break;
		case "/alerts":
			presenceData.details = `Viewing ${
				document.querySelector(".active span").textContent
			} Alerts`;
			break;
		case "/policy/dmca":
			presenceData.details = "Viewing DMCA Policy";
			break;
		case "/upload":
			presenceData.details = "Uploading...";
			break;
		case "/profile":
			presenceData.details = "Viewing Their Own Profile";
			delete presenceData.state;
			delete presenceData.buttons;
			break;
	}

	if (!time) delete presenceData.startTimestamp;

	if (!buttons && presenceData.buttons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
