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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzVCLGFBQWEsRUFBRSxNQUFNO0NBQ3JCLEVBQ0QsVUFBVSxHQUFZLEtBQUssQ0FBQztBQUU3QixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBRW5CLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksT0FBTyxFQUFFO1FBQzFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7S0FDOUM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ25FLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7S0FDOUM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUNqRSxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNoQyx5Q0FBeUMsQ0FDekMsRUFDRCxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBRWhFLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ2xDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFbEIsSUFBSSxXQUFXLEdBQWlCO2dCQUMvQixPQUFPLEVBQUUseUJBQXlCO2dCQUNsQyxLQUFLLEVBQ0gsS0FBcUIsQ0FBQyxTQUFTO29CQUNoQyxHQUFHO29CQUNGLElBQW9CLENBQUMsU0FBUztvQkFDL0IsR0FBRztnQkFD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