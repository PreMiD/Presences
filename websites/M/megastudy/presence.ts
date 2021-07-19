const presence = new Presence({
    clientId: "865625724911616050"
  }), 
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let isTitleChecked = false, title: string;
const video = {
  isPlayerPlaying: false,
  currentTime: 0,
  duration: 0
};

presence.on("iFrameData", (data: { isPlayerPlaying: boolean; currentTime: number; duration: number; }) => {
  Object.assign(video, data);
});

presence.on("UpdateData", async () => {

  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname === "/megastudy.asp" || document.location.pathname === "/") {
    presenceData.details = "홈 화면";
    presenceData.startTimestamp = browsingStamp;

  } else if (document.location.pathname.includes("Player")) {

    presenceData.details = document.querySelector(".txt").textContent;

    if (!isTitleChecked) {
      try {
        title = document.querySelector("tr.on td").textContent;
        isTitleChecked = true;
      } catch(e) {
        title = "[수강정보]를 클릭하여 주세요";
      }
    }

    presenceData.state = title;

    if (video.isPlayerPlaying) {
      const [, endTimestamp] = presence.getTimestamps(video.currentTime, video.duration);
      presenceData.endTimestamp = endTimestamp;
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = (await strings).play;
    } else {
      delete presenceData.endTimestamp;
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = (await strings).pause;
    }

  } else if (document.location.pathname.includes("my_std_room/main.asp")) {
    presenceData.details = "내 강의실";
    presenceData.startTimestamp = browsingStamp;
    
  } else if (document.location.pathname.includes("my_std_room/detail.asp")) {
    presenceData.details = document.querySelector(".name").textContent;
    presenceData.state = document.querySelector("h4").textContent;
    presenceData.startTimestamp = browsingStamp;
    
  } else if (document.location.pathname.includes("/teacher_v2/teacher_main.asp")) {
    presenceData.details = "메가선생님";
    presenceData.startTimestamp = browsingStamp;

  } else if (document.location.pathname.includes("/teacher_v2/main.asp")) {
    [presenceData.details, presenceData.state] = (document.querySelector(".lnb_tit") as HTMLElement).innerText.split("\n");
    presenceData.startTimestamp = browsingStamp;

  } else if (document.location.pathname.includes("/Mypage/mp_2017/main/main.asp")) {
    presenceData.details = "마이페이지";
    presenceData.startTimestamp = browsingStamp;

  } else if (document.location.pathname.includes("/mypage/mp_2017/notice/list.asp")) {
    presenceData.details = "알림";
    presenceData.startTimestamp = browsingStamp;

  } else if (document.location.pathname.includes("/Mypage/mp_2017/apply/chr_new/main.asp")) {
    presenceData.details = "수강신청";
    presenceData.startTimestamp = browsingStamp;

  } else if (document.location.pathname.includes("/mypage/mp_2017/pay/cart/cart_list.asp")) {
    presenceData.details = "장바구니";
    presenceData.startTimestamp = browsingStamp;

  } else if (document.location.pathname.includes("/mypage/mp_2017/order/order_list.asp")) {
    presenceData.details = "주문/배송조회";
    presenceData.startTimestamp = browsingStamp;

  } else {
    presenceData.details = "합격 불변의 법칙";
    presenceData.startTimestamp = browsingStamp;
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);

});
