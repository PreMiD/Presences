var presence = new Presence({
    clientId: "752151960743837817" //The client ID of the Application created at https://discordapp.com/developers/applications
});
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
        console.log(document.location.pathname, presenceData)
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});