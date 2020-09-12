let presence = new Presence({
    clientId: "754070047193956492", //The client ID of the Application created at https://discordapp.com/developers/applications
});

let browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "dmoj",
    };

    if (document.location.pathname == "/") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing home page";
    } else if (document.location.pathname.includes("/problems")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing problems";
    } else if (
        document.location.pathname.includes("/problem/") &&
        document.location.pathname.includes("/submit")
    ) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Submitting to problem:";
        presenceData.state = document.querySelector(
            "body > div > main > h2 > a"
        ).textContent;
    } else if (
        document.location.pathname.includes("/problem/") &&
        document.location.pathname.includes("/submissions")
    ) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing submissions to problem:";
        presenceData.state = document.querySelectorAll(
            "body > div > main > div > div > h2 > a"
        )[-1].textContent;
    } else if (
        document.location.pathname.includes("/problem/") &&
        document.location.pathname.includes("/rank")
    ) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing best submissions to problem:";
        presenceData.state = document.querySelector(
            "body > div > main > div > div > h2 > a"
        ).textContent;
    } else if (
        document.location.pathname.includes("/problem/") &&
        document.location.pathname.includes("/tickets/new")
    ) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Reporting issue for problem:";
        presenceData.state = document.querySelector(
            "body > div > main > h2 > a"
        ).textContent;
    } else if (document.location.pathname.includes("/problem/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing problem:";
        presenceData.state = document.querySelector(
            "body > div > main > div > h2"
        ).textContent;
    } else if (document.location.pathname.includes("/submissions/user")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing submissions by user:";
        if (
            document.querySelector("body > div > main > div > div > h2")
                .textContent != "All my submissions"
        ) {
            presenceData.state = document.querySelector(
                "body > div > main > div > div > h2 > a"
            ).textContent;
        } else {
            presenceData.state = document.querySelector(
                "body > nav > div > span > ul > li > a > span > span > b"
            ).textContent;
        }
    } else if (document.location.pathname.includes("/submissions")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing submissions";
    } else if (document.location.pathname.includes("/submission/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = `Viewing submission of problem: ${
            document.querySelector("body > div > main > h2 > a").textContent
        }`;
        presenceData.state = `By user: ${
            document.querySelectorAll("body > div > main > h2 > a")[1]
                .textContent
        }`;
    } else if (document.location.pathname.includes("/src/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = `Viewing submission source of problem: ${
            document.querySelector("body > div > main > h2 > a").textContent
        }`;
        presenceData.state = `By user: ${
            document.querySelectorAll("body > div > main > h2 > a")[1]
                .textContent
        }`;
    } else if (document.location.pathname.includes("/users")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing leaderboard";
    } else if (
        document.location.pathname.includes("/user/") &&
        document.location.pathname.includes("/solved")
    ) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing problems solved by user:";
        if (document.querySelector(".tabs > h2").textContent != "My account") {
            presenceData.state = document
                .querySelector(".tabs > h2")
                .textContent.split(" ")[1];
        } else {
            presenceData.state = document.querySelector(
                "body > nav > div > span > ul > li > a > span > span > b"
            ).textContent;
        }
    } else if (document.location.pathname.includes("/user/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing user:";
        if (document.querySelector(".tabs > h2").textContent != "My account") {
            presenceData.state = document
                .querySelector(".tabs > h2")
                .textContent.split(" ")[1];
        } else {
            presenceData.state = document.querySelector(
                "body > nav > div > span > ul > li > a > span > span > b"
            ).textContent;
        }
    } else if (document.location.pathname.includes("/edit/profile")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Editing profile";
    } else if (document.location.pathname.includes("/organizations")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing organizations";
    } else if (document.location.pathname.includes("/organization/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing organization:";
        presenceData.state = document.querySelector(
            "body > div > main > h2"
        ).textContent;
    } else if (document.location.pathname.includes("/contests")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing contests";
    } else if (
        document.location.pathname.includes("/contest/") &&
        document.location.pathname.includes("/stats")
    ) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing statistics of contest:";
        presenceData.state = document.querySelector(".tabs > h2").textContent;
    } else if (
        document.location.pathname.includes("/contest/") &&
        document.location.pathname.includes("/ranking")
    ) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing rankings of contest:";
        presenceData.state = document.querySelector(".tabs > h2").textContent;
    } else if (
        document.location.pathname.includes("/contest/") &&
        document.location.pathname.includes("/participations")
    ) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing participation of contest:";
        presenceData.state = document.querySelector(".tabs > h2").textContent;
    } else if (document.location.pathname.includes("/contest/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing contest:";
        presenceData.state = document.querySelector(".tabs > h2").textContent;
    } else if (document.location.pathname.includes("/about")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing about page";
    } else if (document.location.pathname.includes("/status")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing status";
    } else if (document.location.pathname.includes("/runtimes/matrix/")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing version matrix";
    } else if (document.location.pathname.includes("/runtimes")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing runtimes";
    } else if (document.location.pathname.includes("/tips")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing tips";
    } else if (document.location.pathname.includes("/api")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing API";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});
