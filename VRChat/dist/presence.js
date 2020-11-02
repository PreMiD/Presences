const presence = new Presence({
    clientId: "772597423188082729"
});
var profile, title, message;
var browsingStamp = Math.floor(Date.now() / 1000);
function getUserName() {
    var tempusername = document.querySelector(".user-info > h6");
    if (tempusername !== null) {
        profile = tempusername.textContent;
    }
}
async function getProfileDetails() {
    const presenceData = {
        largeImageKey: "logo"
    };
    const privacymode = await presence.getSetting("privacy");
    const timertoggle = await presence.getSetting("timer");
    if (timertoggle) {
        presenceData.startTimestamp = browsingStamp;
    }
    var btnfriendcheck = document.querySelector("div.w-100.btn-group-lg.btn-group-vertical > button.btn.btn-primary").textContent;
    var viewingprofilename = document.querySelector("div.col-md-12 > h2").textContent;
    if (privacymode === false) {
        if (btnfriendcheck.includes("Unfriend")) {
            presenceData.details = "Viewing Friend:";
            presenceData.state = viewingprofilename;
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Viewing User:";
            presenceData.state = viewingprofilename;
            presence.setActivity(presenceData);
        }
    }
    else {
        presenceData.details = "Viewing User";
        presence.setActivity(presenceData);
    }
}
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    const privacymode = await presence.getSetting("privacy");
    const timertoggle = await presence.getSetting("timer");
    if (timertoggle) {
        presenceData.startTimestamp = browsingStamp;
    }
    if (document.location.hostname == "hello.vrchat.com") {
        if (document.location.pathname == "/") {
            presenceData.details = "Landing Page:";
            presenceData.state = "Main Page";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/community-guidelines") {
            presenceData.details = "Landing Page:";
            presenceData.state = "Community Guidelines";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/events") {
            presenceData.details = "Landing Page:";
            presenceData.state = "Events Calendar";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/legal") {
            presenceData.details = "Landing Page:";
            presenceData.state = "EULA";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/privacy") {
            presenceData.details = "Landing Page:";
            presenceData.state = "Privacy Policy";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/community-faq") {
            presenceData.details = "Landing Page:";
            presenceData.state = "Community FAQ";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/developer-faq") {
            presenceData.details = "Landing Page:";
            presenceData.state = "Developer FAQ";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/careers") {
            presenceData.details = "Landing Page:";
            presenceData.state = "Careers";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/press") {
            presenceData.details = "Landing Page:";
            presenceData.state = "Press";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/contact") {
            presenceData.details = "Landing Page:";
            presenceData.state = "Contact";
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "vrchat.com") {
        if (privacymode === false) {
            getUserName();
            presenceData.state = "User: " + profile;
        }
        if (document.location.pathname.includes("/home")) {
            if (document.location.pathname.includes("/worlds")) {
                presenceData.details = "Browsing Worlds";
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/world")) {
                var worldname = document.querySelector(".col-md-12 > h3").textContent;
                presenceData.details = "Viewing World:";
                if (privacymode === false) {
                    presenceData.state = worldname;
                }
                else {
                    presenceData.details = "Viewing a world";
                }
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/avatars")) {
                presenceData.details = "Browsing Avatars";
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/messages")) {
                presenceData.details = "Viewing Messages";
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/user")) {
                getProfileDetails();
            }
            else if (document.location.pathname.includes("/profile")) {
                presenceData.details = "Viewing Profile";
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/search")) {
                var searchresult = window.location.toString().substr(window.location.toString().lastIndexOf('/') + 1);
                presenceData.details = "Searching:";
                presenceData.state = searchresult;
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/avatar")) {
                var avatarname = document.querySelector("div.col-12 > h3").textContent;
                var avatarpublicstatus = document.querySelector("div.col-12.col-md-8 > h4 > span > small").textContent;
                presenceData.details = "Viewing Avatar:";
                if (privacymode === false) {
                    presenceData.state = avatarname + " " + avatarpublicstatus;
                }
                else {
                    presenceData.details = "Viewing an avatar";
                }
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/playermoderations")) {
                presenceData.details = "Viewing Blocks & Mutes";
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/accountlink")) {
                presenceData.details = "Merging Account";
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/download")) {
                presenceData.details = "Download Page";
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/login")) {
                presenceData.state = "Logging in";
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/register")) {
                presenceData.state = "Creating an account";
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/password")) {
                presenceData.state = "Resetting Password";
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/twofactorauth")) {
                presenceData.state = "Awaiting Authentication";
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Home Page";
                presence.setActivity(presenceData);
            }
        }
    }
});
