
var presence = new Presence({
    clientId: "651145049811451924",
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
