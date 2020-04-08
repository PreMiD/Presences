var presence = new Presence({
    clientId: "634032819915456552"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var search;
presence.on("UpdateData", async () => {
    const presenceData = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLENBQUM7QUFDZixJQUFJLE1BQVcsQ0FBQztBQUVoQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksY0FBYyxFQUFFO1FBQ2hELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pELFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7WUFDNUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzVCLHlFQUF5RSxDQUMxRSxDQUFDO1lBQ0YsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQ3JDLFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1NBQ3hDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDM0QsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzVCLG1IQUFtSCxDQUNwSCxDQUFDO1lBQ0YsWUFBWSxDQUFDLE9BQU8sR0FBRyxr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