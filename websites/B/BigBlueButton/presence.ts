var presence = new Presence({
    clientId: "768028596035649536" //The client ID of the Application created at https://discordapp.com/developers/applications
}),

    strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
        //You can use this to get translated strings
    });

var roomName: string;
var inCall: boolean;
var userCount: number;
var userState: string;

function getData() {
    if (document.querySelectorAll("h1")[0]) {
        roomName = document.querySelectorAll("h1")[0].textContent;

        userCount = undefined;

        document.querySelectorAll("div").forEach(el => {
            if (el.className.startsWith("userListColumn")) {
                let txt = el.querySelector("h2").textContent;
                let count = txt.split("(")[1].split(")")[0];
                userCount = parseInt(count);
            }
        });

        inCall = userCount !== undefined;
    }
    else {
        roomName = null;
        userCount = 0;
        inCall = false;
    }

    if (inCall) {
        document.querySelectorAll("div").forEach(el => {
            if (el.className.startsWith("notificationsBar")) {
                userState = el.textContent;
                inCall = false;
                return;
            }
        });

        document.querySelectorAll("section").forEach(el => {
            if (el.className.startsWith("actionsbar")) {
                userState =
                el.querySelector('i.icon-bbb-unmute') ? "microphone"
                    : el.querySelector('i.icon-bbb-mute') ? "muted"
                    : el.querySelector('i.icon-bbb-audio_on') ? "headphones"
                    : el.querySelector('i.icon-bbb-listen') ? "headphones"
                    : "disconnected";
            }
        });
    }
    else {
        document.querySelectorAll("div").forEach(el => {
            if (el.className.startsWith("spinner")) {
                userState = "Joining session...";
                return;
            }
        });
        if (document.querySelector("#room_access_code")) {
            userState = "Entering the room passcode";
        }
        else if (document.querySelector(".form-control.join-form")) {
            userState = "Entering the name";
        }
        else if (document.querySelector('.col-3 .loader')) {
            userState = "Waiting for the session to start...";
        }
    }
}

setInterval(getData, 1000);


presence.on("UpdateData", async () => {
    /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.

    It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/

    let userStateText =
        userState == "microphone" ? "Speaking..."
        : userState == "muted" ? "Muted"
        : userState == "headphones" ? "Listening..."
        : "Disconnected";

    var presenceData = {
        largeImageKey: "logo", /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/
        smallImageKey: (inCall ? userState : "logo"), /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/
        smallImageText: (inCall ? userStateText : "No call"), //The text which is displayed when hovering over the small image
        details: (roomName ? roomName : userState), //The upper section of the presence text
        state: (inCall ? `${userCount} users` : roomName ? userState : null), //The lower section of the presence text
        startTimestamp: new Date().getTime() //The unix epoch timestamp for when to start counting from
    };

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});
