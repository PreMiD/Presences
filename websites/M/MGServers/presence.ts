const presence = new Presence({
  clientId: "899051140157681726"
}),
browsingStamp = Math.floor(Date.now() / 1000),
 forumurl = "mgservers.de",
 panelurl = "webinterface.mgservers.de",
 panelserverurl = "webinterface.mgservers.de/server/";

presence.on("UpdateData", async () => {
    const privacy = await presence.getSetting("privacy"),
     werbung = await presence.getSetting("werbung"),
     presenceData: PresenceData = {
        largeImageKey: "mgs-normal",
        smallImageKey: "mgs-normal",
        smallImageText: "MGS",
        startTimestamp: browsingStamp
    };

    if (privacy) {
        if (getUrl(forumurl)) {
            presenceData.details = "Ist im Forum";
            presenceData.smallImageText = "Forum";
            presenceData.smallImageKey = "mgs-normal";
        }
        if (getUrl(panelurl)) {
            presenceData.details = "Ist im Webinterface";
            presenceData.smallImageText = "Webinterface";
            presenceData.smallImageKey = "wi-normal";
        }
    } else {
        if (getUrl(forumurl)) {
            presenceData.details = "Ist im Forum";
            presenceData.smallImageText = "Forum";
            presenceData.smallImageKey = "mgs-normal";
            [presenceData.state] = document.querySelector("title").textContent.split(' - MGServers');

            if (document.URL.includes("conversation")) {
              presenceData.state = `Liest eine Konversation`;
              presenceData.buttons = [{label: "Forum", url: `https://${forumurl}/forum`}];
            } else if (document.URL.includes("global-jcoins-statement-list")) {
              presenceData.state = `Kontoauszüge`;
              presenceData.buttons = [{label: "Forum", url: `https://${forumurl}/forum`}];
            } else if (document.URL.includes("acp"))
              presenceData.state = `Administrationsoberfläche`;
              presenceData.buttons = [{label: "Forum", url: `https://${forumurl}/forum`}];
            } else if (document.URL.includes("moderation-list")) {
              presenceData.state = `Moderation`;
              presenceData.buttons = [{label: "Forum", url: `https://${forumurl}/forum`}];
            }
        }
        if (getUrl(panelurl)) {
            presenceData.smallImageText = "Webinterface";
            presenceData.smallImageKey = "wi-normal";
            presenceData.details = "Serverliste";
            
            if (getPath("")) presenceData.details = "Serverliste";
            else if (getPath("/")) presenceData.details = "Serverliste";
            else if (getPath("/auth/login")) presenceData.details = "Panel-Login";
            else if (getPath("/auth/password")) presenceData.details = "Hat sein Passwort vergessen...";
            else if (getPath("/account")) presenceData.details = "Schaut seinen Panel-Account an";
            else if (getPath("/account/api")) presenceData.details = "Schaut seine API-Keys an";
            else if (getPath("/staff")) presenceData.details = "Stellt eine Zugriffsanfrage";

            if (getUrl(panelserverurl)) {
                presenceData.state = `${document.querySelector("title").textContent.split(' |')[0]}`;

                if (getPathServer(``)) presenceData.details = "Server-Konsole";
                else if (getPathServer(`/files`)) presenceData.details = "Ist im Dateimanager";
                else if (getPathServer(`/databases`)) presenceData.details = "Bearbeitet Datenbanken";
                else if (getPathServer(`/schedules`)) presenceData.details = "Verwaltet Aufgaben";
                else if (getPathServer(`/user`)) presenceData.details = "Verwaltet Subuser";
                else if (getPathServer(`/backups`)) presenceData.details = "Verwaltet Backups";
                else if (getPathServer(`/network`)) presenceData.details = "Verwaltet IPs und Ports";
                else if (getPathServer(`/startup`)) presenceData.details = "Verwaltet Startparameter";
                else if (getPathServer(`/subdomain`)) presenceData.details = "Verwaltet Subdomains";
                else if (getPathServer(`/staff`)) presenceData.details = "Verwaltet Zugriffsanfragen";
                else if (getPathServer(`/settings`)) presenceData.details = "Servereinstellungen";
            }

            if (getPath("/admin")) {
                presenceData.details = "Admininterface";
                delete presenceData.state;
            } else if (document.querySelector("title").textContent.toLowerCase() === "forbidden") {
                presenceData.details = "Wünscht sich, cool zu sein!";
                delete presenceData.state;
            }
        }
    }

    if (werbung && !privacy) {
        if (document.URL.includes(`https://${forumurl}`)) {
            presenceData.buttons = [
                {
                    label: "Forum",
                    url: `https://${forumurl}/forum`
                },
                {
                    label: "Aktuelle Seite",
                    url: document.URL
                }
            ]
            if (document.URL.includes("conversation")) presenceData.state = `Liest eine Konversation`;
            else if (document.URL.includes("global-jcoins-statement-list")) presenceData.state = `Kontoauszüge`;
            else if (document.URL.includes("acp")) presenceData.state = `Administrationsoberfläche`;
            else if (document.URL.includes("moderation-list")) presenceData.state = `Moderation`;
        } else {
            presenceData.buttons = [
                {
                    label: "Forum",
                    url: `https://${forumurl}`
                },
            ]
        }
    } else {
        presenceData.buttons = [
            {
                label: "Forum",
                url: `https://${forumurl}`
            },
        ]
    }

    if (!presenceData.details) {
        presence.setTrayTitle();
        presence.setActivity(presenceData);
    } else presence.setActivity(presenceData);

});

function getUrl(url: string) {
    return window.location.href.toLowerCase().includes(url)
}

function getPath(path: string) {
    return window.location.pathname.toLowerCase().includes(path)
}

function getPathServer(path: string) {
    return window.location.href.toLocaleLowerCase().replace(panelserverurl, "").includes(path)
}
