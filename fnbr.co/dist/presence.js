var presence = new Presence({
    clientId: "632047673754648586"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "logo"
    };
    var path = document.location.pathname;
    if (path == "/") {
        data.details = "Viewing homepage";
    }
    else if (path.startsWith("/manage/edit")) {
        var editData = document.querySelector(".card-body h2 .cosmetic-name");
        data.details = "Editing item";
        data.state = editData.textContent;
    }
    else if (path.startsWith("/manage/sets")) {
        data.details = "Editing item sets";
    }
    else if (path.startsWith("/backpack") ||
        path.startsWith("/banner") ||
        path.startsWith("/bundle") ||
        path.startsWith("/emoji") ||
        path.startsWith("/emote") ||
        path.startsWith("/glider") ||
        path.startsWith("/loading") ||
        path.startsWith("/music") ||
        path.startsWith("/outfit") ||
        path.startsWith("/pet") ||
        path.startsWith("/pickaxe") ||
        path.startsWith("/skydive") ||
        path.startsWith("/spray") ||
        path.startsWith("/toy") ||
        path.startsWith("/umbrella") ||
        path.startsWith("/wrap")) {
        var itemTitle = document.querySelector(".col-md-10.col-s12.item-full h3");
        var itemInfo = document.querySelector(".col-md-10.col-s12.item-full h4");
        data.details = "Viewing " + itemTitle.firstChild.textContent;
        data.state = itemInfo.textContent;
    }
    else if (path.startsWith("/upcoming")) {
        data.details = "Viewing upcoming items";
    }
    else if (path.startsWith("/list")) {
        data.details = "Viewing cosmetics list";
    }
    else if (path.startsWith("/sets/")) {
        var setName = document.querySelector(".col-md-12 h2");
        var setInfo = document.querySelector(".col-md-12 p");
        data.details = "Viewing " + setName.textContent;
        data.state = setInfo.textContent;
    }
    else if (path.startsWith("/sets")) {
        data.details = "Viewing item sets";
    }
    else if (path.startsWith("/png")) {
        data.details = "Viewing cosmetics png";
    }
    else if (path.startsWith("/icons")) {
        data.details = "Viewing cosmetics icons";
    }
    else if (path.startsWith("/reminders")) {
        data.details = "Viewing item reminders";
    }
    else if (path.startsWith("/history")) {
        data.details = "Viewing shop history";
    }
    else if (path.startsWith("/shop/")) {
        var shopHistoryData = document.querySelector(".col-md-12 h2 .you");
        data.details = "Viewing item shop";
        data.state = shopHistoryData.textContent;
    }
    else if (path.startsWith("/shop")) {
        var shopData = document.querySelector(".col-m.col-12.primary h2 .you");
        data.details = "Viewing item shop";
        data.state = shopData.textContent;
    }
    else if (path.startsWith("/modes")) {
        data.details = "Viewing ltm's";
    }
    else if (path.startsWith("/news")) {
        data.details = "Viewing news";
    }
    else if (path.startsWith("/random")) {
        data.details = "Randomising items";
    }
    else if (path.startsWith("/api")) {
        data.details = "Viewing api documentation";
    }
    else if (path.startsWith("/account")) {
        data.details = "Viewing account data";
    }
    else {
        data.details = "Browsing";
    }
    data.startTimestamp = Date.now();
    presence.setActivity(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxJQUFJLEdBQWlCO1FBQ3ZCLGFBQWEsRUFBRSxNQUFNO0tBQ3RCLENBQUM7SUFDRixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUV0QyxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO0tBQ25DO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQzFDLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7S0FDbkM7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztLQUNwQztTQUFNLElBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFDeEI7UUFDQSxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1FBQzdELElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztLQUNuQztTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO0tBQ3pDO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7S0FDekM7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDcEMsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN0RCxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO0tBQ2xDO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7S0FDcEM7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztLQUN4QztTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDO0tBQzFDO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7S0FDekM7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztLQUN2QztTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNwQyxJQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxXQUFXLENBQUM7S0FDMUM7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDbkMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO0tBQ25DO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO0tBQ2hDO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO0tBQy9CO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7S0FDcEM7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztLQUM1QztTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO0tBQ3ZDO1NBQU07UUFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztLQUMzQjtJQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2pDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFDLENBQUMifQ==