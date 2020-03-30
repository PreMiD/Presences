var presence = new Presence({
    clientId: "639591760791732224"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var searchhome;
var title;
var replace;
var search;
var UID;
var page;
var searchTab;
var iFrameVideo, currentTime, duration, paused, playback, iFramePaused;
searchhome = document.querySelector("#server-search-app > div > div > div.home-suggest.clearfix");
presence.on("iFrameData", data => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
        iFrameVideo = data.iframe_video.iFrameVideo;
        currentTime = data.iframe_video.currTime;
        duration = data.iframe_video.dur;
        iFramePaused = data.iframe_video.test;
    }
});
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "bb"
    };
    if (document.location.hostname == "www.bilibili.com") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing...";
            user = document.querySelector("#app > div > div.detail-content > div > div > div.main-content > div.user-name.fs-16.ls-0.d-i-block.big-vip > a");
        }
        else if (document.location.pathname.includes("/video/")) {
            var video, videoDuration, videoCurrentTime, videoPaused;
            video = document.querySelector("#bilibiliPlayer > div.bilibili-player-area.video-state-pause.video-control-show.video-state-blackside > div.bilibili-player-video-wrap > div.bilibili-player-video > video");
            if (video == null) {
                video = document.querySelector("#bilibiliPlayer > div.bilibili-player-area.video-state-blackside.video-state-pause > div.bilibili-player-video-wrap > div.bilibili-player-video > video");
            }
            if (video == null) {
                video = document.querySelector("#bilibiliPlayer > div.bilibili-player-area.video-state-blackside > div.bilibili-player-video-wrap > div.bilibili-player-video > video");
            }
            if (video == null) {
                video = document.querySelector(".bilibili-player-video > video");
            }
            if (video == null) {
                video = document.querySelector("#bilibiliPlayer > div.bilibili-player-area.video-state-blackside.progress-shadow-show > div.bilibili-player-video-wrap > div.bilibili-player-video > video");
            }
            videoDuration = video.duration;
            videoCurrentTime = video.currentTime;
            videoPaused = video.paused;
            var timestamps = getTimestamps(Math.floor(videoCurrentTime), Math.floor(videoDuration));
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
            user = document.querySelector("#v_upinfo > div.u-info > div > a.username");
            presenceData.details = title.innerText;
            presenceData.state = "By user: " + user.innerText;
        }
        else if (document.location.pathname == "/account/history") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing history";
        }
        else if (document.location.pathname.includes("/blackboard/")) {
            var timestamps = getTimestamps(Math.floor(currentTime), Math.floor(duration));
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
                .replace(" - 哔哩哔哩弹幕视频网 - ( ゜- ゜)つロ  乾杯~  - bilibili", "");
        }
        else if (document.location.pathname.includes("/bangumi/")) {
            var video, videoDuration, videoCurrentTime, paused;
            video = document.querySelector("#bilibiliPlayer > div.bilibili-player-area.video-state-pause.video-control-show.video-state-blackside > div.bilibili-player-video-wrap > div.bilibili-player-video > video");
            if (video == null) {
                video = document.querySelector("#bilibiliPlayer > div.bilibili-player-area.video-state-blackside.video-state-pause > div.bilibili-player-video-wrap > div.bilibili-player-video > video");
            }
            if (video == null) {
                video = document.querySelector("#bilibiliPlayer > div.bilibili-player-area.video-state-blackside > div.bilibili-player-video-wrap > div.bilibili-player-video > video");
            }
            if (video == null) {
                video = document.querySelector(".bilibili-player-video > video");
            }
            if (video == null) {
                video = document.querySelector("#bilibiliPlayer > div.bilibili-player-area.video-state-blackside.progress-shadow-show > div.bilibili-player-video-wrap > div.bilibili-player-video > video");
            }
            videoDuration = video.duration;
            videoCurrentTime = video.currentTime;
            paused = video.paused;
            var timestamps = getTimestamps(Math.floor(videoCurrentTime), Math.floor(videoDuration));
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
            page = document.querySelector("#eplist_module > div.list-wrapper.simple > ul > li.ep-item.cursor.visited > span");
            presenceData.details = title.innerText;
            presenceData.state = "Episode: " + page.innerText + "";
        }
        else if (document.location.pathname == "/blackroom/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Blackroom system";
        }
        else if (document.location.pathname.includes("/blackroom/ban/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Blackroom system";
            presenceData.state = "Browsing Banned";
        }
        else if (document.location.pathname == "/judgement/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Judgement system";
        }
        else if (document.location.pathname.includes("/judgement/index")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Judgement system";
            presenceData.state = "Home";
        }
        else if (document.location.pathname.includes("/judgement/vote/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Judgement system";
            presenceData.state = "Votebanning";
        }
        else if (document.location.pathname.includes("/judgement/case")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Judgement system";
            presenceData.state = "Overwatching case";
        }
        else if (document.location.pathname == "/ranking") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing ranking";
        }
        else if (document.location.pathname.includes("/ranking/all/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing ranking";
            presenceData.state = "All";
        }
        else if (document.location.pathname.includes("/ranking/origin/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing ranking";
            presenceData.state = "Origin";
        }
        else if (document.location.pathname.includes("/ranking/bangumi/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing ranking";
            presenceData.state = "Bangumi";
        }
        else if (document.location.pathname.includes("/ranking/cinema/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing ranking";
            presenceData.state = "Cinema";
        }
        else if (document.location.pathname.includes("/ranking/rookie/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing ranking";
            presenceData.state = "Newbie";
        }
        else if (document.location.pathname == "/v/douga/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Anime";
        }
        else if (document.location.pathname.includes("/v/douga/mad")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Anime";
            presenceData.state = "└ MAD·AMV";
        }
        else if (document.location.pathname.includes("/v/douga/mmd")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Anime";
            presenceData.state = "└ MMD·3D";
        }
        else if (document.location.pathname.includes("/v/douga/voice")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Anime";
            presenceData.state = "└ Shortfilm·Handdrawing·Dubbing";
        }
        else if (document.location.pathname.includes("/v/douga/tokusatsu")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Anime";
            presenceData.state = "└ Tokusatsu";
        }
        else if (document.location.pathname.includes("/v/douga/other")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Anime";
            presenceData.state = "└ Other";
        }
        else if (document.location.pathname == "/anime/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Bangumi";
        }
        else if (document.location.pathname.includes("/v/anime/serial/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Bangumi";
            presenceData.state = "└ Serial";
        }
        else if (document.location.pathname.includes("/v/anime/finish/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Bangumi";
            presenceData.state = "└ Finished";
        }
        else if (document.location.pathname.includes("/v/anime/information")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Bangumi";
            presenceData.state = "└ Information";
        }
        else if (document.location.pathname.includes("/v/anime/offical/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Bangumi";
            presenceData.state = "└ Offical";
        }
        else if (document.location.pathname.includes("/anime/timeline/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Bangumi";
            presenceData.state = "└ TimeLine";
        }
        else if (document.location.pathname.includes("/anime/index/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Bangumi";
            presenceData.state = "└ Index";
        }
        else if (document.location.pathname == "/guochuang/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Domestic";
        }
        else if (document.location.pathname.includes("/v/guochuang/chinese/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Domestic";
            presenceData.state = "└ Chinese animation";
        }
        else if (document.location.pathname.includes("/v/guochuang/original/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Domestic";
            presenceData.state = "└ Domestic original";
        }
        else if (document.location.pathname.includes("/v/guochuang/puppetry/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Domestic";
            presenceData.state = "└ Glove puppetry";
        }
        else if (document.location.pathname.includes("/v/guochuang/motioncomic/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Domestic";
            presenceData.state = "└ Motioncomic·Radio";
        }
        else if (document.location.pathname.includes("/v/guochuang/information/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Domestic";
            presenceData.state = "└ Information";
        }
        else if (document.location.pathname.includes("/guochuang/timeline/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Domestic";
            presenceData.state = "└ TimeLine";
        }
        else if (document.location.pathname.includes("/guochuang/index/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Domestic";
            presenceData.state = "└ Index";
        }
        else if (document.location.pathname == "/v/music/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Music";
        }
        else if (document.location.pathname.includes("/v/music/original/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Music";
            presenceData.state = "└ Original";
        }
        else if (document.location.pathname.includes("/v/music/cover/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Music";
            presenceData.state = "└ Cover";
        }
        else if (document.location.pathname.includes("/v/music/vocaloid/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Music";
            presenceData.state = "└ VOCALOID·UTAU";
        }
        else if (document.location.pathname.includes("/v/music/electronic/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Music";
            presenceData.state = "└ Electronic";
        }
        else if (document.location.pathname.includes("/v/music/perform/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Music";
            presenceData.state = "└ Perform";
        }
        else if (document.location.pathname.includes("/v/music/mv/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Music";
            presenceData.state = "└ MV";
        }
        else if (document.location.pathname.includes("/v/music/live/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Music";
            presenceData.state = "└ Live";
        }
        else if (document.location.pathname.includes("/v/music/other/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Music";
            presenceData.state = "└ Other";
        }
        else if (document.location.pathname.includes("/audio/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Music";
            presenceData.state = "└ Audio";
        }
        else if (document.location.pathname == "/v/dance/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Dance";
        }
        else if (document.location.pathname.includes("/v/dance/otaku/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Dance";
            presenceData.state = "└ Otaku";
        }
        else if (document.location.pathname.includes("/v/dance/hiphop/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Dance";
            presenceData.state = "└ Hiphop";
        }
        else if (document.location.pathname.includes("/v/dance/star/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Dance";
            presenceData.state = "└ Star";
        }
        else if (document.location.pathname.includes("/v/dance/china/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Dance";
            presenceData.state = "└ China";
        }
        else if (document.location.pathname.includes("/v/dance/three_d/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Dance";
            presenceData.state = "└ Other";
        }
        else if (document.location.pathname.includes("/v/dance/demo/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Dance";
            presenceData.state = "└ Tutorial";
        }
        else if (document.location.pathname == "/v/game/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Game";
        }
        else if (document.location.pathname.includes("/v/game/stand_alone/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Dance";
            presenceData.state = "└ Single player games";
        }
        else if (document.location.pathname.includes("/v/game/esports/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Dance";
            presenceData.state = "└ Esports";
        }
        else if (document.location.pathname.includes("/v/game/mobile/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Dance";
            presenceData.state = "└ Mobile games";
        }
        else if (document.location.pathname.includes("/v/game/online/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Dance";
            presenceData.state = "└ Online games";
        }
        else if (document.location.pathname.includes("/v/game/board/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Dance";
            presenceData.state = "└ Board role-playing games";
        }
        else if (document.location.pathname.includes("/v/game/gmv/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Dance";
            presenceData.state = "└ GMV";
        }
        else if (document.location.pathname.includes("/v/game/music/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Dance";
            presenceData.state = "└ Rhythm games";
        }
        else if (document.location.pathname.includes("/v/game/mugen/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Dance";
            presenceData.state = "└ Mugen";
        }
        else if (document.location.pathname.includes("/v/game/match/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Dance";
            presenceData.state = "└ Tournaments";
        }
        else if (document.location.pathname == "/v/technology/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Tech";
        }
        else if (document.location.pathname.includes("/v/technology/fun/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Tech";
            presenceData.state = "└ Fun";
        }
        else if (document.location.pathname.includes("/v/technology/wild/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Tech";
            presenceData.state = "└ Technique";
        }
        else if (document.location.pathname.includes("/v/technology/speech_course/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Tech";
            presenceData.state = "└ Speech·Open class";
        }
        else if (document.location.pathname.includes("/v/technology/military/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Tech";
            presenceData.state = "└ Military";
        }
        else if (document.location.pathname.includes("/v/technology/mechanical/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Tech";
            presenceData.state = "└ Mechanical";
        }
        else if (document.location.pathname.includes("/v/technology/automobile/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Tech";
            presenceData.state = "└ Automobile";
        }
        else if (document.location.pathname == "/v/digital/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Digital";
        }
        else if (document.location.pathname.includes("/v/digital/mobile/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Digital";
            presenceData.state = "└ MobilePhone";
        }
        else if (document.location.pathname.includes("/v/digital/pc/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Digital";
            presenceData.state = "└ PC Building";
        }
        else if (document.location.pathname.includes("/v/digital/photography/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Digital";
            presenceData.state = "└ Photography";
        }
        else if (document.location.pathname.includes("/v/digital/intelligence_av/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Digital";
            presenceData.state = "└ Intelligence";
        }
        else if (document.location.pathname == "/v/life/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Life";
        }
        else if (document.location.pathname.includes("/v/life/funny/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Life";
            presenceData.state = "└ Funny";
        }
        else if (document.location.pathname.includes("/v/life/daily/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Life";
            presenceData.state = "└ Daily";
        }
        else if (document.location.pathname.includes("/v/life/food/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Life";
            presenceData.state = "└ Food";
        }
        else if (document.location.pathname.includes("/v/life/animal/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Life";
            presenceData.state = "└ Animal";
        }
        else if (document.location.pathname.includes("/v/life/handmake/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Life";
            presenceData.state = "└ Handmake";
        }
        else if (document.location.pathname.includes("/v/life/painting/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Life";
            presenceData.state = "└ Painting";
        }
        else if (document.location.pathname.includes("/v/life/sports/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Life";
            presenceData.state = "└ Sports";
        }
        else if (document.location.pathname.includes("/v/life/other/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Life";
            presenceData.state = "└ Other";
        }
        else if (document.location.pathname == "/v/kichiku/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Kichiku";
        }
        else if (document.location.pathname.includes("/v/kichiku/guide/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Kichiku";
            presenceData.state = "└ Kichiku Rap";
        }
        else if (document.location.pathname.includes("/v/kichiku/mad/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Kichiku";
            presenceData.state = "└ Voice MAD";
        }
        else if (document.location.pathname.includes("/v/kichiku/manual_vocaloid/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Kichiku";
            presenceData.state = "└ Manual Vocaloid";
        }
        else if (document.location.pathname.includes("/v/kichiku/course/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Kichiku";
            presenceData.state = "└ Course";
        }
        else if (document.location.pathname == "/v/fashion/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Fashion";
        }
        else if (document.location.pathname.includes("/v/fashion/makeup/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Fashion";
            presenceData.state = "└ Makeup";
        }
        else if (document.location.pathname.includes("/v/fashion/clothing/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Fashion";
            presenceData.state = "└ Clothing";
        }
        else if (document.location.pathname.includes("/v/fashion/aerobics/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Fashion";
            presenceData.state = "└ Aerobics";
        }
        else if (document.location.pathname.includes("/v/fashion/catwalk/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Fashion";
            presenceData.state = "└ Catwalk";
        }
        else if (document.location.pathname.includes("/v/fashion/trends/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Fashion";
            presenceData.state = "└ Trends";
        }
        else if (document.location.pathname == "/v/ad/ad") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing ADs";
        }
        else if (document.location.pathname == "/v/ent/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Entertainment";
        }
        else if (document.location.pathname.includes("/v/ent/variety/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Entertainment";
            presenceData.state = "└ Variety show";
        }
        else if (document.location.pathname.includes("/v/ent/star/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Entertainment";
            presenceData.state = "└ Variety Star";
        }
        else if (document.location.pathname.includes("/v/ent/korea/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Entertainment";
            presenceData.state = "└ Variety Korea";
        }
        else if (document.location.pathname == "/v/cinephile/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Film";
        }
        else if (document.location.pathname.includes("/v/cinephile/cinecism/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Film";
            presenceData.state = "└ Talk about";
        }
        else if (document.location.pathname.includes("/v/cinephile/montage/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Film";
            presenceData.state = "└ Montage";
        }
        else if (document.location.pathname.includes("/v/cinephile/shortfilm/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Film";
            presenceData.state = "└ Shortfilm";
        }
        else if (document.location.pathname.includes("/v/cinephile/trailer_info/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Film";
            presenceData.state = "└ Information";
        }
        else if (document.location.pathname == "/cinema/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing cinema";
        }
        else if (document.location.pathname == "/documentary/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Documentary";
        }
        else if (document.location.pathname.includes("/v/documentary/history/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Documentary";
            presenceData.state = "└ History";
        }
        else if (document.location.pathname.includes("/v/documentary/science/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Documentary";
            presenceData.state = "└ Science·Exploration·Nature";
        }
        else if (document.location.pathname.includes("/v/documentary/military/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Documentary";
            presenceData.state = "└ Military";
        }
        else if (document.location.pathname.includes("/v/documentary/travel/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Documentary";
            presenceData.state = "└ Travel";
        }
        else if (document.location.pathname.includes("/documentary/index/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Documentary";
            presenceData.state = "└ Index";
        }
        else if (document.location.pathname == "/movie/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Movie";
        }
        else if (document.location.pathname.includes("/v/movie/chinese/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Movie";
            presenceData.state = "└ Chinese";
        }
        else if (document.location.pathname.includes("/v/movie/west/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Movie";
            presenceData.state = "└ European&American";
        }
        else if (document.location.pathname.includes("/v/movie/japan/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Movie";
            presenceData.state = "└ Japanese";
        }
        else if (document.location.pathname.includes("/v/movie/movie/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Movie";
            presenceData.state = "└ Other ";
        }
        else if (document.location.pathname.includes("/movie/index/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Movie";
            presenceData.state = "└ Index";
        }
        else if (document.location.pathname == "/tv/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing TV series";
        }
        else if (document.location.pathname.includes("/v/tv/mainland/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing TV series";
            presenceData.state = "└ China domestic";
        }
        else if (document.location.pathname.includes("/v/tv/overseas/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing TV series";
            presenceData.state = "└ China overseas";
        }
        else if (document.location.pathname.includes("/tv/index/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing TV series";
            presenceData.state = "└ index";
        }
        else if (document.location.pathname.includes("/read/")) {
            user = document.querySelector("body > div.page-container > div.up-info-holder > div > div.up-info-block > div > div.row > a");
            title = document.querySelector("body > div.page-container > div.head-container > div.title-container > h1");
            if (user !== null && title !== null) {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Reading column: ";
                presenceData.smallImageKey = "reading";
                presenceData.state = title.innerText;
            }
            else {
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing for column";
            }
        }
    }
    else if (document.location.hostname == "t.bilibili.com") {
        user = document.querySelector("#app > div > div.detail-content > div > div > div.main-content > div.user-name.fs-16.ls-0.d-i-block.big-vip > a");
        if (user !== null) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Reading " + user.innerText + "'s dynamic";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/topic")) {
            title = document.querySelector("#app > div.page-container.p-rel > div.top-header.p-rel > div.tag-title-content.fs-28.ls-0 > div.tag-title.d-i-block");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing dynamic";
            presenceData.state = "Tag: " + title.innerText;
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing for dynamic";
        }
    }
    else if (document.location.hostname == "vc.bilibili.com") {
        user = document.querySelector("#app > div > div.left-section.f-left > div.uploader-box.module-card.border-box > div > div > div.user > a");
        video = document.querySelector("#app > div > div.left-section.f-left > div.player-area.module-card > div.player-box > div > div > div.bilibili-link-player-video-component > div > video");
        videoDuration = video.duration;
        videoCurrentTime = video.currentTime;
        paused = video.paused;
        var timestamps = getTimestamps(Math.floor(videoCurrentTime), Math.floor(videoDuration));
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
        }
        else {
            presenceData.details = "Browsing for shortfilm";
        }
    }
    else if (document.location.hostname == "space.bilibili.com") {
        user = document.querySelector("#h-name");
        UID = document.querySelector("#page-index > div.col-2 > div.section.user.private > div.info > div > div > div > div.item.uid > span.text");
        if (user !== null && UID !== null) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing user space";
            presenceData.state = user.innerText + " | UID: " + UID.innerText;
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing Someone's space";
        }
    }
    else if (document.location.hostname == "account.bilibili.com") {
        if (document.location.pathname.includes("/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing account setting";
        }
    }
    else if (document.location.hostname == "member.bilibili.com") {
        if (document.location.pathname.includes("/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing 创作中心";
        }
    }
    else if (document.location.hostname == "show.bilibili.com") {
        title = document.querySelector("#app > div.buyticket > div.whole-detail-info-wrapper > div.detail-info-wrapper > div.product-info-name");
        if (title !== null) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing 会员购";
            presenceData.state = title.innerText;
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing 会员购";
        }
    }
    else if (document.location.hostname == "manga.bilibili.com") {
        page = document.querySelector("body > div.reader-layout.w-100.h-100.p-absolute.p-zero > div > div.info-hud.none-select.info-hud.p-absolute.info-layer > div.hinter-image-container.single > span");
        title = document.querySelector("body > div.reader-layout.w-100.h-100.p-absolute.p-zero > div > div.manga-reader-ui > div.navbar-container.w-100.p-absolute.p-zero.a-move-in-bottom > nav > div > div.read-nav > a:nth-child(3)");
        if (title !== null) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = title.innerText;
            presenceData.state = "Reading P." + page.innerText;
            presenceData.smallImageKey = "reading";
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing Manga";
            presenceData.smallImageKey = "reading";
        }
    }
    else if (document.location.hostname == "www.biligame.com") {
        title = document.querySelector("body > div.bui-gc > div.header-bar.one-row > div.right-panel > div > div > h2 > span:nth-child(1)");
        if (title !== null) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing Game";
            presenceData.state = title.innerText;
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing Game";
        }
    }
    else if (document.location.hostname == "game.bilibili.com") {
        if (document.location.pathname.includes("/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing Game";
        }
    }
    else if (document.location.hostname == "live.bilibili.com") {
        user = document.querySelector("#head-info-vm > div > div > div.room-info-down-row > a.room-owner-username.live-skin-normal-a-text.dp-i-block.v-middle");
        title = document.querySelector("#head-info-vm > div > div > div.room-info-upper-row.p-relative > div.normal-mode > div:nth-child(1) > h1 > span.title-length-limit.live-skin-main-text.v-middle.dp-i-block.small-title");
        if (user !== null && UID !== null) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Watching " + user.innerText + "'s streaming";
            presenceData.state = title.innerText;
            presenceData.smallImageKey = "live";
        }
        else if (document.location.pathname.includes("/p/")) {
            title = document.querySelector("body > div.app-ctnr > div.wrapper > div > header > h2");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing for live category";
            presenceData.state = "└ " + title.innerText;
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing for live channels";
        }
    }
    else if (document.location.hostname == "search.bilibili.com") {
        if (document.location.pathname.includes("/")) {
            var searchinput = document.querySelector("head > title");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Bilibili Search";
            presenceData.state = searchinput.innerHTML.replace(" - 搜索结果 - 哔哩哔哩弹幕视频网 - ( ゜- ゜)つロ  乾杯~  - bilibili", "");
        }
    }
    else if (document.location.hostname == "message.bilibili.com") {
        if (document.URL.includes("/#/reply")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing message";
            presenceData.state = "Reply";
        }
        else if (document.URL.includes("/#/at")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing message";
            presenceData.state = "At";
        }
        else if (document.URL.includes("/#/love")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing message";
            presenceData.state = "Love";
        }
        else if (document.URL.includes("/#/system")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing message";
            presenceData.state = "System message";
        }
        else if (document.URL.includes("/#/whisper")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing message";
            presenceData.state = "Private message";
        }
        else if (document.URL.includes("/#/archive")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing message";
            presenceData.state = "PM archive";
        }
        else if (document.URL.includes("/#/config")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing message";
            presenceData.state = "Message setting";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLFVBQWUsQ0FBQztBQUNwQixJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksTUFBVyxDQUFDO0FBQ2hCLElBQUksR0FBUSxDQUFDO0FBQ2IsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLFNBQWMsQ0FBQztBQUNuQixJQUFJLFdBQW9CLEVBQ3ZCLFdBQWdCLEVBQ2hCLFFBQWEsRUFDYixNQUFXLEVBQ1gsUUFBYSxFQUNiLFlBQWlCLENBQUM7QUFFbkIsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2xDLDREQUE0RCxDQUM1RCxDQUFDO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUU7SUFDaEMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFFOUQsSUFBSSxRQUFRLEVBQUU7UUFDYixXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7UUFDNUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFD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