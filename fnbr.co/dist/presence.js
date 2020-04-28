var presence = new Presence({
    clientId: "632047673754648586"
});
presence.on("UpdateData", async () => {
    const data = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFpQjtRQUN6QixhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBQ0YsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFFdEMsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztLQUNuQztTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUMxQyxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO0tBQ25DO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7S0FDcEM7U0FBTSxJQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxD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