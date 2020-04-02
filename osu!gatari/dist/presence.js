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
        let title = document.querySelector(".map-title"), act = document.querySelector(".map-artist");
        if (title != null && act != null) {
            customData = true;
            let beatmapData = {
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
        let title = document.querySelector(".map-title"), act = document.querySelector(".map-artist");
        if (title != null && act != null) {
            customData = true;
            let beatmapData = {
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
        let title = document.querySelector(".map-title"), act = document.querySelector(".map-artist");
        if (title != null && act != null) {
            customData = true;
            let beatmapData = {
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
        let doc = document.querySelector(".ban-stroke1"), title = document.querySelector(".ban-stroke2");
        if (doc != null && title != null) {
            customData = true;
            let beatmapData = {
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
        let name = document.querySelector(".user-name")
            .innerText;
        customData = true;
        let profileData = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzNCLGFBQWEsRUFBRSxNQUFNO0NBQ3RCLEVBQ0QsVUFBVSxHQUFZLEtBQUssQ0FBQztBQUU5QixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBRW5CLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksT0FBTyxFQUFFO1FBQ3pDLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7S0FDL0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO1FBQzFFLFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7S0FDaEQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUM3RCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUM5QyxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU5QyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNoQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBRWxCLElBQUksV0FBVyxHQUFpQjtnQkFDOUIsT0FBTyxFQUFFLHlCQUF5QjtnQkFDbEMsS0FBSyxFQUNGLEdBQW1CLENBQUMsU0FBUztvQkFDOUIsS0FBSztvQkFDSixLQUFxQixDQUFDLFNBQVM7Z0JBQ2xDLGFBQWEsRUFBRSxNQUFN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