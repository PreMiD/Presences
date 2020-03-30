var presence = new Presence({
    clientId: "672156210627084328",
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var search;
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "animesoul",
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
    else if (document.location.pathname.includes("/this-or-that")) {
        data.startTimestamp = browsingStamp;
        data.details = "Playing This or That";
    }
    else if (document.location.pathname.includes("/mini-games")) {
        data.startTimestamp = browsingStamp;
        data.details = "Playing Mini Games";
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
    else if (document.location.pathname.includes("/creators")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing AS Creators";
    }
    else if (document.location.pathname.includes("/medals")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing AS Medals";
    }
    else if (document.location.pathname.includes("/leaderboards")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing Leaderboards";
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
    else if (document.location.pathname.includes("/settings")) {
        data.startTimestamp = browsingStamp;
        data.details = "Viewing Settings";
    }
    if (data.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(data);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUNyQyxRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQTtBQUNGLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFBO0FBQ2pELElBQUksSUFBSSxDQUFBO0FBQ1IsSUFBSSxLQUFLLENBQUE7QUFDVCxJQUFJLE9BQU8sQ0FBQTtBQUNYLElBQUksTUFBTSxDQUFBO0FBRVYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxJQUFJLEdBQWlCO1FBQ3hCLGFBQWEsRUFBRSxXQUFXO0tBQzFCLENBQUE7SUFDRCxJQUNDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUc7UUFDakMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksUUFBUSxFQUNyQztRQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFBO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUE7S0FDbEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN4RCxJQUFJLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQTtRQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQTtRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsSUFBSSxFQUFFLENBQUE7S0FDaEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUM3RCxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FB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