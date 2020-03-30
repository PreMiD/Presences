var presence = new Presence({
    clientId: "642393312392904705"
}), presenceData = {
    largeImageKey: "logo"
}, customData = false;
presence.on("UpdateData", async () => {
    customData = false;
    if (document.location.pathname == "/home") {
        presenceData.details = "Viewing the homepage";
    }
    else if (document.location.pathname.startsWith("/beatmaps/rank_request")) {
        presenceData.details = "Requesting a beatmaps";
    }
    else if (document.location.pathname.startsWith("/beatmaps")) {
        var title = document.querySelector(".map-title"), act = document.querySelector(".map-artist");
        if (title != null && act != null) {
            customData = true;
            var beatmapData = {
                details: "Looking at the beatmap:",
                state: act.innerText +
                    " - " +
                    title.innerText,
                largeImageKey: "logo"
            };
            presence.setActivity(beatmapData);
        }
        else {
            presenceData.details = "Searching for new beatmaps";
        }
    }
    else if (document.location.pathname.startsWith("/s/")) {
        var title = document.querySelector(".map-title"), act = document.querySelector(".map-artist");
        if (title != null && act != null) {
            customData = true;
            var beatmapData = {
                details: "Looking at the beatmap:",
                state: act.innerText +
                    " - " +
                    title.innerText,
                largeImageKey: "logo"
            };
            presence.setActivity(beatmapData);
        }
        else {
            presenceData.details = "Searching for new beatmaps";
        }
    }
    else if (document.location.pathname.startsWith("/b/")) {
        var title = document.querySelector(".map-title"), act = document.querySelector(".map-artist");
        if (title != null && act != null) {
            customData = true;
            var beatmapData = {
                details: "Looking at the beatmap:",
                state: act.innerText +
                    " - " +
                    title.innerText,
                largeImageKey: "logo"
            };
            presence.setActivity(beatmapData);
        }
        else {
            presenceData.details = "Searching for new beatmaps";
        }
    }
    else if (document.location.pathname.startsWith("/leaderboard/osu")) {
        presenceData.details = "Browsing rankings";
        presenceData.state = "osu!";
    }
    else if (document.location.pathname.startsWith("/leaderboard/taiko")) {
        presenceData.details = "Browsing rankings";
        presenceData.state = "osu!taiko";
    }
    else if (document.location.pathname.startsWith("/leaderboard/ctb")) {
        presenceData.details = "Browsing rankings";
        presenceData.state = "osu!catch";
    }
    else if (document.location.pathname.startsWith("/leaderboard/mania")) {
        presenceData.details = "Browsing rankings";
        presenceData.state = "osu!mania";
    }
    else if (document.location.pathname.startsWith("/community/clans")) {
        presenceData.details = "Browsing clans";
    }
    else if (document.location.pathname.startsWith("/clan/")) {
        presenceData.details = "Browsing clans";
        presenceData.state =
            document.querySelector(".clan-abbr").innerHTML +
                document.querySelector(".clan-title").innerHTML +
                "| " +
                document.querySelector("div.clan-text-info-block > b")
                    .innerHTML;
    }
    else if (document.location.pathname.startsWith("/community/plays")) {
        presenceData.details = "Browsing Top plays";
    }
    else if (document.location.pathname.startsWith("/community/livestreams")) {
        presenceData.details = "Browsing livestreams";
    }
    else if (document.location.pathname.startsWith("/community/matches")) {
        presenceData.details = "Browsing Tournaments";
    }
    else if (document.location.pathname.startsWith("/about")) {
        presenceData.details = "Browsing About";
    }
    else if (document.location.pathname.startsWith("/docs/")) {
        var doc = document.querySelector(".ban-stroke1"), title = document.querySelector(".ban-stroke2");
        if (doc != null && title != null) {
            customData = true;
            var beatmapData = {
                details: "Browsing " + doc.innerText,
                state: title.innerText,
                largeImageKey: "logo"
            };
            presence.setActivity(beatmapData);
        }
        else {
            presenceData.details = "Browsing Documentation";
        }
    }
    else if (document.location.pathname.startsWith("/docs")) {
    }
    else if (document.location.pathname.startsWith("/user/notifications")) {
        presenceData.details = "Browsing Notifications";
    }
    else if (document.location.pathname.startsWith("/support")) {
        presenceData.details = "Support Gatari!";
    }
    else if (document.location.pathname.startsWith("/settings/general")) {
        presenceData.details = "Browsing account setting";
        presenceData.state = "General";
    }
    else if (document.location.pathname.startsWith("/settings/userpage")) {
        presenceData.details = "Browsing account setting";
        presenceData.state = "Userpage";
    }
    else if (document.location.pathname.startsWith("/settings/appearance")) {
        presenceData.details = "Browsing account setting";
        presenceData.state = "Appearance";
    }
    else if (document.location.pathname.startsWith("/settings/password")) {
        presenceData.details = "Browsing account setting";
        presenceData.state = "Password";
    }
    else if (document.location.pathname.startsWith("/settings/accounts")) {
        presenceData.details = "Browsing account setting";
        presenceData.state = "Accounts";
    }
    else if (document.location.pathname.startsWith("/user/register")) {
        presenceData.details = "Registering account";
    }
    else if (document.location.pathname.startsWith("/recover")) {
        presenceData.details = "Recovering account";
    }
    else if (document.location.pathname.startsWith("/friends")) {
        presenceData.details = "Browsing friend list";
    }
    else if (document.location.pathname.startsWith("/team")) {
        presenceData.details = "Look at Garati Team";
    }
    else if (document.location.pathname.startsWith("/u")) {
        var name = document.querySelector(".user-name")
            .innerText;
        customData = true;
        var profileData = {
            details: "Looking at " + name + "'s Profile",
            state: "Performance: " +
                document.querySelector("#chart1 > div > span")
                    .innerText,
            largeImageKey: "logo"
        };
        presence.setActivity(profileData);
    }
    if (!customData) {
        presence.setActivity(presenceData);
    }
});
if (document.location.hostname == "sig.gatari.pw") {
    presenceData.details = "Ready to generator a Signature";
}
presence.on("iFrameData", function (data) {
    console.log(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzVCLGFBQWEsRUFBRSxNQUFNO0NBQ3JCLEVBQ0QsVUFBVSxHQUFZLEtBQUssQ0FBQztBQUU3QixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBRW5CLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksT0FBTyxFQUFFO1FBQzFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7S0FDOUM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO1FBQzNFLFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7S0FDL0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUM5RCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUMvQyxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU3QyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNqQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBRWxCLElBQUksV0FBVyxHQUFpQjtnQkFDL0IsT0FBTyxFQUFFLHlCQUF5QjtnQkFDbEMsS0FBSyxFQUNILEdBQW1CLENBQUMsU0FBUztvQkFDOUIsS0FBSztvQkFDSixLQUFxQixDQUFDLFNBQVM7Z0JBQ2pDLGFBQWEsRUFBRSxNQUFNO2FBQ3JCLENBQUM7WUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2xDO2FBQU07WUFDTixZQUFZLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO1NBQ3BEO0tBQ0Q7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN4RCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUMvQyxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU3QyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNqQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBRWxCLElBQUksV0FBVyxHQUFpQjtnQkFDL0IsT0FBTyxFQUFFLHlCQUF5QjtnQkFDbEMsS0FBSyxFQUNILEdBQW1CLENBQUMsU0FBUztvQkFDOUIsS0FBSztvQkFDSixLQUFxQixDQUFDLFNBQVM7Z0JBQ2pDLGFBQWEsRUFBRSxNQUFNO2FBQ3JCLENBQUM7WUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2xDO2FBQU07WUFDTixZQUFZLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO1NBQ3BEO0tBQ0Q7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN4RCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUMvQyxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU3QyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNqQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBRWxCLElBQUksV0FBVyxHQUFpQjtnQkFDL0IsT0FBTyxFQUFFLHlCQUF5QjtnQkFDbEMsS0FBSyxFQUNILEdBQW1CLENBQUMsU0FBUztvQkFDOUIsS0FBSztvQkFDSixLQUFxQixDQUFDLFNBQVM7Z0JBQ2pDLGFBQWEsRUFBRSxNQUFNO2FBQ3JCLENBQUM7WUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2xDO2FBQU07WUFDTixZQUFZLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO1NBQ3BEO0tBQ0Q7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQ3JFLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDM0MsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7S0FDNUI7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO1FBQ3ZFLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDM0MsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7S0FDakM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQ3JFLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDM0MsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7S0FDakM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO1FBQ3ZFLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDM0MsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7S0FDakM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQ3JFLFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7S0FDeEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUMzRCxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO1FBQ3hDLFlBQVksQ0FBQyxLQUFLO1lBQ2hCLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFpQixDQUFDLFNBQVM7Z0JBQzlELFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFpQixDQUFDLFNBQVM7Z0JBQ2hFLElBQUk7Z0JBQ0gsUUFBUSxDQUFDLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBaUI7cUJBQ3JFLFNBQVMsQ0FBQztLQUNiO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsRUFBRTtRQUNyRSxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO0tBQzVDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsRUFBRTtRQUMzRSxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO0tBQzlDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsRUFBRTtRQUN2RSxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO0tBQzlDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDM0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztLQUN4QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzNELElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQy9DLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWhELElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2pDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFbEIsSUFBSSxXQUFXLEdBQWlCO2dCQUMvQixPQUFPLEVBQUUsV0FBVyxHQUFJLEdBQW1CLENBQUMsU0FBUztnQkFDckQsS0FBSyxFQUFHLEtBQXFCLENBQUMsU0FBUztnQkFDdkMsYUFBYSxFQUFFLE1BQU07YUFDckIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbEM7YUFBTTtZQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7U0FDaEQ7S0FDRDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0tBQzFEO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFBRTtRQUN4RSxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO0tBQ2hEO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDN0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztLQUN6QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7UUFDdEUsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztRQUNsRCxZQUFZLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztLQUMvQjtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7UUFDdkUsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztRQUNsRCxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztLQUNoQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7UUFDekUsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztRQUNsRCxZQUFZLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztLQUNsQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7UUFDdkUsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztRQUNsRCxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztLQUNoQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7UUFDdkUsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztRQUNsRCxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztLQUNoQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDbkUsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztLQUM3QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzdELFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7S0FDNUM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM3RCxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO0tBQzlDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDMUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztLQUM3QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZELElBQUksSUFBSSxHQUFZLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFpQjthQUN0RSxTQUFTLENBQUM7UUFDWixVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksV0FBVyxHQUFpQjtZQUMvQixPQUFPLEVBQUUsYUFBYSxHQUFHLElBQUksR0FBRyxZQUFZO1lBQzVDLEtBQUssRUFDSixlQUFlO2dCQUNkLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQWlCO3FCQUM3RCxTQUFTO1lBQ1osYUFBYSxFQUFFLE1BQU07U0FDckIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDbEM7SUFFRCxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2hCLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDbkM7QUFDRixDQUFDLENBQUMsQ0FBQztBQUVILElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZUFBZSxFQUFFO0lBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0NBQWdDLENBQUM7Q0FDeEQ7QUFFRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFTLElBQUk7SUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQixDQUFDLENBQUMsQ0FBQyJ9