const presenceClient = new Presence({
    clientId: "836680940301844531"
});

presenceClient.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "logo"
    };
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    const pathName: string = window.location.pathname,
          hostName: string = window.location.hostname,
          buttonValue = await presenceClient.getSetting("buttonsData"),
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
    if (hostName.toLowerCase() === "www.discord.style") {
        presenceData.details = "Viewing page:";
        if (pathName.toLowerCase() === "/") {
            presenceData.state = "Homepage";
            if (buttonValue) {
                presenceData.buttons = getButton("View page", `https://www.discord.style${pathName}`);
            }
        } else if (pathName.startsWith("/browse")) {
            presenceData.state = "Browse templates";
            if (buttonValue) {
                presenceData.buttons = getButton("View page", `https://www.discord.style${pathName}`);
            }
        } else if (pathName.startsWith("/latest")) {
            presenceData.state = "Latest templates";
            if (buttonValue) {
                presenceData.buttons = getButton("View page", `https://www.discord.style${pathName}`);
            }
        } else if (pathName.startsWith("/bot")) {
            presenceData.state = "dsc.st bot";
            if (buttonValue) {
                presenceData.buttons = getButton("View page", `https://www.discord.style${pathName}`);
            }
        } else if (pathName.startsWith("/new")) {
            presenceData.state = "Add new template";
            if (buttonValue) {
                presenceData.buttons = getButton("View page", `https://www.discord.style${pathName}`);
            }
        } else if (pathName.startsWith("/template")) {
            presenceData.details = "Viewing template:";
            presenceData.state = document.querySelectorAll("h1")[1].innerHTML.trim() || document.querySelector("head > title").innerHTML.split("by")[0].trim();
            if (buttonValue) {
                presenceData.buttons = getButton("View template", `https://www.discord.style${pathName}`);
            }
        } else if (pathName.startsWith("/user")) {
            presenceData.details = "Viewing user profile:";
            presenceData.state = document.querySelectorAll("h1")[1].innerHTML.trim() + document.querySelector("h5").innerHTML.trim();
            if (buttonValue) {
                presenceData.buttons = getButton("View user profile", `https://www.discord.style${pathName}`);
            }
        } else if (pathName.startsWith("/results")) {
            presenceData.details = "Viewing:";
            presenceData.state = "Results " + document.querySelector("h2").innerText.split("results")[1].replace(/"/g, "").trim();
        }
    }
    if (presenceData.state == null) {
        presenceClient.setTrayTitle();
    } else {
        presenceClient.setActivity(presenceData);
    }
});