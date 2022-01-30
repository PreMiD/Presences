    const presence = new Presence({
        clientId: "937348068016287814"
    }),
    browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
    const presenceData: PresenceData = {
        largeImageKey: "danbot",
        startTimestamp: browsingTimestamp,
        buttons: [
            {
                    label: "Website",
                    url: "https://panel.danbot.host"
                },
                {
                    label: "Discord",
                    url: "https://discord.gg/dbh"
                }
            ],
    };
    if (document.location.pathname.includes("/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Dashboard";
    }
    if (document.location.pathname.includes("/server")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Server Console";
    }
    if (document.location.pathname.endsWith("/files")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Server Files"
    }
    if (document.location.pathname.endsWith("/databases")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Server Databases";
    }
    if (document.location.pathname.endsWith("/schedules")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Server Schedules";
    }
    if (document.location.pathname.endsWith("/users")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Server Users";
    }
    if (document.location.pathname.endsWith("/backups")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Server Backups";
    }
    if (document.location.pathname.endsWith("/network")) {
        presenceData.details = "Viewing a page";
        presenceData.state = "Server Networks";
    }
    if (document.location.pathname.endsWith("/startup")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Server Startup";
    }
    if (document.location.pathname.endsWith("/settings")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Server Settings";
    }
    if (document.location.pathname.endsWith("/account")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Accounts";
    }
    if (document.location.pathname.endsWith('/api')) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "API Data";
    }
    if (document.location.pathname.endsWith("/auth/login")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Login"
    }
    presence.setActivity(presenceData);
});
