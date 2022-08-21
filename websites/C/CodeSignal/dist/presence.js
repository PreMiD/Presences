const presence = new Presence({
    clientId: "1010864786910740570"
}), timeElapsed = Date.now();
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "https://ibb.co/1LTqwBj",
        details: document.title,
        startTimestamp: timeElapsed,
    };
    switch (document.location.hostname) {
        case "app.codesignal.com": {
            if (document.location.pathname === "/") {
                presenceData.details = "Viewing home page";
            }
            else if (document.location.pathname.includes("/profile")) {
                presenceData.details = "Viewing profile";
            }
            else if (document.location.pathname.includes("/test-center")) {
                presenceData.details = "Test center";
            }
            else if (document.location.pathname.includes("/standardized-test")) {
                presenceData.details = "Coding assessment";
            }
            else if (document.location.pathname.includes("/arcade")) {
                presenceData.details = "Arcade";
            }
            else if (document.location.pathname.includes("/interview-practice")) {
                presenceData.details = "Interview practice";
            }
            else if (document.location.pathname.includes("/interview-practice")) {
                presenceData.details = "Viewing leaderboard";
            }
            else if (document.location.pathname.includes("/company-challenges")) {
                presenceData.details = "Company coding challenge";
            }
            else if (document.location.pathname.includes("/challenges")) {
                presenceData.details = "Coding challenge";
            }
            else if (document.location.pathname.includes("/badges")) {
                presenceData.details = "Viewing badges";
            }
            else if (document.location.pathname.includes("/coding-report")) {
                presenceData.details = "Viewing coding report";
            }
            break;
        }
    }
    if (presenceData.details)
        presence.setActivity(presenceData);
    else
        presence.setActivity();
});
