const presence = new Presence({
  clientId: "899051140157681726"
}),
browsingStamp = Math.floor(Date.now() / 1000);
const forumurl = "mgservers.de"
const panelurl = "webinterface.mgservers.de"
const panelserverurl = "webinterface.mgservers.de/server/"

presence.on("UpdateData", async () => {
    const privacy = await presence.getSetting("privacy");
    const werbung = await presence.getSetting("werbung");
    const presenceData: PresenceData = {
        details: "Dein Server Hoster",
        largeImageKey: "mgs-normal",
        smallImageKey: "mgs-normal",
        smallImageText: "MGS",
        startTimestamp: browsingStamp,
    };

    if (privacy) {
        if (geturl(`${forumurl}`)) {
            presenceData.details = "Ist im Forum";
            presenceData.smallImageText = "Forum";
            presenceData.smallImageKey = "mgs-normal";
        }
        if (geturl(`${panelurl}`)) {
            presenceData.details = "Ist im Webinterface";
            presenceData.smallImageText = "Webinterface";
            presenceData.smallImageKey = "wi-normal";
        }
    } else {
        if (geturl(`${forumurl}`)) {
            presenceData.details = "Ist im Forum";
            presenceData.smallImageText = "Forum";
            presenceData.smallImageKey = "mgs-normal";
            presenceData.state = `${document.querySelector("title").textContent.split(' - MGServers')[0]}`

            if(document.URL.includes("conversation")) presenceData.state = `Ließt eine Konversationen`, presenceData.buttons = [{label: "Forum",url: `https://${forumurl}/forum`}]
            if(document.URL.includes("global-jcoins-statement-list")) presenceData.state = `Kontoauszüge`, presenceData.buttons = [{label: "Forum",url: `https://${forumurl}/forum`}]
            if(document.URL.includes("acp")) presenceData.state = `Administrationsoberfläche`, presenceData.buttons = [{label: "Forum",url: `https://${forumurl}/forum`}]
            if(document.URL.includes("moderation-list")) presenceData.state = `Moderation`, presenceData.buttons = [{label: "Forum",url: `https://${forumurl}/forum`}]
        }
        if (geturl(`${panelurl}`)) {
            presenceData.smallImageText = "Webinterface";
            presenceData.smallImageKey = "wi-normal";
            presenceData.details = "Serverliste";
            
            if (getpath("")) presenceData.details = "Serverliste";
            if (getpath("/")) presenceData.details = "Serverliste";
            if (getpath("/auth/login")) presenceData.details = "Panel-Login";
            if (getpath("/auth/password")) presenceData.details = "Hat sein Passwort vergessen...";
            if (getpath("/account")) presenceData.details = "Schaut seinen Panel Account an";
            if (getpath("/account/api")) presenceData.details = "Schaut seine API-Keys an";
            if (getpath("/staff")) presenceData.details = "Stellt eine Zugriffsanfrage"

            if (geturl(`${panelserverurl}`)) {

                presenceData.state = `${document.querySelector("title").textContent.split(' |')[0]}`

                if (getpathserver(``)) presenceData.details = "Server-Konsole"
                if (getpathserver(`/files`)) presenceData.details = "Ist im Dateimanager"
                if (getpathserver(`/databases`)) presenceData.details = "Brarbeitet Datenbanken"
                if (getpathserver(`/schedules`)) presenceData.details = "Verwaltet Aufgaben"
                if (getpathserver(`/user`)) presenceData.details = "Verwaltet Subuser"
                if (getpathserver(`/backups`)) presenceData.details = "Verwaltet Backups"
                if (getpathserver(`/network`)) presenceData.details = "Verwaltet IPs und Ports"
                if (getpathserver(`/startup`)) presenceData.details = "Verwaltet Startparameter"
                if (getpathserver(`/subdomain`)) presenceData.details = "Verwaltet Subdomains"
                if (getpathserver(`/staff`)) presenceData.details = "Verwaltet Zugriffsanfragen"
                if (getpathserver(`/settings`)) presenceData.details = "Server Einstellungen"
            }

            if (getpath("/admin")) presenceData.details = "Admininterface", delete presenceData.state;
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

function geturl(url: any) {
    return window.location.href.toLowerCase().includes(`${url}`)
}

function getpath(path: any) {
    return window.location.pathname.toLowerCase().includes(`${path}`)
}

function getpathserver(path: any) {
    const complete_server_url = window.location.href.toLocaleLowerCase().toString()
    const server_url = complete_server_url.replace(`${panelserverurl}`, "")
    return server_url.toLowerCase().includes(`${path}`)
}
