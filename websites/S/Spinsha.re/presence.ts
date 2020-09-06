var presence = new Presence({
    clientId: "752151960743837817" //The client ID of the Application created at https://discordapp.com/developers/applications
});
var browsingStamp = Math.floor(Date.now() / 1000);
/*

function myOutsideHeavyLiftingFunction(){
    //Grab and process all your data here

    // element grabs //
    // api calls //
    // variable sets //
}

setInterval(myOutsideHeavyLiftingFunction, 10000);
//Run the function separate from the UpdateData event every 10 seconds to get and set the variables which UpdateData picks up

*/


presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "bigdefault"
    };
    
    if (document.location.hostname == "spinsha.re") {
        let pathname = document.location.pathname;
        switch (pathname) {
            case "/":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing Frontpage";
                break;
            case "/new":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing New Charts";
                break;
            case "/hot":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing Hot Charts";
                break;
            case "/popular":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing Popular Charts";
                break;
            default:
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Doing... Something?";
                break;
        }
        if (pathname.startsWith("/song")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = document.querySelector(".song-title").innerHTML;
        }
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});