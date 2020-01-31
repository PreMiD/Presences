var presence = new Presence({
    clientId: "672156210627084328",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var search;

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "animesoul"
    };
    if (document.location.pathname == "/" || document.location.pathname == "/home/") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing home page";
    }
    else if (document.location.pathname.includes("/user")) {
        user = document.title;
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = `Viewing ${user}`;
    }
    else if (document.location.pathname.includes("/dashboard")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the Dashboard";
    }
    else if (document.location.pathname.includes("/premium")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Premium";
    }
    else if (document.location.pathname.includes("/giveaway")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Giveaways";
    }
    else if (document.location.pathname.includes("/shop")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the Shop";
    }
    else if (document.location.pathname.includes("/bank")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the Bank";
    }
    else if (document.location.pathname.includes("/cards")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the Cards";
    }
    else if (document.location.pathname.includes("/card-abilities")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Card Abilities";
    }
    else if (document.location.pathname.includes("/card-events")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Card Events";
    }
    else if (document.location.pathname.includes("/inventory")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Inventory";
    }
    else if (document.location.pathname.includes("/fusion")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Fusing Cards";
    }
    else if (document.location.pathname.includes("/auction")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the Auction";
    }
    else if (document.location.pathname.includes("/this-or-that")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Playing This or That";
    }
    else if (document.location.pathname.includes("/mini-games")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Playing Mini Games";
    }
    else if (document.location.pathname.includes("/market")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the Market";
    }
    else if (document.location.pathname.includes("/notifications")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Notifications";
    }
    else if (document.location.pathname.includes("/creators")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing AS Creators";
    }
    else if (document.location.pathname.includes("/medals")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing AS Medals";
    }
    else if (document.location.pathname.includes("/leaderboards")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Leaderboards";
    }
    else if (document.location.pathname.includes("/appeals")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Appeals";
    }
    else if (document.location.pathname.includes("/updates")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Updates";
    }
    else if (document.location.pathname.includes("/guides")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Guides";
    }
    else if (document.location.pathname.includes("/rules")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Reading the rules";
    }
    else if (document.location.pathname.includes("/staff-list")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Staff List";
    }
    else if (document.location.pathname.includes("/settings")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Settings";
    }
    else if (document.location.pathname.includes("/staff")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Hidden Page";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
}));