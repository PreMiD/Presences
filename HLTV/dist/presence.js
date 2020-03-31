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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxJQUFTLENBQUM7QUFDZCxJQUFJLEtBQVUsQ0FBQztBQUNmLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksTUFBVyxDQUFDO0FBRWhCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxjQUFjLEVBQUU7UUFDaEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakQsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztZQUM1QyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDNUIseUVBQXlFLENBQzFFLENBQUM7WUFDRixZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDckMsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7U0FDeEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFB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