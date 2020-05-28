const presence = new Presence({clientId: "714822481286004778"});
const browsingStamp = Math.floor(Date.now() / 1000);
let gameArea: HTMLElement, pauseMenu: HTMLElement;

presence.on("UpdateData", () => {
    const presenceData: PresenceData = {
        largeImageKey: "logo",
    startTimestamp: browsingStamp
    };

    if (document.location.pathname == "/") {
        gameArea = document.querySelector("#game-area > canvas");
        pauseMenu = document.querySelector("#pause-menu");
        const pausedHidden = pauseMenu.getAttribute("hidden");
        if (gameArea != null) {
            presenceData.details = "Clicking circles";
            if (pausedHidden == null) {
            presenceData.details = "Clicking circles";
            presenceData.state = "Paused menu";
            }
        } else {
            const pageHome = document.getElementsByClassName("title")[0];
            let pageText1;
            if (pageHome == null) {
                pageText1 = "Browsing...";
            } else {
                pageText1 = "Listening: " + pageHome.textContent;
            }
            presenceData.details = "Viewing the homepage",
            presenceData.state = pageText1
        }
    } else if (document.location.pathname.startsWith("/index")) {
        const pageHome = document.getElementsByClassName("title")[0];
        let pageText1;
        if (pageHome == null) {
                pageText1 = "Browsing...";
            } else {
                pageText1 = "Listening: " + pageHome.textContent;
            }
                presenceData.details = "Viewing the homepage",
                presenceData.state = pageText1;
        } else if (document.location.pathname.startsWith("/new")) {
            const pageNew = document.getElementsByClassName("title")[0];
            let pageText2;
            if (pageNew == null) {
                pageText2 = "Browsing...";
            } else {
                pageText2 = "Listening: " + pageNew.textContent;
            }
            presenceData.details = "Viewing new beatmaps",
            presenceData.state = pageText2;
        } else if (document.location.pathname.startsWith("/hot")) {
            const pageHot = document.getElementsByClassName("title")[0];
            let pageText3;
            if (pageHot == null) {
                pageText3 = "Browsing...";
            } else {
                pageText3 = "Listening: " + pageHot.textContent;
            }
            presenceData.details = "Viewing hot beatmaps",
            presenceData.state = pageText3;
        } else if (document.location.pathname.startsWith("/genre")) {
            const pageGen1 = document.getElementsByClassName("title")[2];
            const pageGen2 = document.getElementsByClassName("title")[0];
            const pageGen3 = document.getElementsByClassName("title")[1];
            const pageGen4 = document.getElementsByClassName("selitem active")[0];
            const pageGen5 = document.getElementsByClassName("selitem active")[1];
            if (pageGen1 != null) {
                let pageText4;
                pageText4 = "Listening: " + pageGen1.textContent;
                presenceData.details = "Searching by categories",
                presenceData.state = pageText4;
            } else {
                let pageText5;
                pageText5 = pageGen2.textContent + ": " + pageGen4.textContent + " " + pageGen3.textContent + ": " + pageGen5.textContent;

                presenceData.details = "Searching by categories",
                presenceData.state = pageText5;
            };
        } else if (document.location.pathname.startsWith("/search")) {
            let pageSch1 = document.getElementsByClassName("title")[0];
            let pageSch2 = document.getElementsByName("q")[0];
            let pageText6;
            let pageText7;
            if (pageSch1 != null) {
                pageText6 = "Listening: " + pageSch1.textContent;
                presenceData.details = "Searching for beatmaps",
                presenceData.state = pageText6;
            } else {
            if ((pageSch2 as HTMLInputElement).value == "") {
                pageText7 = "Browsing...";
            } else {
                pageText7 = "Keyword: " + (pageSch2 as HTMLInputElement).value;
            }
            presenceData.details = "Searching for beatmaps",
            presenceData.state = pageText7;
            };

        } else if (document.location.pathname.startsWith("/local")) {
            let pageFav = document.getElementsByClassName("title")[0];
            let pageText7;
            if (pageFav == null) {
                pageText7 = "Browsing...";
            } else {
                pageText7 = "Listening: " + pageFav.textContent;
            }
                presenceData.details = "Viewing my favourites",
                presenceData.state = pageText7;

        } else if (document.location.pathname.startsWith("/history")) {
            presenceData.details = "Viewing playing history",
            presenceData.state = "Browsing..."
        } else if (document.location.pathname.startsWith("/faq")) {
            presenceData.details = "Viewing FAQ",
            presenceData.state = "Getting some information"
        } else if (document.location.pathname.startsWith("/settings")) {
            presenceData.details = "Viewing settings",
            presenceData.state = "Changing..."
        }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});