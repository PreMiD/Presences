var presence = new Presence({
    clientId: "653644508507930645",
    mediaKeys: false
});

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "logo-dbl"
    };

    const browsingStamp = Math.floor(Date.now() / 1000);
    if (window.location.pathname.endsWith("bots")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "All bots"
        presenceData.startTimestamp = browsingStamp;
    }
    else if (window.location.pathname.endsWith("contact")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Contact"
        presenceData.startTimestamp = browsingStamp;
    }
    else if (window.location.pathname.endsWith("api-docs")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "API Docs."
        presenceData.startTimestamp = browsingStamp;
    }
    else if (window.location.pathname.startsWith("/bots/")) {
        presenceData.details = "Viewing a bot:";
        presenceData.state = document.querySelector("#main-content > div.container > div.expanded.row.d-none.d-md-flex.d-lg-flex.d-xl-flex > div.col-8 > h1 > strong") ? document.querySelector("#main-content > div.container > div.expanded.row.d-none.d-md-flex.d-lg-flex.d-xl-flex > div.col-8 > h1 > strong").textContent : "Viewing their bot(s)"
        presenceData.startTimestamp = browsingStamp;
    }
    else if (window.location.pathname.includes("/my-bots/add")) {
        presenceData.state = "Adding a new bot"
        presenceData.startTimestamp = browsingStamp;
    }
    else if (window.location.pathname.endsWith("partners")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Partners"
        presenceData.startTimestamp = browsingStamp;
    }
    else if (window.location.pathname.startsWith("/tags/")) {
        presenceData.details = "Viewing a tag:";
        presenceData.state = document.querySelector("#header > h1").textContent
        presenceData.startTimestamp = browsingStamp;
    }
    else if (window.location.pathname.includes("/users/")) {
        presenceData.details = "Viewing a user:";
        presenceData.state = document.querySelector("#main-content > div.container > div.expanded.row.d-none.d-md-flex.d-lg-flex.d-xl-flex > div.col-8 > h1 > strong").textContent + document.querySelector("#main-content > div.container > div.expanded.row.d-none.d-md-flex.d-lg-flex.d-xl-flex > div.col-8 > h1 > span").textContent
        presenceData.startTimestamp = browsingStamp;
    }

    presence.setActivity(presenceData);
});