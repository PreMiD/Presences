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