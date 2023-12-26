const presence = new Presence({
		clientId: "833644176967991346",
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
	"90Degree" = "https://i.imgur.com/S1JazD5.png",
	LawlessEasy = "https://i.imgur.com/g89WIhy.png",
	LawlessExpert = "https://i.imgur.com/MwJO8XO.png",
	LawlessExpertPlus = "https://i.imgur.com/2Pkfbsz.png",
	LawlessHard = "https://i.imgur.com/zq7N05l.png",
	LawlessNormal = "https://i.imgur.com/Sm9lHhc.png",
	Lawless = "https://i.imgur.com/0S2j43F.png",
	LightshowEasy = "https://i.imgur.com/PdQg0hR.png",
	LightshowExpert = "https://i.imgur.com/XoOh1hC.png",
	LightshowExpertPlus = "https://i.imgur.com/1CEVUT6.png",
	LightshowHard = "https://i.imgur.com/ltthw6g.png",
	LightshowNormal = "https://i.imgur.com/AkFJbtq.png",
	Lightshow = "https://i.imgur.com/tttOnGz.png",
	LegacyEasy = "https://i.imgur.com/KvYCJE8.png",
	LegacyExpert = "https://i.imgur.com/GEEPOJ4.png",
	LegacyExpertPlus = "https://i.imgur.com/Di0s2HS.png",
	LegacyHard = "https://i.imgur.com/X8gYxVN.png",
	LegacyNormal = "https://i.imgur.com/cbfykqi.png",
	Legacy = "https://i.imgur.com/1Lstuag.png",
	NoArrowsEasy = "https://i.imgur.com/paIHyy8.png",
	NoArrowsExpert = "https://i.imgur.com/bDKWwVA.png",
	NoArrowsExpertPlus = "https://i.imgur.com/2qeKbua.png",
	NoArrowsHard = "https://i.imgur.com/a6CVhdU.png",
	NoArrowsNormal = "https://i.imgur.com/Uw6Ci9A.png",
	NoArrows = "https://i.imgur.com/gM9e7R1.png",
	OneSaberEasy = "https://i.imgur.com/3JR9H4i.png",
	OneSaberExpert = "https://i.imgur.com/OpdqBoF.png",
	OneSaberExpertPlus = "https://i.imgur.com/3FgTB6G.png",
	OneSaberHard = "https://i.imgur.com/VTLKvXF.png",
	OneSaberNormal = "https://i.imgur.com/6AhE9Oy.png",
	OneSaber = "https://i.imgur.com/a8pREAV.png",
	StandardEasy = "https://i.imgur.com/7jE3gMV.png",
	StandardExpert = "https://i.imgur.com/c5lpTfm.png",
	StandardExpertPlus = "https://i.imgur.com/aZyA5kb.png",
	StandardHard = "https://i.imgur.com/41pumvg.png",
	StandardNormal = "https://i.imgur.com/FqAg2k7.png",
	Standard = "https://i.imgur.com/u3Ou4UR.png",
	HorizontalEasy = "https://i.imgur.com/lncT4zk.png",
	HorizontalHard = "https://i.imgur.com/6XkP42A.png",
	HorizontalExpert = "https://i.imgur.com/Ou351KE.png",
	HorizontalNormal = "https://i.imgur.com/DKLAucj.png",
	HorizontalExpertPlus = "https://i.imgur.com/3DE6SMi.png",
	Horizontal = "https://i.imgur.com/fLOKnE8.png",
	VerticalHard = "https://i.imgur.com/AsV9wZe.png",
	VerticalEasy = "https://i.imgur.com/u3dmKMl.png",
	VerticalExpertPlus = "https://i.imgur.com/qPGRTN9.png",
	VerticalExpert = "https://i.imgur.com/zwAqCYc.png",
	VerticalNormal = "https://i.imgur.com/wyu0iqg.png",
	Vertical = "https://i.imgur.com/mAkXjis.png",
	InvertedExpert = "https://i.imgur.com/y7wGYhF.png",
	InvertedEasy = "https://i.imgur.com/QVYL77o.png",
	InvertedExpertPlus = "https://i.imgur.com/hycB834.png",
	InvertedNormal = "https://i.imgur.com/4nEmG4B.png",
	InvertedHard = "https://i.imgur.com/iQRzehc.png",
	Inverted = "https://i.imgur.com/Gerp2UQ.png",
	InverseHard = "https://i.imgur.com/JrwEETQ.png",
	InverseExpertPlus = "https://i.imgur.com/jkg9RlL.png",
	InverseEasy = "https://i.imgur.com/T92CGVQ.png",
	InverseExpert = "https://i.imgur.com/yMkb9pm.png",
	InverseNormal = "https://i.imgur.com/tGXJg2W.png",
	Inverse = "https://i.imgur.com/O4tKcYQ.png",
	RhythmGameStandardEasy = "https://i.imgur.com/8JBWLXV.png",
	RhythmGameStandardNormal = "https://i.imgur.com/tfWfN9F.png",
	RhythmGameStandardHard = "https://i.imgur.com/dAehTVk.png",
	RhythmGameStandardExpert = "https://i.imgur.com/jLgM1TI.png",
	RhythmGameStandardExpertPlus = "https://i.imgur.com/Kg70jNv.png",
	RhythmGameStandard = "https://i.imgur.com/pUmqXrE.png",
	"Standard-PinkPlay_ControllableEasy" = "https://i.imgur.com/txQ58Hb.png",
	"Standard-PinkPlay_ControllableNormal" = "https://i.imgur.com/UQItzOw.png",
	"Standard-PinkPlay_ControllableHard" = "https://i.imgur.com/oM2tIFX.png",
	"Standard-PinkPlay_ControllableExpert" = "https://i.imgur.com/W3i1ijv.png",
	"Standard-PinkPlay_ControllableExpertPlus" = "https://i.imgur.com/lNtoqI5.png",
	"Standard-PinkPlay_Controllable" = "https://i.imgur.com/GtkyTMP.png",
	"OneSaber-PinkPlay_ControllableEasy" = "https://i.imgur.com/6WC4TAs.png",
	"OneSaber-PinkPlay_ControllableNormal" = "https://i.imgur.com/cYWy2N7.png",
	"OneSaber-PinkPlay_ControllableHard" = "https://i.imgur.com/X9rAyum.png",
	"OneSaber-PinkPlay_ControllableExpert" = "https://i.imgur.com/J5e3rAr.png",
	"OneSaber-PinkPlay_ControllableExpertPlus" = "https://i.imgur.com/MBPSOmq.png",
	"OneSaber-PinkPlay_Controllable" = "https://i.imgur.com/1Lb0aA3.png",
	"Lawless-PinkPlay_ControllableEasy" = "https://i.imgur.com/N6DVXBa.png",
	"Lawless-PinkPlay_ControllableNormal" = "https://i.imgur.com/wpNPfTF.png",
	"Lawless-PinkPlay_ControllableHard" = "https://i.imgur.com/gcHz84A.png",
	"Lawless-PinkPlay_ControllableExpert" = "https://i.imgur.com/ZbNQqCe.png",
	"Lawless-PinkPlay_ControllableExpertPlus" = "https://i.imgur.com/SEp8fm5.png",
	"Lawless-PinkPlay_Controllable" = "https://i.imgur.com/MoNRVVD.png",
	Easy = "https://i.imgur.com/fNND69T.png",
	Expert = "https://i.imgur.com/Zy5kVyl.png",
	ExpertPlus = "https://i.imgur.com/yxPfNmQ.png",
	Hard = "https://i.imgur.com/cSexHo3.png",
	Normal = "https://i.imgur.com/uWBt3mb.png",
	UnknownEasy = "https://i.imgur.com/X2g8nos.png",
	UnknownExpert = "https://i.imgur.com/tvdwov1.png",
	UnknownExpertPlus = "https://i.imgur.com/tDsfuAG.png",
	UnknownHard = "https://i.imgur.com/0jTbumO.png",
	UnknownNormal = "https://i.imgur.com/1vbCA1u.png",
	Unknown = "https://i.imgur.com/B7aVigy.png",
}

function simplifyKey(key: string): string {
	let result = key;
	result = result.replace("Solo", "");
	if (
		(result.includes("-PinkPlay_Controllable") &&
			!result.match(/(?:Standard|OneSaber|Lawless)-PinkPlay_Controllable/)) ||
		result.match(/(Horizontal|Vertical|Inverted|Inverse)/)
	)
		result = result.replace("-PinkPlay_Controllable", "");
	if (result.startsWith("Generated")) result = result.replace("Generated", "");
	if (result.match(/(Horizontal|Vertical|Inverted|Inverse)/))
		result = result.replace(/Lawless|OneSaber|NoArrows|Standard|Legacy/, "");
	return result;
}

presence.on("UpdateData", async () => {
	const [time, privacy, buttons, cover, mapSmallImages] = await Promise.all([
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("cover"),
			presence.getSetting<number>("mapSmallImages"),
		]),
		presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/S/Score%20Saber/assets/logo.png",
			startTimestamp: browsingTimestamp,
		};
	if (document.querySelector(".is-visible")) {
		presenceData.details = "Searching";
		presenceData.state = (
			document.querySelector(".search-box").children.item(1) as HTMLInputElement
		).value;
	} else if (document.location.pathname.includes("/rankings")) {
		presenceData.details = "Browsing Rankings";
		if (
			document.querySelector<HTMLInputElement>(".ss-input input").value !== ""
		) {
			presenceData.state = `Search: ${
				document.querySelector<HTMLInputElement>(".ss-input input").value
			}`;
		} else if (document.querySelector(".chip")) {
			let filters = "";
			for (const element of document.querySelectorAll(".chip"))
				filters += `${element.textContent.slice(0, -2)},`;

			presenceData.state = `${filters.slice(0, -1)}`;
		}
	} else if (document.location.pathname.includes("/leaderboard")) {
		if (document.location.pathname.includes("/leaderboards")) {
			presenceData.details = "Browsing Leaderboards";
			if (
				document.querySelector<HTMLInputElement>(".ss-input input").value !== ""
			) {
				presenceData.state = `Search: ${
					document.querySelector<HTMLInputElement>(".ss-input input").value
				}`;
			}
		} else if (document.location.pathname.includes("/leaderboard/")) {
			presenceData.details = "Viewing Leaderboard";
			presenceData.state = document.querySelector(
				"div.title.is-5.mb-0 > a"
			)?.textContent;
			presenceData.smallImageKey =
				OtherAssets[
					simplifyKey(
						`${
							mapSmallImages === 0 || mapSmallImages === 1
								? document.querySelector(".content .content>b:last-of-type")
										?.textContent
								: ""
						}${
							mapSmallImages === 0 || mapSmallImages === 2
								? document
										.querySelector<HTMLDivElement>(".tag")
										?.title.replace("+", "Plus")
								: ""
						}`
					) as keyof typeof OtherAssets
				] ??
				OtherAssets[
					`Unknown${
						mapSmallImages === 0 || mapSmallImages === 2
							? document
									.querySelector<HTMLDivElement>(".tag")
									?.title.replace("+", "Plus")
							: ""
					}` as keyof typeof OtherAssets
				];
			presenceData.smallImageText = `${
				mapSmallImages === 0 || mapSmallImages === 1
					? document
							.querySelector(".content .content>b:last-of-type")
							?.textContent.replace("Solo", "")
					: ""
			} ${
				mapSmallImages === 0 || mapSmallImages === 2
					? document.querySelector<HTMLDivElement>(".tag")?.title
					: ""
			}`;
			if (presenceData.smallImageText === "")
				delete presenceData.smallImageText;
			presenceData.buttons = [
				{
					label: "View Page",
					url: document.location.href,
				},
			];
			if (cover) {
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(".map-cover")?.src;
			}
		} else presenceData.details = "Viewing Leaderboard";
	} else if (document.location.pathname.includes("/ranking/requests")) {
		presenceData.details = "Browsing Rank Requests";
		presenceData.state = `${document.querySelector(".title")?.textContent} ${
			document.querySelector("p.heading")?.textContent
		}`;
	} else if (document.location.pathname.includes("/ranking/request")) {
		presenceData.details = "Viewing Rank Request";
		presenceData.state = document.querySelector(
			".media-content > .title"
		)?.textContent;
		presenceData.smallImageKey =
			OtherAssets[
				document
					.querySelector<HTMLDivElement>(".card-content .tag")
					?.title.replace("+", "Plus") as keyof typeof OtherAssets
			];
		presenceData.smallImageText =
			document.querySelector(".selected > span")?.textContent;
		if (cover) {
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>(".map-cover")?.src;
		}
		presenceData.buttons = [
			{
				label: "View Page",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/u/")) {
		presenceData.details = "Viewing User";
		presenceData.smallImageKey =
			document.querySelector<HTMLImageElement>(".country")?.src;
		presenceData.smallImageText =
			document.querySelector<HTMLImageElement>(".country")?.title;
		presenceData.buttons = [
			{
				label: "View Page",
				url: document.location.href,
			},
		];
		if (document.querySelector(".player-link > span")) {
			presenceData.state = `${
				document.querySelector<HTMLImageElement>(".country")?.alt
			} ${document.querySelector(".player-link > span")?.textContent} (${
				document.querySelector(".pp")?.textContent
			})`;
		} else {
			presenceData.state = `${
				document.querySelector<HTMLImageElement>(".country")?.alt
			} ${document.querySelector(".player > span")?.textContent} (${
				document.querySelector(".pp")?.textContent
			})`;
		}
		if (cover) {
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				".profile-picture img"
			)?.src;
		}
	} else if (document.location.pathname.includes("/legal/privacy"))
		presenceData.details = "Viewing Privacy Policy";
	else if (document.location.pathname.includes("/team"))
		presenceData.details = "Viewing ScoreSaber Team";
	else if (document.location.pathname.startsWith("/scores"))
		presenceData.details = "Viewing Score Feed";
	else if (document.location.pathname === "/")
		presenceData.details = "Viewing Homepage";

	if (!time) delete presenceData.startTimestamp;

	if (!buttons) delete presenceData.buttons;

	if (privacy) delete presenceData.state, delete presenceData.buttons;

	presence.setActivity(presenceData);
});
