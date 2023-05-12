const presence = new Presence({
		clientId: "867795822711013387",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
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
		largeImageKey: "https://i.imgur.com/hsnSDNo.png",
	};

	if (document.location.pathname.includes("/common/aquaplayer/")) {
		presenceData.details = document.querySelector(".lec_title").textContent;
		presenceData.state = document.querySelector(
			"#sel_lec option[selected]"
		).textContent;

		const video: HTMLVideoElement = document.querySelector("#video-nplayer-1");

		if (!video.paused) {
			[, presenceData.endTimestamp] = presence.getTimestamps(
				video.currentTime,
				video.duration
			);
			presenceData.smallImageKey = Assets.Play;
			presenceData.smallImageText = (await strings).play;
		} else {
			delete presenceData.endTimestamp;
			presenceData.smallImageKey = Assets.Pause;
			presenceData.smallImageText = (await strings).pause;
		}
	} else {
		presenceData.startTimestamp = browsingTimestamp;

		if (
			document.location.pathname === "/main/main.ds" ||
			document.location.pathname === "/"
		)
			presenceData.details = "홈 화면";
		else if (document.location.pathname.includes("/myzone/mypage/index.ds"))
			presenceData.details = "마이페이지";
		else if (document.location.pathname.includes("/myzone/shoppingCartList.ds"))
			presenceData.details = "장바구니";
		else if (
			document.location.pathname.includes("/myzone/orderDeliveryList.ds")
		)
			presenceData.details = "주문/배송조회";
		else if (
			document.location.pathname.includes("/myzone/mypage/mylctr/myLctrList.ds")
		)
			presenceData.details = "수강중인 강좌";
		else if (
			document.location.pathname.includes(
				"/myzone/mypage/mylctr/detail/myStudyingCourseDetail.ds"
			)
		) {
			presenceData.details = document.querySelector(
				".teacher_home strong"
			).textContent;
			presenceData.state = document.querySelector("#prodNameDt").textContent;
		} else if (
			document.location.pathname.includes(
				"/myzone/mypage/mylctr/passPacLctrList.ds"
			)
		)
			presenceData.details = "강좌 신청하기";
		else if (
			document.location.pathname.includes(
				"/myzone/mypage/mylctr/bookPassList.ds"
			)
		)
			presenceData.details = "교재 신청하기";
		else if (
			document.location.pathname.includes("/tcher/home/tcherHomeMain.ds")
		)
			presenceData.details = "마이맥선생님";
		else if (document.location.pathname.includes("/tcher/eachTcherMain.ds")) {
			const temp: string[] = (
				document.querySelector(".tcher_modal") as HTMLElement
			).textContent.split("\n");
			[presenceData.details, presenceData.state] = [
				temp[0].replace("영역", " 영역"),
				temp[1].replace("선생님", " 선생님"),
			];
		} else if (
			document.location.pathname.includes("/myzone/mypage/myInfo/msgList.ds")
		)
			presenceData.details = "쪽지";
		else if (document.location.pathname.includes("/myzone/interestList.ds"))
			presenceData.details = "관심리스트";
		else if (
			document.location.pathname.includes("/myzone/learningMng/learningPlan.ds")
		)
			presenceData.details = "학습 계획";
		else if (
			document.location.pathname.includes(
				"/myzone/learningMng/learningReport.ds"
			)
		)
			presenceData.details = "학습 리포트";
		else if (
			document.location.pathname.includes(
				"/myzone/mypage/mylctr/detail/bookMarkList.ds"
			)
		)
			presenceData.details = "북마크";
		else if (
			document.location.pathname.includes(
				"/myzone/mypage/correct/useCorrectList.ds"
			)
		)
			presenceData.details = "논술 첨삭 응시 및 첨삭조회";
		else if (document.location.pathname.includes("/myzone/bbs/studyQnaList.ds"))
			presenceData.details = "학습 Q&A";
		else if (document.location.pathname.includes("/myzone/bbs/myQnaList.ds"))
			presenceData.details = "고객센터 Q&A";
		else if (document.location.pathname.includes("/event/eventIngList.ds"))
			presenceData.details = "진행중인 이벤트";
		else if (document.location.pathname.includes("/event/eventEndList.ds"))
			presenceData.details = "종료된 이벤트";
		else if (document.location.pathname.includes("/event/eventPrzwnList.ds"))
			presenceData.details = "당첨자 발표";
		else if (document.location.pathname.includes("/mockExmn/mockExmnMain.ds"))
			presenceData.details = "모의고사";
		else if (document.location.pathname.includes("/entexm/info/entexmMain.ds"))
			presenceData.details = "입시정보";
		else if (document.location.pathname.includes("/cust/custMain.ds"))
			presenceData.details = "고객센터";
		else if (document.location.pathname.includes("/cust/faqList.ds"))
			presenceData.details = "대성마이맥 FAQ";
		else if (document.location.pathname.includes("/cust/notiList.ds"))
			presenceData.details = "고객센터 공지사항";
		else if (document.location.pathname.includes("/main/getMainNoticeList.ds"))
			presenceData.details = "대성마이맥 공지사항";
		else if (document.location.pathname.includes("/cust/otoQna.ds"))
			presenceData.details = "1:1 질문하기";
		else if (document.location.pathname.includes("/cust/myQnaList.ds"))
			presenceData.details = "나의 질문과 답변";
		else if (document.location.pathname.includes("/guhae/guhaeMain.ds"))
			presenceData.details = "구해";
		else presenceData.details = "진짜 공부는 지금부터";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
