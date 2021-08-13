const presence = new Presence({
    clientId: "872937214093443093"
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const urlpath = window.location.pathname.split("/");
    const langs = [
        "de",
        "es",
        "fil",
        "fr",
        "it",
        "nl",
        "no",
        "da",
        "pl",
        "pt-pt",
        "sv",
        "tr",
        "ru",
        "cs",
        "ja",
        "zh-cn",
        "zh-tw",
        "ko",
        "hi"
    ], urlpNum = new RegExp(langs.join("|")).test(urlpath[1]) ? 2 : 1;
    const data = {
        largeImageKey: "disboardsmall"
    };
    if (window.location.hostname == "disboard.org") {
        if (!urlpath[urlpNum])
            data.details = "Home";
        data.startTimestamp = browsingStamp;
        {
            data.state = document
                .querySelector("head > title")
                .textContent.replace("Disboard", "");
        }
        if (urlpath[urlpNum].startsWith("dashboard")) {
            data.details = "Dashboard";
        }
        else if (urlpath[urlpNum].startsWith("servers")) {
            data.details = "Take a look at servers";
        }
        else if (urlpath[urlpNum].startsWith("search")) {
            data.details = "Searching";
        }
        else if (urlpath[urlpNum].startsWith("reviews")) {
            data.details = "Look at reviews";
        }
    }
    presence.setActivity(data);
});
