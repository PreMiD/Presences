var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "634032819915456552",
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
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "hltv"
    };
    if (document.location.hostname == "www.hltv.org") {
        presenceData.startTimestamp = browsingStamp;
        if (document.location.pathname.includes("/news/")) {
            presenceData.details = "Reading news post:";
            title = document.querySelector("body > div.bgPadding > div > div.colCon > div.contentCol > article > h1");
            presenceData.state = title.innerText;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/profile/")) {
            title = document.querySelector("body > div.bgPadding > div > div.colCon > div.contentCol > div > div.top-info > div > div.info.col > div.headline");
            presenceData.details = "Viewing profile:";
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname.includes("/forums/")) {
            if (document.location.pathname.includes("/threads/")) {
                title = document.querySelector("body > div.bgPadding > div > div.colCon > div.contentCol > div.forumthread > div.standard-box > div.forum-topbar > div.topic");
                presenceData.details = "Reading forum thread:";
                presenceData.state = title.innerText;
                presenceData.smallImageKey = "reading";
            }
            else {
                title = document.querySelector("body > div.bgPadding > div > div.colCon > div.contentCol > div > span:nth-child(2)");
                presenceData.details = "Viewing forums category:";
                presenceData.state = title.innerText;
            }
        }
        else if (document.location.pathname.includes("/forums")) {
            presenceData.details = "Browsing the forums";
        }
        else if (document.location.pathname.includes("/matches/")) {
            presenceData.details = "Viewing match:";
            title = document.querySelector("head > title");
            presenceData.state = title.innerText.replace(" | HLTV.org", "");
        }
        else if (document.location.pathname.includes("/matches")) {
            presenceData.details = "Viewing the recent matches";
        }
        else if (document.location.pathname.includes("/results")) {
            presenceData.details = "Viewing the results";
        }
        else if (document.location.pathname.includes("/events/")) {
            presenceData.details = "Viewing event:";
            title = document.querySelector("body > div.bgPadding > div > div.colCon > div.contentCol > div > div.event-header-component.event-holder.header > a > div > div");
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname.includes("/events")) {
            presenceData.details = "Viewing list of events";
        }
        else if (document.location.pathname.includes("/player/")) {
            title = document.querySelector("body > div.bgPadding > div > div.colCon > div.contentCol > div > div.standard-box.profileTopBox.clearfix.flex > div.profile-info-container > div.profile-player-info-container > div.profile-player-info > h1");
            presenceData.details = "Viewing player:";
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname.includes("/team/")) {
            title = document.querySelector("body > div.bgPadding > div > div.colCon > div.contentCol > div > div.standard-box.profileTopBox.clearfix > div.flex > div.profile-team-container.text-ellipsis > div.profile-team-info > div.profile-team-name.text-ellipsis");
            presenceData.details = "Viewing team:";
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname.includes("/stats/")) {
            presenceData.details = "Viewing stats of:";
            title = document.querySelector("body > div.bgPadding > div > div.colCon > div.contentCol > div > div.playerSummaryStatBox > div.summaryBreakdownContainer > div.summaryShortInfo > h1");
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname.includes("/stats")) {
            presenceData.details = "Viewing the stats";
        }
        else if (document.location.pathname.includes("/gallery/")) {
            presenceData.details = "Viewing gallery:";
            title = document.querySelector("body > div.bgPadding > div > div.colCon > div.contentCol > div > div.event-header-component.event-holder.header > a > div > div");
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname.includes("/galleries")) {
            presenceData.details = "Browsing galleries";
        }
        else if (document.location.pathname.includes("/betting")) {
            presenceData.details = "Viewing betting";
        }
        else if (document.location.pathname.includes("/live")) {
            title = document.querySelector("#LiveApplication > div > div.stats-container.gtSmartphone-only > div > div.team1-stats > div.team.text-ellipsis > span");
            user = document.querySelector("#LiveApplication > div > div.stats-container.gtSmartphone-only > div > div.team2-stats > div.team.text-ellipsis > span");
            presenceData.details = "Watching live match:";
            presenceData.state = title.innerText + " vs. " + user.innerText;
            presenceData.smallImageKey = "live";
        }
        else if (document.location.pathname.includes("/fantasy/")) {
            presenceData.details = "Viewing fantasy of:";
            title = document.querySelector("#fantasy > div > div.fantasy-content > div > div.eventBarFragment > div.countdownContainer > div > div.textBox > h1");
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname.includes("/fantasy")) {
            presenceData.details = "Browsing fantasy";
        }
        else if (document.location.pathname.includes("/search")) {
            search = document.querySelector("body > div.bgPadding > div > div.colCon > div.contentCol > div > div:nth-child(2) > div > form > input.searchInput");
            presenceData.details = "Searching for:";
            presenceData.state = search.value;
            presenceData.smallImageKey = "search";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxFQUNGLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzVCLElBQUksRUFBRSwyQkFBMkI7SUFDakMsS0FBSyxFQUFFLDBCQUEwQjtDQUNsQyxDQUFDLENBQUM7QUFFSCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQztBQUVoRCxJQUFJLElBQVUsQ0FBQztBQUNmLElBQUksS0FBVyxDQUFDO0FBQ2hCLElBQUksT0FBYSxDQUFDO0FBQ2xCLElBQUksTUFBWSxDQUFDO0FBRWpCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUduQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksY0FBYyxFQUFFO1FBQ2hELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pELFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7WUFDNUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMseUVBQXlFLENBQUMsQ0FBQztZQUMxRyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDckMsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7U0FDeEM7YUFBTSxJQUFJ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