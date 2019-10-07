var presence = new Presence({
    clientId: "630783537221468182",
    mediaKeys: false
});

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "slitherlogo"
    };
    if(document.querySelector("[style=\"opacity: .8; font-weight: bold;\"]")) {
    let length=document.querySelector("[style=\"opacity: .8; font-weight: bold;\"]").innerHTML
    let rank= document.querySelector("[style=\"opacity: .35;\"]").innerHTML
presenceData.details="Length: "+length;
presenceData.state= "Rank: " +rank;
    }
    presence.setActivity(presenceData);
});
