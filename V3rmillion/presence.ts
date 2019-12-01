/* Global variables */
let presence = new Presence({
    clientId: "650569876993343529"
});
var item: any, profile: any, title: any;
var browsingStamp = Math.floor(Date.now() / 1000);
var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";

/* Logging Functions */
function PMD_info(message) {
    console.log(
        "%cPreMiD%cINFO%c " + message,
        genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
        genericStyle + "border-radius: 0 25px 25px 0; background: #5050ff;",
        "color: unset;"
    );
}

function PMD_error(message) {
    console.log(
        "%cPreMiD%cERROR%c " + message,
        genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
        genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;",
        "color: unset;"
    );
}

function PMD_success(message) {
    console.log(
        "%cPreMiD%cSUCCESS%c " + message,
        genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
        genericStyle +
        "border-radius: 0 25px 25px 0; background: #50ff50; color: black;",
        "color: unset;"
    );
}

/* Main eventHandler */
presence.on("UpdateData", async () => {

    let presenceData: presenceData = {
        largeImageKey: "logo-512"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname.includes("v3rmillion.net")) {
        
        /* Home Page */
        if (document.location.pathname.includes("index.php") || document.location.pathname == "/") {
            profile = document.querySelector("#panel strong");
            presenceData.details = "Viewing Homepage";
            presenceData.state = "Logged in as " + profile.innerText;
            presenceData.smallImageKey = "twemoji-house-1024x";
        }

        /* Viewing Thread*/
        else if (document.location.pathname.includes("showthread.php")) {
            title = document.querySelector(".thread_title");
            presenceData.details = "Browsing Thread:";
            presenceData.state = title.innerText;
            presenceData.smallImageKey = "twemoji-paper-1024x";

            /* User is replying to thread using quick-reply box. */
            let textarea = document.querySelector("form #message");
            if (textarea != null && textarea == document.activeElement) {
                presenceData.details = "Replying to Thread:";
                presenceData.state = title.innerText;
                presenceData.smallImageKey = "twemoji-memo-1024x";
                // TODO: ADD PENCIL EMOTE smallImageKey
            }
        }

        /* Viewing subforum */
        else if (document.location.pathname.includes("forumdisplay.php")) {
            title = document.querySelector(".navigation .active");
            presenceData.details = "Viewing Forum:";
            presenceData.state = title.innerText;
            presenceData.smallImageKey = "twemoji-paper-1024x";
        }

        /* User is replying to thread */
        else if (document.location.pathname.includes("newreply.php")) {
            // awful dom selection and text manipulation incoming
            title = document.querySelector("form .smalltext > strong");
            presenceData.details = "Replying to Thread:";
            presenceData.state = title.innerText.substring(title.innerText.indexOf("thread: ") + 8); // Removes "Reply to thread"
            presenceData.smallImageKey = "twemoji-pencil-1024x";
        }

        /* User is viewing profile */
        else if (document.location.pathname.includes("member.php")) {
            profile = document.querySelector(".profile_header strong span");
            presenceData.details = "Viewing Profile:";
            presenceData.state = profile.innerText;
            presenceData.smallImageKey = "twemoji-spy-1024x";
        }

        /* Viewing rules page */
        else if (document.location.pathname == "/siterules.php") {
            presenceData.details = "Viewing Rules";
            delete presenceData.state;
            presenceData.smallImageKey = "twemoji-paper-1024x";
        }

        /* Editing settings */
        else if (document.location.pathname == "/usercp.php") {
            profile = document.querySelector("#panel strong");
            presenceData.details = "User Control Panel";
            presenceData.state = "Logged in as " + profile.innerText;
            presenceData.smallImageKey = "twemoji-cog-1024x";
        }

        /* Searching */
        else if (document.location.pathname.includes("search.php")) {
            profile = document.querySelector("#panel strong");
            presenceData.details = "Searching site";
            presenceData.state = "Logged in as " + profile.innerText;
        }

        /* Other page fallback */
        else if (document.location.pathname.includes("pages.php")) {
            let page = document.URL.substring(document.URL.indexOf(".php") + 10);
            presenceData.details = "Reading page:";
            presenceData.state = page.charAt(0).toUpperCase() + page.substring(1);
            presenceData.smallImageKey = "twemoji-paper-1024x";
        }
    }
    /* Unknown site location */
    if (presenceData.details == null) {
        PMD_error("Unable to determine location.")
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});