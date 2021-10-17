const presence = new Presence({
  clientId: "899051140157681726"
}),
browsingStamp = Math.floor(Date.now() / 1000);
const forumurl = "mgservers.de",
 panelurl = "webinterface.mgservers.de",
 panelserverurl = "webinterface.mgservers.de/server/";

presence.on("UpdateData", async () => {
    const privacy = await presence.getSetting("privacy"),
     werbung = await presence.getSetting("werbung"),
     presenceData: PresenceData = {
        details: "Dein Server Hoster",
        largeImageKey: "mgs-normal",
        smallImageKey: "mgs-normal",
        smallImageText: "MGS",
        startTimestamp: browsingStamp,
    };

    if (privacy) {
        if (getUrl(`${forumurl}`)) {
            presenceData.details = "Ist im Forum";
            presenceData.smallImageText = "Forum";
            presenceData.smallImageKey = "mgs-normal";
        }
        if (getUrl(`${panelurl}`)) {
            presenceData.details = "Ist im Webinterface";
            presenceData.smallImageText = "Webinterface";
            presenceData.smallImageKey = "wi-normal";
        }
    } else {
        if (getUrl(`${forumurl}`)) {
            presenceData.details = "Ist im Forum";
            presenceData.smallImageText = "Forum";
            presenceData.smallImageKey = "mgs-normal";
            presenceData.state = `${document.querySelector("title").textContent.split(' - MGServers')[0]}`

            if(document.URL.includes("conversation")) presenceData.state = `Ließt eine Konversationen`, presenceData.buttons = [{label: "Forum",url: `https://${forumurl}/forum`}]
            if(document.URL.includes("global-jcoins-statement-list")) presenceData.state = `Kontoauszüge`, presenceData.buttons = [{label: "Forum",url: `https://${forumurl}/forum`}]
            if(document.URL.includes("acp")) presenceData.state = `Administrationsoberfläche`, presenceData.buttons = [{label: "Forum",url: `https://${forumurl}/forum`}]
            if(document.URL.includes("moderation-list")) presenceData.state = `Moderation`, presenceData.buttons = [{label: "Forum",url: `https://${forumurl}/forum`}]
        }
        if (getUrl(`${panelurl}`)) {
            presenceData.smallImageText = "Webinterface";
            presenceData.smallImageKey = "wi-normal";
            presenceData.details = "Serverliste";
            
            if (getPath("")) presenceData.details = "Serverliste";
            if (getPath("/")) presenceData.details = "Serverliste";
            if (getPath("/auth/login")) presenceData.details = "Panel-Login";
            if (getPath("/auth/password")) presenceData.details = "Hat sein Passwort vergessen...";
            if (getPath("/account")) presenceData.details = "Schaut seinen Panel Account an";
            if (getPath("/account/api")) presenceData.details = "Schaut seine API-Keys an";
            if (getPath("/staff")) presenceData.details = "Stellt eine Zugriffsanfrage"

            if (getUrl(`${panelserverurl}`)) {

                presenceData.state = `${document.querySelector("title").textContent.split(' |')[0]}`

                if (getPathServer(``)) presenceData.details = "Server-Konsole"
                if (getPathServer(`/files`)) presenceData.details = "Ist im Dateimanager"
                if (getPathServer(`/databases`)) presenceData.details = "Brarbeitet Datenbanken"
                if (getPathServer(`/schedules`)) presenceData.details = "Verwaltet Aufgaben"
                if (getPathServer(`/user`)) presenceData.details = "Verwaltet Subuser"
                if (getPathServer(`/backups`)) presenceData.details = "Verwaltet Backups"
                if (getPathServer(`/network`)) presenceData.details = "Verwaltet IPs und Ports"
                if (getPathServer(`/startup`)) presenceData.details = "Verwaltet Startparameter"
                if (getPathServer(`/subdomain`)) presenceData.details = "Verwaltet Subdomains"
                if (getPathServer(`/staff`)) presenceData.details = "Verwaltet Zugriffsanfragen"
                if (getPathServer(`/settings`)) presenceData.details = "Server Einstellungen"
            }

            if (getPath("/admin")) presenceData.details = "Admininterface", delete presenceData.state;
            if (document.querySelector("title").textContent.toLowerCase() === "forbidden") presenceData.details = "Wünscht sich cool zu sein!", delete presenceData.state;
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
                    url: `${document.URL}`
                }
            ]
            if(document.URL.includes("conversation")) presenceData.state = `Ließt eine Konversationen`
            if(document.URL.includes("global-jcoins-statement-list")) presenceData.state = `Kontoauszüge`
            if(document.URL.includes("acp")) presenceData.state = `Administrationsoberfläche`
            if(document.URL.includes("moderation-list")) presenceData.state = `Moderation`
        }else {
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
    }
    else {
        presence.setActivity(presenceData);
    }

})

function getUrl(url: any) {
    return window.location.href.toLowerCase().includes(`${url}`)
}

function getPath(path: any) {
    return window.location.pathname.toLowerCase().includes(`${path}`)
}

function getPathServer(path: any) {
    const complete_server_url = window.location.href.toLocaleLowerCase().toString()
    const server_url = complete_server_url.replace(`${panelserverurl}`, "")
    return server_url.toLowerCase().includes(`${path}`)
}
