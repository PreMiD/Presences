/// @todo maybe support all the languages soon
var presence = new Presence({
    clientId: "638565041154555913",
    mediaKeys: false
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname.startsWith("/wiki/")) {
        let page = "N/A";
        try {
            page = document.getElementsByClassName("page-header__title")[0].textContent;
        }
        finally {}
        let presenceData = {
            details: "Viewing a page...",
            state: page,
            largeImageKey: "logo"
        };
        presence.setActivity(presenceData);
    }
}));
