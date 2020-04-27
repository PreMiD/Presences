var presence = new Presence({
    clientId: "609774216430092298"
}), presenceData = {
    largeImageKey: "logo"
}, customData = false;
presence.on("UpdateData", async () => {
    customData = false;
    if (document.location.pathname == "/home") {
        presenceData.details = "Viewing the homepage";
    }
    else if (document.location.pathname.startsWith("/home/download")) {
        presenceData.details = "Downloading the game";
    }
    else if (document.location.pathname.startsWith("/beatmapsets")) {
        var title = document.querySelector(".beatmapset-header__details-text--title"), diff = document.querySelector(".beatmapset-header__diff-name");
        if (title != null && diff != null) {
            customData = true;
            var beatmapData = {
                details: "Looking at the beatmap:",
                state: title.innerText +
                    "[" +
                    diff.innerText +
                    "]",
                largeImageKey: "logo"
            };
            presence.setActivity(beatmapData);
        }
        else {
            presenceData.details = "Searching for new beatmaps";
        }
    }
    else if (document.location.pathname.startsWith("/beatmaps/packs")) {
        presenceData.details = "Browsing through beatmap packs";
    }
    else if (document.location.pathname.startsWith("/beatmaps/artists")) {
        presenceData.details = "Browsing through featured artists";
    }
    else if (document.location.pathname.startsWith("/store")) {
        presenceData.details = "Browsing through the store";
    }
    else if (document.location.pathname.startsWith("/rankings")) {
        presenceData.details = "Browsing through the rankings";
    }
    else if (document.location.pathname.startsWith("/community/forums")) {
        presenceData.details = "Browsing through the forum";
    }
    else if (document.location.pathname.startsWith("/community/chat")) {
        presenceData.details = "Chatting";
    }
    else if (document.location.pathname.startsWith("/community/contests")) {
        presenceData.details = "Browsing through the Contests";
    }
    else if (document.location.pathname.startsWith("/community/livestreams")) {
        presenceData.details = "Browsing through livestreams";
    }
    else if (document.location.pathname.startsWith("/community/tournaments")) {
        presenceData.details = "Browsing through Tournaments";
    }
    else if (document.location.pathname.startsWith("/home/search")) {
        presenceData.details = "Is searching something";
    }
    else if (document.location.pathname.startsWith("/home/account/edit")) {
        presenceData.details = "Changing their account settings";
    }
    else if (document.location.pathname.startsWith("/help/wiki")) {
        presenceData.details = "Browsing through the wiki";
    }
    else if (document.location.pathname.startsWith("/home/changelog")) {
        presenceData.details = "Looking at the changelog";
    }
    else if (document.location.pathname.startsWith("/home/friends")) {
        presenceData.details = "Browsing through the friend list";
    }
    else if (document.location.pathname.startsWith("/users")) {
        var name = document.querySelector(".profile-info__name .u-ellipsis-overflow").innerText;
        customData = true;
        var profileData = {
            details: "Looking at " + name + "'s Profile",
            state: "Rank: " +
                document.querySelector(".value-display__value")
                    .innerText +
                " / " +
                document.querySelector(".value-display--pp .value-display__value").innerText +
                "pp",
            largeImageKey: "logo"
        };
        presence.setActivity(profileData);
    }
    else {
        presenceData.details = "Seems to be somewhere wrongly";
    }
    if (!customData) {
        presence.setActivity(presenceData);
    }
});
presence.on("iFrameData", function (data) {
    console.log(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzNCLGFBQWEsRUFBRSxNQUFNO0NBQ3RCLEVBQ0QsVUFBVSxHQUFHLEtBQUssQ0FBQztBQUVyQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBRW5CLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksT0FBTyxFQUFFO1FBQ3pDLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7S0FDL0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ2xFLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7S0FDL0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUNoRSxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM5Qix5Q0FBeUMsQ0FDMUMsRUFDRCxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBRWpFLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ2pDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFbEIsSUFBSSxXQUFXLEdBQWlCO2dCQUM5QixPQUFPLEVBQUUseUJBQXlCO2dCQUNsQyxLQUFLLEVBQ0YsS0FBcUIsQ0FBQyxTQUFTO29CQUNoQyxHQUFHO29CQUNGLElBQW9CLENBQUMsU0FBUztvQkFDL0IsR0FBRztnQkFD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