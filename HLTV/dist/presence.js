var presence = new Presence({
    clientId: "634032819915456552"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var search;
presence.on("UpdateData", async () => {
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
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksTUFBVyxDQUFDO0FBRWhCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksWUFBWSxHQUFpQjtRQUNoQyxhQUFhLEVBQUUsTUFBTTtLQUNyQixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxjQUFjLEVBQUU7UUFDakQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztZQUM1QyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDN0IseUVBQXlFLENBQ3pFLENBQUM7WUFDRixZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDckMsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7U0FDdkM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFB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