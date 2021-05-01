const presenceClient = new Presence({
    clientId: "836680940301844531"
});

presenceClient.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "logo",
        startTimestamp: Math.floor(Date.now() / 1000)
    },
    pathName: string = window.location.pathname,
    getButton = (labelData: string, urlData: string) => {
        let resultButton;
        if (labelData && urlData) {
            resultButton = [
                {
                    label: labelData,
                    url: urlData
                }
            ];
        }
        return resultButton;
    };
    presenceData.details = "Viewing page:";
    if (pathName.toLowerCase() === "/") {
        presenceData.state = "Homepage";
    } else if (pathName.startsWith("/browse")) {
        presenceData.state = "Browse templates";
        presenceData.buttons = getButton("View page", `https://www.discord.style${pathName}`);
    } else if (pathName.startsWith("/latest")) {
        presenceData.state = "Latest templates";
        presenceData.buttons = getButton("View page", `https://www.discord.style${pathName}`);
    } else if (pathName.startsWith("/bot")) {
        presenceData.state = "dsc.st bot";
        presenceData.buttons = getButton("View page", `https://www.discord.style${pathName}`);
    } else if (pathName.startsWith("/new")) {
        presenceData.state = "Add new template";
        presenceData.buttons = getButton("View page", `https://www.discord.style${pathName}`);
    } else if (pathName.startsWith("/template")) {
        presenceData.details = "Viewing template:";
        presenceData.state = document.querySelectorAll("h1")[1].innerHTML.trim() || document.querySelector("head > title").innerHTML.split("by")[0].trim();
        presenceData.buttons = getButton("View template", `https://www.discord.style${pathName}`);
    } else if (pathName.startsWith("/user")) {
        presenceData.details = "Viewing user profile:";
        presenceData.state = document.querySelectorAll("h1")[1].innerHTML.trim() + document.querySelector("h5").innerHTML.trim();
        presenceData.buttons = getButton("View user profile", `https://www.discord.style${pathName}`);
    } else if (pathName.startsWith("/results")) {
        presenceData.details = "Viewing:";
        presenceData.state = "Results " + document.querySelector("h2").innerText.split("results")[1].replace(/"/g, "").trim();
    }
    if (presenceData.state == null) {
        presenceClient.setTrayTitle();
    } else {
        presenceClient.setActivity(presenceData);
    }
});