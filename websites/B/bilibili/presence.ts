const presence = new Presence({ clientId: "639591760791732224" }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });
const browsingStamp = Math.floor(Date.now() / 1000);
let user: HTMLElement,
  title: HTMLElement,
  inread_title: HTMLElement,
  page: HTMLElement;
let video: HTMLVideoElement,
  videoDuration: number,
  videoCurrentTime: number,
  videoPaused: boolean;
const huodong_title = document.querySelector("#viewbox_report > h1 > a"),
  hudong_title = document.querySelector("#viewbox_report > h1 > span.activity"),
  multi_user = document.querySelector(
    "#app > div > div.r-con > div.members-info"
  );
let currentTime: number,
  duration: number,
  paused: boolean,
  playback: boolean,
  iFramePaused: boolean;

presence.on(
  "iFrameData",
  (data: {
    iframe_video: {
      duration: number;
      currTime: number;
      dur: number;
      test: boolean;
    };
  }) => {
    playback = data.iframe_video.duration !== null ? true : false;

    if (playback) {
      currentTime = data.iframe_video.currTime;
      duration = data.iframe_video.dur;
      iFramePaused = data.iframe_video.test;
    }
  }
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "bb"
  };

  // Maincode
  if (document.location.hostname == "www.bilibili.com") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing...";
      user = document.querySelector(
        "#app > div > div.detail-content > div > div > div.main-content > div.user-name.fs-16.ls-0.d-i-block.big-vip > a"
      );
      //video
    } else if (document.location.pathname.includes("/video/")) {
      video = document.querySelector(
        "#bilibiliPlayer > div.bilibili-player-area.video-state-pause.video-state-blackside.video-control-show > div.bilibili-player-video-wrap > div.bilibili-player-video > video"
      );
      if (video == null) {
        video = document.querySelector(
          "#bilibiliPlayer > div.bilibili-player-area.video-state-pause.video-state-blackside > div.bilibili-player-video-wrap > div.bilibili-player-video > video"
        );
      }
      if (video == null) {
        video = document.querySelector(
          "#bilibiliPlayer > div.bilibili-player-area.video-state-blackside > div.bilibili-player-video-wrap > div.bilibili-player-video > video"
        );
      }
      if (video == null) {
        video = document.querySelector(".bilibili-player-video > video");
      }
      if (video == null) {
        video = document.querySelector(
          "#bilibiliPlayer > div.bilibili-player-area.video-state-blackside.progress-shadow-show > div.bilibili-player-video-wrap > div.bilibili-player-video > video"
        );
      }

      videoDuration = video.duration;
      videoCurrentTime = video.currentTime;
      videoPaused = video.paused;

      const timestamps = presence.getTimestamps(
        Math.floor(videoCurrentTime),
        Math.floor(videoDuration)
      );
      presenceData.smallImageKey = videoPaused ? "pause" : "play";
      presenceData.smallImageText = videoPaused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      if (videoPaused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

      if (huodong_title != null) {
        title = document.querySelector("#viewbox_report > h1 > span");
      } else if (hudong_title != null) {
        title = document.querySelector(
          "#viewbox_report > h1 > span.tit.tr-fix"
        );
      } else {
        title = document.querySelector("#viewbox_report > h1");
      }
      if (multi_user != null) {
        user = document.querySelector(
          "#member-container > div:nth-child(1) > div.avatar-name__container > a"
        );
      } else {
        user = document.querySelector(
          "#v_upinfo > div.up-info_right > div.name > a.username"
        );
      }
      presenceData.details = title.innerText;
      presenceData.state = user.innerText;

      //播放历史
    } else if (document.location.pathname == "/account/history") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing their history";
      //活动
    } else if (document.location.pathname.includes("/blackboard/")) {
      const timestamps = presence.getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );
      presenceData.smallImageKey = iFramePaused ? "pause" : "play";
      presenceData.smallImageText = iFramePaused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
      if (iFramePaused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

      title = document.querySelector("head > title");
      presenceData.details = "Blackboard";
      presenceData.state = title.innerText
        .replace(" - 哔哩哔哩 (゜-゜)つロ 干杯~-bilibili", "")
        .replace(" - 哔哩哔哩 (゜-゜)つロ 干杯~ - bilibili", "")
        .replace(
          " - 哔哩哔哩弹幕视频网 - ( ゜- ゜)つロ  乾杯~  - bilibili",
          ""
        );
      //番剧
    } else if (document.location.pathname.includes("/bangumi/")) {
      video = document.querySelector(
        "#bilibiliPlayer > div.bilibili-player-area.video-state-pause.video-control-show.video-state-blackside > div.bilibili-player-video-wrap > div.bilibili-player-video > video"
      );
      if (video == null) {
        video = document.querySelector(
          "#bilibiliPlayer > div.bilibili-player-area.video-state-pause.video-state-blackside > div.bilibili-player-video-wrap > div.bilibili-player-video > video"
        );
      }
      if (video == null) {
        video = document.querySelector(
          "#bilibiliPlayer > div.bilibili-player-area.video-state-blackside > div.bilibili-player-video-wrap > div.bilibili-player-video > video"
        );
      }
      if (video == null) {
        video = document.querySelector(".bilibili-player-video > video");
      }
      if (video == null) {
        video = document.querySelector(
          "#bilibiliPlayer > div.bilibili-player-area.video-state-blackside.progress-shadow-show > div.bilibili-player-video-wrap > div.bilibili-player-video > video"
        );
      }

      videoDuration = video.duration;
      videoCurrentTime = video.currentTime;
      paused = video.paused;

      const timestamps = presence.getTimestamps(
        Math.floor(videoCurrentTime),
        Math.floor(videoDuration)
      );

      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

      title = document.querySelector("#media_module > div > a.media-title");
      page = document.querySelector(
        "#eplist_module > div.list-wrapper.simple > ul > li.ep-item.cursor.visited > span"
      );

      presenceData.details = title.innerText;
      presenceData.state = "Episode: " + page.innerText + "";
      //小黑屋
    } else if (document.location.pathname == "/blackroom/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Blackroom system";
    } else if (document.location.pathname.includes("/blackroom/ban/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Blackroom system";
      presenceData.state = "Browsing Banned";
    } else if (document.location.pathname == "/judgement/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Judgement system";
    } else if (document.location.pathname.includes("/judgement/index")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Judgement system";
      presenceData.state = "Home";
    } else if (document.location.pathname.includes("/judgement/vote/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Judgement system";
      presenceData.state = "Votebanning";
    } else if (document.location.pathname.includes("/judgement/case")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Judgement system";
      presenceData.state = "Overwatching case";
      //ranking
    } else if (document.location.pathname == "/ranking") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Ranking";
    } else if (document.location.pathname.includes("/ranking/all/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Ranking";
      presenceData.state = "All";
    } else if (document.location.pathname.includes("/ranking/origin/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Ranking";
      presenceData.state = "Origin";
    } else if (document.location.pathname.includes("/ranking/bangumi/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Ranking";
      presenceData.state = "Bangumi";
    } else if (document.location.pathname.includes("/ranking/cinema/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Ranking";
      presenceData.state = "Cinema";
    } else if (document.location.pathname.includes("/ranking/rookie/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Ranking";
      presenceData.state = "Newbie";
      //Subcategory
      //Subcategory	      //Subcategory
      //动画
    } else if (
      document.location.pathname.includes("/cinema/") ||
      document.location.pathname.includes("/anime/") ||
      document.location.pathname.includes("/guochuang/") ||
      document.location.pathname.includes("/audio/") ||
      document.location.pathname.includes("/v/") ||
      document.location.pathname.includes("/documentary/") ||
      document.location.pathname.includes("/movie/") ||
      document.location.pathname.includes("/tv/")
    ) {
      title = document.querySelector("head > title");
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing for subcategory";
      if (title.innerText == "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili") {
        presenceData.state = "资讯";
      } else {
        presenceData.state = title.innerText.replace(
          " - 哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
          ""
        );
      }
      //专栏
    } else if (document.location.pathname.includes("/read/")) {
      user = document.querySelector(
        "body > div.page-container > div.up-info-holder > div > div.up-info-block > div > div.row > a"
      );
      title = document.querySelector(
        "body > div.page-container > div.head-container > div.title-container > h1"
      );
      if (user !== null && title !== null) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = title.innerText;
        presenceData.state = user.innerText;
        presenceData.smallImageKey = "reading";
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing for column";
      }
    }
    //dynamic
  } else if (document.location.hostname == "t.bilibili.com") {
    user = document.querySelector(
      "#app > div > div.detail-content > div > div > div.main-content > div.user-name.fs-16.ls-0.d-i-block.big-vip > a"
    );
    if (user !== null) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing dynamic";
      presenceData.state = "of: " + user.innerText;
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/topic")) {
      title = document.querySelector(
        "#app > div.page-container.p-rel > div.top-header.p-rel > div.tag-title-content.fs-28.ls-0 > div.tag-title.d-i-block"
      );
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing dynamic";
      presenceData.state = "Tag: " + title.innerText;
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing for dynamic";
    }
    //shortfilm
  } else if (document.location.hostname == "vc.bilibili.com") {
    user = document.querySelector(
      "#app > div > div.left-section.f-left > div.uploader-box.module-card.border-box > div > div > div.user > a"
    );
    video = document.querySelector(
      "#app > div > div.left-section.f-left > div.player-area.module-card > div.player-box > div > div > div.bilibili-link-player-video-component > div > video"
    );

    videoDuration = video.duration;
    videoCurrentTime = video.currentTime;
    videoPaused = video.paused;

    const timestamps = presence.getTimestamps(
      Math.floor(videoCurrentTime),
      Math.floor(videoDuration)
    );
    presenceData.smallImageKey = videoPaused ? "pause" : "play";
    presenceData.smallImageText = videoPaused
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    if (videoPaused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
    if (user !== null) {
      presenceData.details = "Watching " + user.innerText + "'s shortfilm";
      presenceData.smallImageKey = "vcall";
    } else {
      presenceData.details = "Browsing for shortfilm";
    }
    //space
  } else if (document.location.hostname == "space.bilibili.com") {
    user = document.querySelector("#h-name");
    if (user !== null) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing channel:";
      presenceData.state = user.innerText;
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Someone's space";
    }
  } else if (document.location.hostname == "account.bilibili.com") {
    if (document.location.pathname.includes("/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing their settings";
    }
    //创作中心
  } else if (document.location.hostname == "member.bilibili.com") {
    if (document.location.pathname.includes("/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing their dashboard";
    }
    //会员购
  } else if (document.location.hostname == "show.bilibili.com") {
    title = document.querySelector(
      "#app > div.buyticket > div.whole-detail-info-wrapper > div.detail-info-wrapper > div.product-info-name"
    );
    if (title !== null) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "会员购";
      presenceData.state = title.innerText;
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "会员购";
    }
    //漫画
  } else if (document.location.hostname == "manga.bilibili.com") {
    inread_title = document.querySelector(
      "body > div.reader-layout.w-100.h-100.p-absolute.p-zero > div > div.manga-reader-ui > div.navbar-container.w-100.p-absolute.p-zero.a-move-in-bottom > nav > div > div.read-nav > a.manga-title.t-over-hidden"
    );
    page = document.querySelector(
      "body > div.reader-layout.w-100.h-100.p-absolute.p-zero > div > div.info-hud.none-select.info-hud.p-absolute.info-layer > div.hinter-image-container.single > span"
    );
    title = document.querySelector(
      "body > div.app-layout > div.size-ruler.p-relative.border-box > div.manga-detail > div.header-info.t-no-wrap.header-info > div.manga-info.dp-i-block.p-relative.v-top.border-box > h1"
    );
    if (page !== null) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = inread_title.innerText;
      presenceData.state = "Reading P." + page.innerText;
      presenceData.smallImageKey = "reading";
    } else if (title !== null) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = title.innerText;
      presenceData.smallImageKey = "reading";
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Manga";
      presenceData.smallImageKey = "reading";
    }
    //手游
  } else if (document.location.hostname == "www.biligame.com") {
    title = document.querySelector(
      "body > div.bui-gc > div.header-bar.one-row > div.right-panel > div > div > h2 > span:nth-child(1)"
    );
    if (title !== null) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Game";
      presenceData.state = title.innerText;
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Game";
    }
  } else if (document.location.hostname == "game.bilibili.com") {
    if (document.location.pathname.includes("/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Game";
    }
    //live
  } else if (document.location.hostname == "live.bilibili.com") {
    user = document.querySelector(
      "#head-info-vm > div > div > div.room-info-down-row > a.room-owner-username.live-skin-normal-a-text.dp-i-block.v-middle"
    );
    title = document.querySelector(
      "#head-info-vm > div > div > div.room-info-upper-row.p-relative > div.normal-mode > div:nth-child(1) > h1 > span.title-length-limit.live-skin-main-text.v-middle.dp-i-block.small-title"
    );
    if (user !== null) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = title.innerText;
      presenceData.state = user.innerText;
      presenceData.smallImageKey = "live";
    } else if (document.location.pathname.includes("/p/")) {
      title = document.querySelector(
        "body > div.app-ctnr > div.wrapper > div > header > h2"
      );
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing live channels";
      presenceData.state = title.innerText;
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing live channels";
    }
  } else if (document.location.hostname == "search.bilibili.com") {
    if (document.location.pathname.includes("/")) {
      const searchinput = document.querySelector("head > title");
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Searching for:";
      presenceData.state = searchinput.innerHTML.replace(
        " - 搜索结果 - 哔哩哔哩弹幕视频网 - ( ゜- ゜)つロ  乾杯~  - bilibili",
        ""
      );
      presenceData.smallImageKey = "search";
    }
  } else if (document.location.hostname == "message.bilibili.com") {
    if (document.URL.includes("/#/reply")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Their notifications";
      presenceData.state = "Reply";
    } else if (document.URL.includes("/#/at")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Their notifications";
      presenceData.state = "At";
    } else if (document.URL.includes("/#/love")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Their notifications";
      presenceData.state = "Love";
    } else if (document.URL.includes("/#/system")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Their notifications";
      presenceData.state = "System message";
    } else if (document.URL.includes("/#/whisper")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Their notifications";
      presenceData.state = "Private message";
    } else if (document.URL.includes("/#/archive")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Their notifications";
      presenceData.state = "PM archive";
    } else if (document.URL.includes("/#/config")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Their notifications";
      presenceData.state = "Message setting";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
