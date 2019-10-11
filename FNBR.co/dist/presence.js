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
    clientId: "632011406149156874"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "fnbr"
    };
    if (document.location.pathname.startsWith("/outfit") ||
        document.location.pathname.startsWith("/emote") ||
        document.location.pathname.startsWith("/backpack") ||
        document.location.pathname.startsWith("/pickaxe") ||
        document.location.pathname.startsWith("/wrap") ||
        document.location.pathname.startsWith("/music") ||
        document.location.pathname.startsWith("/spray") ||
        document.location.pathname.startsWith("/glider") ||
        document.location.pathname.startsWith("/emoji") ||
        document.location.pathname.startsWith("/skydive") ||
        document.location.pathname.startsWith("/banner") ||
        document.location.pathname.startsWith("/loading") ||
        document.location.pathname.startsWith("/pet") ||
        document.location.pathname.startsWith("/toy")) {
        var itemName = document.querySelector(".col-md-10.col-s12.item-full h3");
        if (itemName) {
            data.details = "Viewing " + itemName.textContent;
        }
        else {
            data.details = "Browsing...";
        }
        var itemRarityType = document.querySelector(".col-md-10.col-s12.item-full h4");
        if (itemRarityType) {
            data.state = itemRarityType.textContent.split("·")[0];
        }
        data.startTimestamp = Date.now();
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/shop")) {
        data.details = "Viewing Item Shop";
        var shopDate = document.querySelector(".shop-rotation h2 small.you");
        if (shopDate) {
            data.state = shopDate.textContent;
        }
        data.startTimestamp = Date.now();
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/upcoming") ||
        document.location.pathname.startsWith("/list") ||
        document.location.pathname.startsWith("/png") ||
        document.location.pathname.startsWith("/icons") ||
        document.location.pathname.startsWith("/reminders") ||
        document.location.pathname.startsWith("/history") ||
        document.location.pathname.startsWith("/modes") ||
        document.location.pathname.startsWith("/news") ||
        document.location.pathname.startsWith("/api/docs")) {
        var pageTitle = document.querySelector(".col-md-12 h2");
        if (pageTitle === null) {
            var pageTitle = document.querySelector(".col-md-9.col-s-12 h2");
        }
        if (pageTitle === null) {
            var pageTitle = document.querySelector(".col-md-6 .mb-2");
        }
        if (pageTitle === null) {
            var pageTitle = document.querySelector(".col-md-5 h2");
        }
        if (pageTitle) {
            data.details = "Viewing page";
            data.state = pageTitle.textContent;
        }
        else {
            data.details = "Browsing...";
        }
        data.startTimestamp = Date.now();
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/random")) {
        data.details = "Generating Random Outfit";
        data.startTimestamp = Date.now();
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/set")) {
        var setName = document.querySelector(".col-md-12 h2");
        if (setName) {
            data.details = "Viewing " + setName.textContent;
        }
        data.startTimestamp = Date.now();
        presence.setActivity(data);
    }
    else if (document.location.pathname.startsWith("/account")) {
        data.details = "Viewing account";
        var accountName = document.querySelector("#userDropdown");
        if (accountName) {
            data.state = accountName.textContent.replace(" ▾", "");
        }
        data.startTimestamp = Date.now();
        presence.setActivity(data);
    }
    else {
        data.details = "Browsing...";
        data.startTimestamp = Date.now();
        presence.setActivity(data);
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNqQyxJQUFJLElBQUksR0FBaUI7UUFDckIsYUFBYSxFQUFFLE1BQU07S0FDeEIsQ0FBQztJQUVGLElBQ0ksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUNoRCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQy9DLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7UUFDbEQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUNqRCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQzlDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDL0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUMvQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQ2hELFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDL0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUNqRCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxD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