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
    else if (document.location.hostname == ("t.bilibili.com")) {
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
    else if (document.location.hostname == ("vc.bilibili.com")) {
        user = document.querySelector("#app > div > div.left-section.f-left > div.uploader-box.module-card.border-box > div > div > div.user > a");
        if (user !== null) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Watching " + user.innerText + "'s shortfilm";
            presenceData.smallImageKey = "vcall";
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing for shortfilm";
        }
    }
    else if (document.location.hostname == ("space.bilibili.com")) {
        user = document.querySelector("#h-name");
        UID = document.querySelector("#page-index > div.col-2 > div.section.user.private > div.info > div > div > div > div.item.uid > span.text");
        if (user !== null && UID !== null) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing user space";
            presenceData.state = user.innerText + " | UID: " + UID.innerText;
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing for dynamic";
        }
    }
    else if (document.location.hostname == ("live.bilibili.com")) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUM7QUFFaEQsSUFBSSxJQUFVLENBQUM7QUFDZixJQUFJLEtBQVcsQ0FBQztBQUNoQixJQUFJLE9BQWEsQ0FBQztBQUNsQixJQUFJLE1BQVksQ0FBQztBQUNqQixJQUFJLEdBQVMsQ0FBRTtBQUVmLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUduQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLElBQUk7S0FDcEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksa0JBQWtCLEVBQUU7UUFDcEQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7WUFDckMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7WUFDckMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUhBQWlILENBQUMsQ0FBQztTQUVsSjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3pELElBQUksS0FBd0IsRUFB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