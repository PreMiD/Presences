const presence = new Presence({
        clientId: "840759396103749633"
    }),
    { language } = window.navigator;

function getTranslation(name: string) {
    switch(name) {
        case "home":
            switch(language) {
                case "de":
                    return "Durchsucht die Startseite";
                default:
                    return "Browsing home page";
            }
        case "search":
            switch(language) {
                case "de":
                    return "Sucht nach etwas";
                default:
                    return "Searching for something";
            }
        case "faq":
            switch(language) {
                case "de":
                    return "Durchsucht das FAQ";
                default:
                    return "Browsing FAQ page";
            }
        case "activity":
            switch(language) {
                case "de":
                    return "Schaut sich Aktivität an";
                default:
                    return "Viewing activity";
            }
        case "user":
            switch(language) {
                case "de":
                    return "Schaut sich Benutzer an";
                default:
                    return "Viewing user";
            }
        case "settings":
            switch(language) {
                case "de":
                    return "Durchsucht die Einstellungen";
                default:
                    return "Browsing settings page";
            }
        case "view":
            switch(language) {
                case "de":
                    return "Seite anzeigen";
                default:
                    return "View page";
            }
    }
}

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "logo",
        startTimestamp: new Date().getTime(), //The unix epoch timestamp for when to start counting from
        buttons: [
            {
                label: getTranslation("view"),
                url: window.location.href
            }
        ]
    }; /*Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceSata.type = "blahblah"; type examples: details, state, etc.*/

    if (window.location.pathname === "/") presenceData.details = getTranslation("home");
    else if (window.location.pathname === "/search") presenceData.details = getTranslation("search");
    else if (window.location.pathname === "/faq") presenceData.details = getTranslation("faq");
    else if (window.location.pathname.includes("/activity/")) {
        const activityName = document.querySelector("#__next > div > main > div > h1").innerHTML;
        presenceData.details = getTranslation("activity");
        presenceData.state = activityName;
    } else if (window.location.pathname.includes("/user/")) {
        const [ username ] = document.querySelector("#__next > div > main > div > h1").innerHTML.split("<"); // We use split bc I do not want to display the img tag in the presence
        presenceData.details = getTranslation("user");
        presenceData.state = username;
    } else if (window.location.pathname === "/settings") presenceData.details = getTranslation("settings");

    if (presenceData.details === null) {
        presence.setTrayTitle(); //Clears the tray title for mac users
        presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
    } else presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
});