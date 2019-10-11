var presence = new Presence({
    clientId: "632011406149156874"
});

presence.on("UpdateData", async () => {
    let data: presenceData = {
        largeImageKey: "fnbr"
    };

    if (
        document.location.pathname.startsWith("/outfit") ||
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
        document.location.pathname.startsWith("/toy")
    ) {
        var itemName = document.querySelector(
            ".col-md-10.col-s12.item-full h3"
        );
        if (itemName) {
            data.details = "Viewing " + itemName.textContent;
        } else {
            data.details = "Browsing...";
        }

        var itemRarityType = document.querySelector(
            ".col-md-10.col-s12.item-full h4"
        );
        if (itemRarityType) {
            data.state = itemRarityType.textContent.split("·")[0];
        }

        data.startTimestamp = Date.now();

        presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/shop")) {
        data.details = "Viewing Item Shop";

        var shopDate = document.querySelector(".shop-rotation h2 small.you");
        if (shopDate) {
            data.state = shopDate.textContent;
        }

        data.startTimestamp = Date.now();

        presence.setActivity(data);
    } else if (
        document.location.pathname.startsWith("/upcoming") ||
        document.location.pathname.startsWith("/list") ||
        document.location.pathname.startsWith("/png") ||
        document.location.pathname.startsWith("/icons") ||
        document.location.pathname.startsWith("/reminders") ||
        document.location.pathname.startsWith("/history") ||
        document.location.pathname.startsWith("/modes") ||
        document.location.pathname.startsWith("/news") ||
        document.location.pathname.startsWith("/api/docs")
    ) {
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
        } else {
            data.details = "Browsing...";
        }

        data.startTimestamp = Date.now();

        presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/random")) {
        data.details = "Generating Random Outfit";
        data.startTimestamp = Date.now();

        presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/set")) {
        var setName = document.querySelector(".col-md-12 h2");
        if (setName) {
            data.details = "Viewing " + setName.textContent;
        }

        data.startTimestamp = Date.now();

        presence.setActivity(data);
    } else if (document.location.pathname.startsWith("/account")) {
        data.details = "Viewing account";

        var accountName = document.querySelector("#userDropdown");
        if (accountName) {
            data.state = accountName.textContent.replace(" ▾", "");
        }

        data.startTimestamp = Date.now();

        presence.setActivity(data);
    } else {
        data.details = "Browsing...";
        data.startTimestamp = Date.now();

        presence.setActivity(data);
    }
});
