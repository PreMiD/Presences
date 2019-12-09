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
    clientId: "642393312392904705",
    mediaKeys: false
}), presenceData = {
    largeImageKey: "logo"
}, customData = false;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    customData = false;
    if (document.location.pathname == ("/home")) {
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
                    " - " + title.innerText,
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
                    " - " + title.innerText,
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
                    " - " + title.innerText,
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
        presenceData.state = document.querySelector(".clan-abbr").innerHTML +
            document.querySelector(".clan-title").innerHTML + "| " +
            document.querySelector("div.clan-text-info-block > b").innerHTML;
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
    else if (document.location.pathname.startsWith("/friends")) {
        presenceData.details = "Browsing friend list";
    }
    else if (document.location.pathname.startsWith("/team")) {
        presenceData.details = "Look at Garati Team";
    }
    else if (document.location.pathname.startsWith("/u")) {
        var name = document.querySelector(".user-name").innerText;
        customData = true;
        var profileData = {
            details: "Looking at " + name + "'s Profile",
            state: "Performance: " + document.querySelector("#chart1 > div > span").innerText,
            largeImageKey: "logo"
        };
        presence.setActivity(profileData);
    }
    if (!customData) {
        presence.setActivity(presenceData);
    }
}));
if (document.location.hostname == "sig.gatari.pw") {
    presenceData.details = "Ready to generator a Signature";
}
presence.on('iFrameData', function (data) {
    console.log(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsRUFBRSxZQUFZLEdBQWlCO0lBQy9CLGFBQWEsRUFBRSxNQUFNO0NBQ3RCLEVBQUUsVUFBVSxHQUFXLEtBQUssQ0FBQztBQUU5QixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDbkMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUVuQixJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFFeEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztLQUVqRDtTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7UUFFeEUsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztLQUUvQztTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBRTVELElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQzVDLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBRTNDLElBQUcsS0FBSyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQy9CLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFbEIsSUFBSSxXQUFXLEdBQWlCO2dCQUM5QixPQUFPLEVBQUUseUJBQXlCO2dCQUNsQyxLQUFLLEVBQUcsR0FBbUIsQ0FBQyxTQUFTO29CQUNyQyxLQUFLLEdBQUksS0FBcUIsQ0FBQyxTQUFTO2dCQUN4QyxhQUFhLEVBQUUsTUFBTTthQUN6QixDQUFDO1lBQ0gsUUFBUSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNuQzthQUFJO1lBQ0gsWUFBWSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQTtTQUNwRDtLQUVMO1NBQU0sSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFFbkQsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsRUFDNUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUE7UUFFM0MsSUFBRyxLQUFLLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDL0IsVUFBVSxHQUFHLElBQUksQ0FBQztZQUVsQixJQUFJLFdBQVcsR0FBaUI7Z0JBQzlCLE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLEtBQUssRUFBRyxHQUFtQixDQUFDLFNBQVM7b0JBQ3JDLEtBQUssR0FBSSxLQUFxQixDQUFDLFNBQVM7Z0JBQ3hDLGFBQWEsRUFBRSxNQUFNO2FBQ3pCLENBQUM7WUFDSCxRQUFRLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ25DO2FBQUk7WUFDSCxZQUFZLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFBO1NBQ3BEO0tBRUY7U0FBTSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUV0RCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUM1QyxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUUzQyxJQUFHLEtBQUssSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUMvQixVQUFVLEdBQUcsSUFBSSxDQUFDO1lBRWxCLElBQUksV0FBVyxHQUFpQjtnQkFDOUIsT0FBTyxFQUFFLHlCQUF5QjtnQkFDbEMsS0FBSyxFQUFHLEdBQW1CLENBQUMsU0FBUztvQkFDckMsS0FBSyxHQUFJLEtBQXFCLENBQUMsU0FBUztnQkFDeEMsYUFBYSxFQUFFLE1BQU07YUFDekIsQ0FBQztZQUNILFFBQVEsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbkM7YUFBSTtZQUNILFlBQVksQ0FBQyxPQUFPLEdBQUcsNEJBQTRCLENBQUE7U0FDcEQ7S0FFRjtTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFFbkUsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztRQUMzQyxZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztLQUU3QjtTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7UUFFckUsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztRQUMzQyxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztLQUVsQztTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFFbkUsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztRQUMzQyxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztLQUVsQztTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7UUFFckUsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztRQUMzQyxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztLQUV0QztTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFFbkUsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztLQUV6QztTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBRXpELFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7UUFDeEMsWUFBWSxDQUFDLEtBQUssR0FBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBaUIsQ0FBQyxTQUFTO1lBQzlELFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFpQixDQUFDLFNBQVMsR0FBRyxJQUFJO1lBQ3RFLFFBQVEsQ0FBQyxhQUFhLENBQUMsOEJBQThCLENBQWlCLENBQUMsU0FBUyxDQUFDO0tBRXhHO1NBQU0sSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsRUFBRTtRQUVuRSxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO0tBRTdDO1NBQU0sSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsRUFBRTtRQUV6RSxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO0tBRS9DO1NBQU8sSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsRUFBRTtRQUV0RSxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO0tBRS9DO1NBQU0sSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFFckQsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztLQUV6QztTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBRXpELElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQzVDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBRTlDLElBQUcsR0FBRyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQy9CLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFbEIsSUFBSSxXQUFXLEdBQWlCO2dCQUM5QixPQUFPLEVBQUUsV0FBVyxHQUFJLEdBQW1CLENBQUMsU0FBUztnQkFDckQsS0FBSyxFQUFHLEtBQXFCLENBQUMsU0FBUztnQkFDdkMsYUFBYSxFQUFFLE1BQU07YUFDekIsQ0FBQztZQUNILFFBQVEsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbkM7YUFBSTtZQUNILFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUE7U0FDaEQ7S0FFRjtTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0tBRzNEO1NBQU0sSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFBRTtRQUVwRSxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO0tBRW5EO1NBQU0sSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFFM0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztLQUUxQztTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7UUFFcEUsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztRQUNsRCxZQUFZLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztLQUVoQztTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7UUFFckUsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztRQUNsRCxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztLQUVqQztTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7UUFFdkUsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztRQUNsRCxZQUFZLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztLQUVuQztTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7UUFFckUsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztRQUNsRCxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztLQUVqQztTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7UUFFckUsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztRQUNsRCxZQUFZLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztLQUVqQztTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBRTNELFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7S0FFL0M7U0FBTSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUV4RCxZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO0tBRTlDO1NBQU8sSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFFdEQsSUFBSSxJQUFJLEdBQVcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQWlCLENBQUMsU0FBUyxDQUFDO1FBQ2hGLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxXQUFXLEdBQWlCO1lBQzlCLE9BQU8sRUFBRyxhQUFhLEdBQUksSUFBSSxHQUFHLFlBQVk7WUFDOUMsS0FBSyxFQUFFLGVBQWUsR0FBSSxRQUFRLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFpQixDQUFDLFNBQVM7WUFDbEcsYUFBYSxFQUFFLE1BQU07U0FDckIsQ0FBQztRQUNILFFBQVEsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7S0FFckM7SUFFRCxJQUFHLENBQUMsVUFBVSxFQUFFO1FBQ2QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7QUFFSCxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGVBQWUsRUFBRTtJQUVoRCxZQUFZLENBQUMsT0FBTyxHQUFHLGdDQUFnQyxDQUFDO0NBRXpEO0FBRUQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBUyxJQUFJO0lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyxDQUFDLENBQUMifQ==