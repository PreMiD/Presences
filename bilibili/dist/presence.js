var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "639591760791732224",
    mediaKeys: false
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var search;
var UID;
var page;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
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
            videoDuration = video.duration;
            videoCurrentTime = video.currentTime;
            paused = video.paused;
            var timestamps = getTimestamps(Math.floor(videoCurrentTime), Math.floor(videoDuration));
            presenceData.smallImageKey = paused ? "pause" : "play";
            presenceData.smallImageText = paused ? (yield strings).pause : (yield strings).play;
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            if (paused) {
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            }
            title = document.querySelector("#viewbox_report > h1");
            user = document.querySelector("#v_upinfo > div.u-info > div > a.username");
            if (user == null) {
                user = document.querySelector("#v_upinfo > div.info > div.user.clearfix > a");
            }
            presenceData.details = title.innerText;
            presenceData.state = "By user: " + user.innerText;
        }
        else if (document.location.pathname == ("/v/douga/")) {
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
        else if (document.location.pathname == ("/anime/")) {
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
        else if (document.location.pathname == ("/guochuang/")) {
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
        else if (document.location.pathname == ("/v/music/")) {
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
        else if (document.location.pathname == ("/v/dance/")) {
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
        else if (document.location.pathname == ("/v/game/")) {
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
        else if (document.location.pathname == ("/v/technology/")) {
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
        else if (document.location.pathname == ("/v/digital/")) {
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
        else if (document.location.pathname == ("/v/life/")) {
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
        else if (document.location.pathname == ("/v/kichiku/")) {
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
        else if (document.location.pathname == ("/v/fashion/")) {
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
        else if (document.location.pathname == ("/v/ad/ad")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing ADs";
        }
        else if (document.location.pathname == ("/v/ent/")) {
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
        else if (document.location.pathname == ("/v/cinephile/")) {
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
        else if (document.location.pathname == ("/cinema/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing cinema";
        }
        else if (document.location.pathname == ("/documentary/")) {
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
        else if (document.location.pathname == ("/movie/")) {
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
        else if (document.location.pathname == ("/tv/")) {
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
    }
    else if (document.location.hostname == "t.bilibili.com") {
        user = document.querySelector("#app > div > div.detail-content > div > div > div.main-content > div.user-name.fs-16.ls-0.d-i-block.big-vip > a");
        if (user !== null) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Reading " + user.innerText + "'s dynamic";
            presenceData.smallImageKey = "reading";
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing for dynamic";
        }
        var timestamps = getTimestamps(Math.floor(videoCurrentTime), Math.floor(videoDuration));
        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = paused ? (yield strings).pause : (yield strings).play;
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
    else if (document.location.hostname == "member.bilibili.com") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing 创作中心";
        }
        else {
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
    else if (document.location.hostname == "biligame.com" || "game.bilibili.com") {
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
    else if (document.location.hostname == "live.bilibili.com") {
        user = document.querySelector("#head-info-vm > div > div > div.room-info-down-row > a.room-owner-username.live-skin-normal-a-text.dp-i-block.v-middle");
        title = document.querySelector("#head-info-vm > div > div > div.room-info-upper-row.p-relative > div.normal-mode > div:nth-child(1) > h1 > span.title-length-limit.live-skin-main-text.v-middle.dp-i-block.small-title");
        if (user !== null && UID !== null) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Watching " + user.innerText + "'s streaming";
            presenceData.state = title.innerText;
            presenceData.smallImageKey = "live";
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing for live channels";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
}));
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUM7QUFFaEQsSUFBSSxJQUFVLENBQUM7QUFDZixJQUFJLEtBQVcsQ0FBQztBQUNoQixJQUFJLE9BQWEsQ0FBQztBQUNsQixJQUFJLE1BQVksQ0FBQztBQUNqQixJQUFJLEdBQVMsQ0FBQztBQUNkLElBQUksSUFBVSxDQUFDO0FBRWYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBR25DLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsSUFBSTtLQUNwQixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxrQkFBa0IsRUFBRTtRQUNwRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtZQUNyQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztZQUNyQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpSEFBaUgsQ0FBQyxDQUFDO1NBRWxKO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7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