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
    clientId: "632047673754648586"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "logo"
    };
    var path = document.location.pathname;
    if (path == "/") {
        data.details = "Viewing Homepage";
    }
    else if (path.startsWith("/manage/edit")) {
        var editData = document.querySelector(".card-body h2 .cosmetic-name");
        data.details = "Editing Item";
        data.state = editData.textContent;
    }
    else if (path.startsWith("/manage/sets")) {
        data.details = "Editing Item Sets";
    }
    else if (path.startsWith("/backpack")
        || path.startsWith("/banner")
        || path.startsWith("/bundle")
        || path.startsWith("/emoji")
        || path.startsWith("/emote")
        || path.startsWith("/glider")
        || path.startsWith("/loading")
        || path.startsWith("/music")
        || path.startsWith("/outfit")
        || path.startsWith("/pet")
        || path.startsWith("/pickaxe")
        || path.startsWith("/skydive")
        || path.startsWith("/spray")
        || path.startsWith("/toy")
        || path.startsWith("/umbrella")
        || path.startsWith("/wrap")) {
        var itemTitle = document.querySelector(".col-md-10.col-s12.item-full h3");
        var itemInfo = document.querySelector(".col-md-10.col-s12.item-full h4");
        data.details = "Viewing " + itemTitle.firstChild.textContent;
        data.state = itemInfo.textContent;
    }
    else if (path.startsWith("/upcoming")) {
        data.details = "Viewing Upcoming Items";
    }
    else if (path.startsWith("/list")) {
        data.details = "Viewing Cosmetics List";
    }
    else if (path.startsWith("/sets/")) {
        var setName = document.querySelector(".col-md-12 h2");
        var setInfo = document.querySelector(".col-md-12 p");
        data.details = "Viewing " + setName.textContent;
        data.state = setInfo.textContent;
    }
    else if (path.startsWith("/sets")) {
        data.details = "Viewing Item Sets";
    }
    else if (path.startsWith("/png")) {
        data.details = "Viewing Cosmetics PNG";
    }
    else if (path.startsWith("/icons")) {
        data.details = "Viewing Cosmetics Icons";
    }
    else if (path.startsWith("/reminders")) {
        data.details = "Viewing Item Reminders";
    }
    else if (path.startsWith("/history")) {
        data.details = "Viewing Shop History";
    }
    else if (path.startsWith("/shop/")) {
        var shopHistoryData = document.querySelector(".col-md-12 h2 .you");
        data.details = "Viewing Item Shop";
        data.state = shopHistoryData.textContent;
    }
    else if (path.startsWith("/shop")) {
        var shopData = document.querySelector(".col-m.col-12.primary h2 .you");
        data.details = "Viewing Item Shop";
        data.state = shopData.textContent;
    }
    else if (path.startsWith("/modes")) {
        data.details = "Viewing LTM's";
    }
    else if (path.startsWith("/news")) {
        data.details = "Viewing News";
    }
    else if (path.startsWith("/random")) {
        data.details = "Randomising Items";
    }
    else if (path.startsWith("/api")) {
        data.details = "Viewing API Documentation";
    }
    else if (path.startsWith("/account")) {
        data.details = "Viewing Account Data";
    }
    else {
        data.details = "Browsing";
    }
    data.startTimestamp = Date.now();
    presence.setActivity(data);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FDM0I7SUFDSSxRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FDN0I7SUFDSSxJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDcEMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBRWpDLElBQUksSUFBSSxHQUNSO1FBQ0ksYUFBYSxFQUFFLE1BQU07S0FDeEIsQ0FBQztJQUNGLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBRXRDLElBQUksSUFBSSxJQUFJLEdBQUcsRUFDZjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7S0FDckM7U0FDSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEVBQ3hDO1FBQ0ksSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztLQUNyQztTQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFDeEM7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO0tBQ3RDO1NBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztXQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztXQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztXQUMxQixJQUFJ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