var presence = new Presence({
    clientId: "639591760791732224"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

var browsingStamp = Math.floor(Date.now() / 1000);

var user: any;
var title: any;
var UID: any;
var page: any;
var currentTime: any,
  duration: any,
  paused: any,
  playback: any,
  iFramePaused: any;

presence.on("iFrameData", (data) => {
  playback = data.iframe_video.duration !== null ? true : false;

  if (playback) {
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.dur;
    iFramePaused = data.iframe_video.test;
  }
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "bb"
  };

  if (document.location.hostname == "www.bilibili.com") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing...";
      user = document.querySelector(
        "#app > div > div.detail-content > div > div > div.main-content > div.user-name.fs-16.ls-0.d-i-block.big-vip > a"
      );
      //video
    } else if (document.location.pathname.includes("/video/")) {
      var video: HTMLVideoElement,
        videoDuration: any,
        videoCurrentTime: any,
        videoPaused: any;
      video = document.querySelector(
        "#bilibiliPlayer > div.bilibili-player-area.video-state-pause.video-control-show.video-state-blackside > div.bilibili-player-video-wrap > div.bilibili-player-video > video"
      );
      if (video == null) {
        video = document.querySelector(
          "#bilibiliPlayer > div.bilibili-player-area.video-state-blackside.video-state-pause > div.bilibili-player-video-wrap > div.bilibili-player-video > video"
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

      const timestamps = getTimestamps(
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

      title = document.querySelector("#viewbox_report > h1");
      user = document.querySelector(
        "#v_upinfo > div.u-info > div > a.username"
      );
      presenceData.details = title.innerText;
      presenceData.state = "By user: " + user.innerText;
      //播放历史
    } else if (document.location.pathname == "/account/history") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing history";
      //活动
    } else if (document.location.pathname.includes("/blackboard/")) {
      const timestamps = getTimestamps(
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
      presenceData.details = "Viewing Blackboard";
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
          "#bilibiliPlayer > div.bilibili-player-area.video-state-blackside.video-state-pause > div.bilibili-player-video-wrap > div.bilibili-player-video > video"
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

      const timestamps = getTimestamps(
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
      presenceData.details = "Browsing ranking";
    } else if (document.location.pathname.includes("/ranking/all/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing ranking";
      presenceData.state = "All";
    } else if (document.location.pathname.includes("/ranking/origin/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing ranking";
      presenceData.state = "Origin";
    } else if (document.location.pathname.includes("/ranking/bangumi/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing ranking";
      presenceData.state = "Bangumi";
    } else if (document.location.pathname.includes("/ranking/cinema/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing ranking";
      presenceData.state = "Cinema";
    } else if (document.location.pathname.includes("/ranking/rookie/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing ranking";
      presenceData.state = "Newbie";
      //Subcategory
      //动画
    } else if (document.location.pathname == "/v/douga/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Anime";
    } else if (document.location.pathname.includes("/v/douga/mad")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Anime";
      presenceData.state = "└ MAD·AMV";
    } else if (document.location.pathname.includes("/v/douga/mmd")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Anime";
      presenceData.state = "└ MMD·3D";
    } else if (document.location.pathname.includes("/v/douga/voice")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Anime";
      presenceData.state = "└ Shortfilm·Handdrawing·Dubbing";
    } else if (document.location.pathname.includes("/v/douga/tokusatsu")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Anime";
      presenceData.state = "└ Tokusatsu";
    } else if (document.location.pathname.includes("/v/douga/other")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Anime";
      presenceData.state = "└ Other";
      //番剧
    } else if (document.location.pathname == "/anime/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Bangumi";
    } else if (document.location.pathname.includes("/v/anime/serial/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Bangumi";
      presenceData.state = "└ Serial";
    } else if (document.location.pathname.includes("/v/anime/finish/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Bangumi";
      presenceData.state = "└ Finished";
    } else if (document.location.pathname.includes("/v/anime/information")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Bangumi";
      presenceData.state = "└ Information";
    } else if (document.location.pathname.includes("/v/anime/offical/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Bangumi";
      presenceData.state = "└ Offical";
    } else if (document.location.pathname.includes("/anime/timeline/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Bangumi";
      presenceData.state = "└ TimeLine";
    } else if (document.location.pathname.includes("/anime/index/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Bangumi";
      presenceData.state = "└ Index";
      //国创
    } else if (document.location.pathname == "/guochuang/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Domestic";
    } else if (document.location.pathname.includes("/v/guochuang/chinese/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Domestic";
      presenceData.state = "└ Chinese animation";
    } else if (document.location.pathname.includes("/v/guochuang/original/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Domestic";
      presenceData.state = "└ Domestic original";
    } else if (document.location.pathname.includes("/v/guochuang/puppetry/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Domestic";
      presenceData.state = "└ Glove puppetry";
    } else if (
      document.location.pathname.includes("/v/guochuang/motioncomic/")
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Domestic";
      presenceData.state = "└ Motioncomic·Radio";
    } else if (
      document.location.pathname.includes("/v/guochuang/information/")
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Domestic";
      presenceData.state = "└ Information";
    } else if (document.location.pathname.includes("/guochuang/timeline/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Domestic";
      presenceData.state = "└ TimeLine";
    } else if (document.location.pathname.includes("/guochuang/index/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Domestic";
      presenceData.state = "└ Index";
      //音乐
    } else if (document.location.pathname == "/v/music/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Music";
    } else if (document.location.pathname.includes("/v/music/original/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Music";
      presenceData.state = "└ Original";
    } else if (document.location.pathname.includes("/v/music/cover/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Music";
      presenceData.state = "└ Cover";
    } else if (document.location.pathname.includes("/v/music/vocaloid/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Music";
      presenceData.state = "└ VOCALOID·UTAU";
    } else if (document.location.pathname.includes("/v/music/electronic/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Music";
      presenceData.state = "└ Electronic";
    } else if (document.location.pathname.includes("/v/music/perform/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Music";
      presenceData.state = "└ Perform";
    } else if (document.location.pathname.includes("/v/music/mv/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Music";
      presenceData.state = "└ MV";
    } else if (document.location.pathname.includes("/v/music/live/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Music";
      presenceData.state = "└ Live";
    } else if (document.location.pathname.includes("/v/music/other/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Music";
      presenceData.state = "└ Other";
      //Audio¿¿¿
    } else if (document.location.pathname.includes("/audio/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Music";
      presenceData.state = "└ Audio";
      //舞蹈
    } else if (document.location.pathname == "/v/dance/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Dance";
    } else if (document.location.pathname.includes("/v/dance/otaku/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Dance";
      presenceData.state = "└ Otaku";
    } else if (document.location.pathname.includes("/v/dance/hiphop/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Dance";
      presenceData.state = "└ Hiphop";
    } else if (document.location.pathname.includes("/v/dance/star/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Dance";
      presenceData.state = "└ Star";
    } else if (document.location.pathname.includes("/v/dance/china/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Dance";
      presenceData.state = "└ China";
    } else if (document.location.pathname.includes("/v/dance/three_d/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Dance";
      presenceData.state = "└ Other";
    } else if (document.location.pathname.includes("/v/dance/demo/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Dance";
      presenceData.state = "└ Tutorial";
      //游戏
    } else if (document.location.pathname == "/v/game/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Game";
    } else if (document.location.pathname.includes("/v/game/stand_alone/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Dance";
      presenceData.state = "└ Single player games";
    } else if (document.location.pathname.includes("/v/game/esports/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Dance";
      presenceData.state = "└ Esports";
    } else if (document.location.pathname.includes("/v/game/mobile/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Dance";
      presenceData.state = "└ Mobile games";
    } else if (document.location.pathname.includes("/v/game/online/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Dance";
      presenceData.state = "└ Online games";
    } else if (document.location.pathname.includes("/v/game/board/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Dance";
      presenceData.state = "└ Board role-playing games";
    } else if (document.location.pathname.includes("/v/game/gmv/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Dance";
      presenceData.state = "└ GMV";
    } else if (document.location.pathname.includes("/v/game/music/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Dance";
      presenceData.state = "└ Rhythm games";
    } else if (document.location.pathname.includes("/v/game/mugen/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Dance";
      presenceData.state = "└ Mugen";
    } else if (document.location.pathname.includes("/v/game/match/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Dance";
      presenceData.state = "└ Tournaments";
      //科技
    } else if (document.location.pathname == "/v/technology/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Tech";
    } else if (document.location.pathname.includes("/v/technology/fun/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Tech";
      presenceData.state = "└ Fun";
    } else if (document.location.pathname.includes("/v/technology/wild/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Tech";
      presenceData.state = "└ Technique";
    } else if (
      document.location.pathname.includes("/v/technology/speech_course/")
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Tech";
      presenceData.state = "└ Speech·Open class";
    } else if (document.location.pathname.includes("/v/technology/military/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Tech";
      presenceData.state = "└ Military";
    } else if (
      document.location.pathname.includes("/v/technology/mechanical/")
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Tech";
      presenceData.state = "└ Mechanical";
    } else if (
      document.location.pathname.includes("/v/technology/automobile/")
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Tech";
      presenceData.state = "└ Automobile";
      //数码
    } else if (document.location.pathname == "/v/digital/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Digital";
    } else if (document.location.pathname.includes("/v/digital/mobile/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Digital";
      presenceData.state = "└ MobilePhone";
    } else if (document.location.pathname.includes("/v/digital/pc/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Digital";
      presenceData.state = "└ PC Building";
    } else if (document.location.pathname.includes("/v/digital/photography/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Digital";
      presenceData.state = "└ Photography";
    } else if (
      document.location.pathname.includes("/v/digital/intelligence_av/")
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Digital";
      presenceData.state = "└ Intelligence";
      //生活
    } else if (document.location.pathname == "/v/life/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Life";
    } else if (document.location.pathname.includes("/v/life/funny/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Life";
      presenceData.state = "└ Funny";
    } else if (document.location.pathname.includes("/v/life/daily/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Life";
      presenceData.state = "└ Daily";
    } else if (document.location.pathname.includes("/v/life/food/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Life";
      presenceData.state = "└ Food";
    } else if (document.location.pathname.includes("/v/life/animal/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Life";
      presenceData.state = "└ Animal";
    } else if (document.location.pathname.includes("/v/life/handmake/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Life";
      presenceData.state = "└ Handmake";
    } else if (document.location.pathname.includes("/v/life/painting/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Life";
      presenceData.state = "└ Painting";
    } else if (document.location.pathname.includes("/v/life/sports/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Life";
      presenceData.state = "└ Sports";
    } else if (document.location.pathname.includes("/v/life/other/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Life";
      presenceData.state = "└ Other";
      //鬼畜
    } else if (document.location.pathname == "/v/kichiku/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Kichiku";
    } else if (document.location.pathname.includes("/v/kichiku/guide/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Kichiku";
      presenceData.state = "└ Kichiku Rap";
    } else if (document.location.pathname.includes("/v/kichiku/mad/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Kichiku";
      presenceData.state = "└ Voice MAD";
    } else if (
      document.location.pathname.includes("/v/kichiku/manual_vocaloid/")
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Kichiku";
      presenceData.state = "└ Manual Vocaloid";
    } else if (document.location.pathname.includes("/v/kichiku/course/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Kichiku";
      presenceData.state = "└ Course";
      //时尚
    } else if (document.location.pathname == "/v/fashion/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Fashion";
    } else if (document.location.pathname.includes("/v/fashion/makeup/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Fashion";
      presenceData.state = "└ Makeup";
    } else if (document.location.pathname.includes("/v/fashion/clothing/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Fashion";
      presenceData.state = "└ Clothing";
    } else if (document.location.pathname.includes("/v/fashion/aerobics/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Fashion";
      presenceData.state = "└ Aerobics";
    } else if (document.location.pathname.includes("/v/fashion/catwalk/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Fashion";
      presenceData.state = "└ Catwalk";
    } else if (document.location.pathname.includes("/v/fashion/trends/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Fashion";
      presenceData.state = "└ Trends";
      //广告
    } else if (document.location.pathname == "/v/ad/ad") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing ADs";
      //娱乐
    } else if (document.location.pathname == "/v/ent/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Entertainment";
    } else if (document.location.pathname.includes("/v/ent/variety/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Entertainment";
      presenceData.state = "└ Variety show";
    } else if (document.location.pathname.includes("/v/ent/star/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Entertainment";
      presenceData.state = "└ Variety Star";
    } else if (document.location.pathname.includes("/v/ent/korea/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Entertainment";
      presenceData.state = "└ Variety Korea";
      //影视
    } else if (document.location.pathname == "/v/cinephile/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Film";
    } else if (document.location.pathname.includes("/v/cinephile/cinecism/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Film";
      presenceData.state = "└ Talk about";
    } else if (document.location.pathname.includes("/v/cinephile/montage/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Film";
      presenceData.state = "└ Montage";
    } else if (document.location.pathname.includes("/v/cinephile/shortfilm/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Film";
      presenceData.state = "└ Shortfilm";
    } else if (
      document.location.pathname.includes("/v/cinephile/trailer_info/")
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Film";
      presenceData.state = "└ Information";
      //放映厅
    } else if (document.location.pathname == "/cinema/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing cinema";
      //纪录片
    } else if (document.location.pathname == "/documentary/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Documentary";
    } else if (document.location.pathname.includes("/v/documentary/history/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Documentary";
      presenceData.state = "└ History";
    } else if (document.location.pathname.includes("/v/documentary/science/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Documentary";
      presenceData.state = "└ Science·Exploration·Nature";
    } else if (
      document.location.pathname.includes("/v/documentary/military/")
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Documentary";
      presenceData.state = "└ Military";
    } else if (document.location.pathname.includes("/v/documentary/travel/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Documentary";
      presenceData.state = "└ Travel";
    } else if (document.location.pathname.includes("/documentary/index/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Documentary";
      presenceData.state = "└ Index";
      //电影
    } else if (document.location.pathname == "/movie/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Movie";
    } else if (document.location.pathname.includes("/v/movie/chinese/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Movie";
      presenceData.state = "└ Chinese";
    } else if (document.location.pathname.includes("/v/movie/west/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Movie";
      presenceData.state = "└ European&American";
    } else if (document.location.pathname.includes("/v/movie/japan/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Movie";
      presenceData.state = "└ Japanese";
    } else if (document.location.pathname.includes("/v/movie/movie/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Movie";
      presenceData.state = "└ Other ";
    } else if (document.location.pathname.includes("/movie/index/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Movie";
      presenceData.state = "└ Index";
      //电视剧
    } else if (document.location.pathname == "/tv/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing TV series";
    } else if (document.location.pathname.includes("/v/tv/mainland/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing TV series";
      presenceData.state = "└ China domestic";
    } else if (document.location.pathname.includes("/v/tv/overseas/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing TV series";
      presenceData.state = "└ China overseas";
    } else if (document.location.pathname.includes("/tv/index/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing TV series";
      presenceData.state = "└ index";
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
        presenceData.details = "Reading column: ";
        presenceData.smallImageKey = "reading";
        presenceData.state = title.innerText;
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
      presenceData.details = "Reading " + user.innerText + "'s dynamic";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/topic")) {
      title = document.querySelector(
        "#app > div.page-container.p-rel > div.top-header.p-rel > div.tag-title-content.fs-28.ls-0 > div.tag-title.d-i-block"
      );
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing dynamic";
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
    paused = video.paused;

    const timestamps = getTimestamps(
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
    if (user !== null) {
      presenceData.details = "Watching " + user.innerText + "'s shortfilm";
      presenceData.smallImageKey = "vcall";
    } else {
      presenceData.details = "Browsing for shortfilm";
    }
    //space
  } else if (document.location.hostname == "space.bilibili.com") {
    user = document.querySelector("#h-name");
    UID = document.querySelector(
      "#page-index > div.col-2 > div.section.user.private > div.info > div > div > div > div.item.uid > span.text"
    );
    if (user !== null && UID !== null) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing user space";
      presenceData.state = user.innerText + " | UID: " + UID.innerText;
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Someone's space";
    }
  } else if (document.location.hostname == "account.bilibili.com") {
    if (document.location.pathname.includes("/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing account setting";
    }
    //创作中心
  } else if (document.location.hostname == "member.bilibili.com") {
    if (document.location.pathname.includes("/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing 创作中心";
    }
    //会员购
  } else if (document.location.hostname == "show.bilibili.com") {
    title = document.querySelector(
      "#app > div.buyticket > div.whole-detail-info-wrapper > div.detail-info-wrapper > div.product-info-name"
    );
    if (title !== null) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing 会员购";
      presenceData.state = title.innerText;
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing 会员购";
    }
    //漫画
  } else if (document.location.hostname == "manga.bilibili.com") {
    page = document.querySelector(
      "body > div.reader-layout.w-100.h-100.p-absolute.p-zero > div > div.info-hud.none-select.info-hud.p-absolute.info-layer > div.hinter-image-container.single > span"
    );
    title = document.querySelector(
      "body > div.reader-layout.w-100.h-100.p-absolute.p-zero > div > div.manga-reader-ui > div.navbar-container.w-100.p-absolute.p-zero.a-move-in-bottom > nav > div > div.read-nav > a:nth-child(3)"
    );
    if (title !== null) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = title.innerText;
      presenceData.state = "Reading P." + page.innerText;
      presenceData.smallImageKey = "reading";
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Manga";
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
    if (user !== null && UID !== null) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Watching " + user.innerText + "'s streaming";
      presenceData.state = title.innerText;
      presenceData.smallImageKey = "live";
    } else if (document.location.pathname.includes("/p/")) {
      title = document.querySelector(
        "body > div.app-ctnr > div.wrapper > div > header > h2"
      );
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing for live category";
      presenceData.state = "└ " + title.innerText;
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing for live channels";
    }
  } else if (document.location.hostname == "search.bilibili.com") {
    if (document.location.pathname.includes("/")) {
      var searchinput = document.querySelector("head > title");
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Bilibili Search";
      presenceData.state = searchinput.innerHTML.replace(
        " - 搜索结果 - 哔哩哔哩弹幕视频网 - ( ゜- ゜)つロ  乾杯~  - bilibili",
        ""
      );
    }
  } else if (document.location.hostname == "message.bilibili.com") {
    if (document.URL.includes("/#/reply")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing message";
      presenceData.state = "Reply";
    } else if (document.URL.includes("/#/at")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing message";
      presenceData.state = "At";
    } else if (document.URL.includes("/#/love")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing message";
      presenceData.state = "Love";
    } else if (document.URL.includes("/#/system")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing message";
      presenceData.state = "System message";
    } else if (document.URL.includes("/#/whisper")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing message";
      presenceData.state = "Private message";
    } else if (document.URL.includes("/#/archive")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing message";
      presenceData.state = "PM archive";
    } else if (document.URL.includes("/#/config")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing message";
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
