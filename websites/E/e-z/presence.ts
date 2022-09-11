const presence = new Presence({
    clientId: "1018191690210754693"
})

presence.on("UpdateData", async () => {
    console.log(document.location.hostname, document.location.pathname)

    const presenceData: PresenceData = {
        largeImageKey: "https://cdn.e-z.host/e-zimagehosting/ez256.png",
    };

    switch (true) {
        case document.location.hostname == "e-z.host":
            presenceData.buttons = [
                {
                    label: "e-z.host",
                    url: "https://e-z.host",
                },
            ];
            let username = document.querySelector("p[id=premid-username]")?.textContent
            let uid = document.querySelector("p[id=premid-uid]")?.textContent
            if (typeof username !== 'undefined' && typeof uid !== 'undefined') {
                presenceData.details = `Username: ${username} | ${uid}`
            } else {
                presenceData.details = "Not logged in"
            }
            switch (document.location.pathname) {
                case "/":
                    presenceData.state = "Viewing the home page"
                    break;
                case "/dash":
                    presenceData.state = "Viewing the dashboard"
                    break;

                case "/dash/domains":
                    presenceData.state = "Exploring the domains"
                    break;

                case "/dash/settings":
                    presenceData.state = "Changing their settings"
                    break;

                case "/dash/gallery":
                    presenceData.state = "Viewing their gallery"
                    break;

                case "/dash/leaderboard":
                    presenceData.state = "Viewing the overall leaderboard"
                    break;

                case "/dash/leaderboard/daily":
                    presenceData.state = "Viewing the daily leaderboard"
                    break;

                case "/dash/leaderboard/weekly":
                    presenceData.state = "Viewing the weekly leaderboard"
                    break;

                case "/dash/upload":
                    presenceData.state = "Uploading a file"
                    break;

                case "/dash/shorten":
                    presenceData.state = "Shortening a url"
                    break;

                case "/dash/pastes":
                    presenceData.state = "Creating a paste"
                    break;

                case "/dash/editor":
                    presenceData.state = "Editing their bio page"
                    break;

                case "/dash/account":
                    presenceData.state = "Viewing their account page"
                    break;
            }
            if (!presenceData.state) {
                if (document.location.pathname.includes("/u/")) {
                    let page_username = document.querySelector("#premid-pageusername")?.textContent
                    presenceData.state = `Viewing ${page_username}'s user page`
                } else {
                    presenceData.state = "Page not found"
                }
            }
            break;

        case document.location.hostname == "e-z.bio":
            if (document.location.pathname == "/") {
                presenceData.details = "e-z.bio front page"
                presenceData.buttons = [
                    {
                        label: "e-z.bio",
                        url: "https://e-z.bio",
                    },
                ];
            } else {
                presenceData.details = `Viewing ${document.location.pathname.replace("/", "")}'s bio page`
                presenceData.buttons = [
                    {
                        label: "e-z.bio",
                        url: "https://e-z.bio",
                    },
                    {
                        label: "View Page",
                        url: `https://e-z.bio${document.location.pathname}`,
                    },
                ];
            }
            break;
    }

    if (presenceData.details) presence.setActivity(presenceData);
    else presence.setActivity();
});