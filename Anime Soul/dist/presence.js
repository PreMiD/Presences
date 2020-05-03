var presence = new Presence({
    clientId: "672156210627084328"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
presence.on("UpdateData", async () => {
    const data = {
        largeImageKey: "animesoul",
        startTimestamp: 1577232000,
        details: "Viewing home page"
    };
    if (document.location.pathname == "/" ||
        document.location.pathname == "/home/") {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing home page";
    }
    else if (document.location.pathname.includes("/user")) {
        user = document.title;
        data.startTimestamp = browsingStamp;
        data.details = `Viewing ${user}`;
    }
    else if (document.location.pathname.includes("/dashboard")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing the Dashboard";
    }
    else if (document.location.pathname.includes("/premium")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing Premium";
    }
    else if (document.location.pathname.includes("/giveaway")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing Giveaways";
    }
    else if (document.location.pathname.includes("/settings")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing Settings";
    }
    else if (document.location.pathname.includes("/market")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing the Market";
    }
    else if (document.location.pathname.includes("/notifications")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing Notifications";
    }
    else if (document.location.pathname.includes("/events")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing AS Events";
    }
    else if (document.location.pathname.includes("/anime")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing Anime";
    }
    else if (document.location.pathname.includes("/shop")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing the Shop";
    }
    else if (document.location.pathname.includes("/bank")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing the Bank";
    }
    else if (document.location.pathname.includes("/cards")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing the Cards";
    }
    else if (document.location.pathname.includes("/card-abilities")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing Card Abilities";
    }
    else if (document.location.pathname.includes("/card-events")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing Card Events";
    }
    else if (document.location.pathname.includes("/inventory")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing Inventory";
    }
    else if (document.location.pathname.includes("/fusion")) {
        data.startTimestamp = browsingStamp;
        data.details = "Fusing Cards";
    }
    else if (document.location.pathname.includes("/auction")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing the Auction";
    }
    else if (document.location.pathname.includes("/trades")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing Trades List";
    }
    else if (document.location.pathname.includes("/this-or-that")) {
        data.startTimestamp = browsingStamp;
        data.details = "Playing This or That";
    }
    else if (document.location.pathname.includes("/mini-games")) {
        data.startTimestamp = browsingStamp;
        data.details = "Playing Mini Games";
    }
    else if (document.location.pathname.includes("/creators")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing AS Creators";
    }
    else if (document.location.pathname.includes("/medals")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing AS Medals";
    }
    else if (document.location.pathname.includes("/friends")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing AS Friends";
    }
    else if (document.location.pathname.includes("/leaderboards")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing Leaderboards";
    }
    else if (document.location.pathname.includes("/servers")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing AS Servers";
    }
    else if (document.location.pathname.includes("/appeals")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing Appeals";
    }
    else if (document.location.pathname.includes("/updates")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing Updates";
    }
    else if (document.location.pathname.includes("/guides")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing Guides";
    }
    else if (document.location.pathname.includes("/rules")) {
        data.startTimestamp = browsingStamp;
        data.details = "Reading the rules";
    }
    else if (document.location.pathname.includes("/staff-list")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing Staff List";
    }
    else if (document.location.pathname.includes("/staff")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing Hidden Page";
    }
    if (data.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(data);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUNILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksSUFBSSxDQUFDO0FBQ1QsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDakMsTUFBTSxJQUFJLEdBQUc7UUFDVCxhQUFhLEVBQUUsV0FBVztRQUMxQixjQUFjLEVBQUUsVUFBVTtRQUMxQixPQUFPLEVBQUUsbUJBQW1CO0tBQy9CLENBQUM7SUFDRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUc7UUFDakMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7S0FDdEM7U0FDSSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNuRCxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsSUFBSSxFQUFFLENBQUM7S0FDcEM7U0FDSSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUN4RCxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUNwQyxJQUFJLENBQUMs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