const presence = new Presence({
    clientId: "716334859039277087"
});

presence.on("UpdateData", async() => {
    let presenceData = {
        largeImageKey: "logo"
    }

    if(document.location.pathname.includes("/permissions.html")) {
        presenceData.details = "Discord Permissions Calculator";
    }

    let route = document.location.hash.split("/permissions.html");

    if(route[0]) {
        presenceData.details = "Settings the permissions of her bot.";
        presenceData.state = `Permissions : ${route[1] ? document.querySelector("div.result > p > span.permissions > code#number").textContent : 0}`;
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
})
