var presence = new Presence({
    clientId: "870075637619118131"
});
presence.on("UpdateData", function () { return __awaiter(_this, void 0, void 0, function () {
    var title, path, presenceData, intervalEditor, embedEditor, domainPicker, fakeUrlManager, randomDomainPicker;
    return __generator(this, function (_a) {
        title = document.title, path = document.location.pathname, presenceData = {
            largeImageKey: "large",
            details: title,
            state: null
        };
        switch (path) {
            case "/":
                presenceData.details = "Viewing imgs.bar";
                presenceData.state = "A private file host";
                break;
            case "/dashboard": {
                presenceData.startTimestamp = Date.now();
                presenceData.details = "Viewing the gallery";
                break;
            }
            case "/settings": {
                intervalEditor = document.getElementsByClassName("ant-modal-wrap ant-modal-centered")[0], embedEditor = document.getElementsByClassName("embedEditor")[0], domainPicker = document.getElementsByClassName("ant-select-open")[0], fakeUrlManager = document.getElementsByClassName("fakeUrlManager")[0];
                if (embedEditor && embedEditor.parentElement.style.display !== "none") {
                    presenceData.state = "Editing embed";
                    presenceData.startTimestamp = Date.now();
                }
                else if (domainPicker) {
                    presenceData.startTimestamp = Date.now();
                    presenceData.state = "Choosing a domain";
                }
                else if (intervalEditor && intervalEditor.style.display !== "none") {
                    presenceData.startTimestamp = Date.now();
                    presenceData.state = "Editing auto-wipe interval";
                }
                else if (fakeUrlManager && fakeUrlManager.parentElement.style.display !== "none") {
                    presenceData.startTimestamp = Date.now();
                    presenceData.state = "Editing Fake URL";
                }
                else {
                    presenceData.startTimestamp = Date.now();
                }
                break;
            }
            case "/settings/domains": {
                randomDomainPicker = document.getElementsByClassName("ant-select-open")[0];
                if (randomDomainPicker) {
                    presenceData.startTimestamp = Date.now();
                    presenceData.state = "Adding a random domain";
                }
                else if (!document.body.textContent.includes("Loading")) {
                    presenceData.startTimestamp = Date.now();
                    presenceData.state = "Viewing " + document.querySelectorAll('strong')[0].innerHTML + " domains";
                }
                break;
            }
            case "/tools/upload":
                presenceData.startTimestamp = Date.now();
                presenceData.details = "Viewing the uploader";
                break;
            case "/tools/shorten":
                presenceData.startTimestamp = Date.now();
                presenceData.details = "Viewing the shortener";
                break;
            case "/account":
                presenceData.startTimestamp = Date.now();
                presenceData.details = "Account";
                break;
            default:
                presenceData.state = "Viewing imgs.bar";
                presenceData.startTimestamp = Date.now();
        }
        if (!isNaN(parseInt(path.charAt(path.length - 1), 10))) {
            presenceData.state = "Viewing " + document.getElementsByClassName("title___aqmzM")[0].innerHTML + "'s profile";
        }
        if (presenceData.details == null) {
            presence.setTrayTitle();
            presence.setActivity();
        }
        else {
            presence.setActivity(presenceData);
        }
        return [2 /*return*/];
    });
}); });
