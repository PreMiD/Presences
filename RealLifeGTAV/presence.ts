const presence = new Presence({
    clientId: "760863245224640555"
}), browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", function () {
    const presenceData = {
        largeImageKey: "reallifegtav"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/home")) {
        presenceData.smallImageKey = "viewing";
        presenceData.details = "Viewing the homepage";
    }
	else if (document.location.pathname == "/") {
        presenceData.details = "Viewing the homepage";
    }
    else if (document.location.pathname.includes("/advent")) {
        presenceData.details = "Viewing the adventcalander";
    }
    else if (document.location.pathname.includes("/login")) {
        presenceData.details = "Logging in...";
        presenceData.smallImageKey = "writing";
    }
    else if (document.location.pathname.includes("/register")) {
        presenceData.details = "Registering...";
        presenceData.smallImageKey = "writing";
    }
    else if (document.location.pathname.includes("/dashboard")) {
        presenceData.details = "Viewing own profile";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/faq")) {
        presenceData.details = "Viewing FAQ";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/jobs")) {
        presenceData.details = "Applying for staff...";
        presenceData.smallImageKey = "writing";
    }
    else if (document.location.pathname.includes("/ingame-jobs")) {
        presenceData.details = "Viewing ingame jobs";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/partner")) {
        presenceData.details = "Viewing partner panel";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/luxurycars")) {
        presenceData.details = "Viewing LuxuryCars shop";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/rules")) {
        presenceData.details = "Viewing rules";
        presenceData.smallImageKey = "reading";
    }
    else if (document.location.pathname.includes("/pages")) {
        if (document.location.pathname.includes("/impressum")) {
            presenceData.details = "Viewing imprint";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/datenschutz")) {
            presenceData.details = "Viewing privacy police";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/tos")) {
            presenceData.details = "Viewing TOS";
            presenceData.smallImageKey = "reading";
        }
    }
    else if (document.location.pathname.includes("/forum")) {
        if (document.location.pathname.includes("/index")) {
            presenceData.details = "Viewing categories";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/dashboard")) {
            if (document.location.pathname.includes("/index")) {
                presenceData.details = "Viewing dashboard";
                presenceData.smallImageKey = "reading";
            }
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
