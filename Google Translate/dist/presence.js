var presence = new Presence({
    clientId: "630825100387549210",
    mediaKeys: false
});


var browsingStamp = Math.floor(Date.now()/1000);
presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "translatelogo"
    };
    let type = document.location.hash.split("&")[1];
    let from = document.location.hash.split("&")[2].replace("sl=", "");
    let to = document.location.hash.split("&")[3].replace("tl=", "");
    let fromt;
    let tot;
    let typet;
    if(type.replace("op=", "") === "translate") {typet="Text"}
    if(type.replace("op=", "") === "docs") {typet="Documents"}
    if(from === "auto") {fromt = "Detecting"}
    if(from === "en") {fromt = "English"}
    if(to === "en") {tot = "English"}
    if(from === "es") {fromt = "Spanish"}
    if(to === "es") {tot = "Spanish"}
    if(from === "fr") {fromt = "French"}
    if(to === "fr") {tot = "French"}
    if(from === "ar") {fromt = "Arabic"}
    if(to === "ar") {tot = "Arabic"}
    if(from === "af") {fromt = "Afrikaans"}
    if(to === "af") {tot = "Afrikaans"}
    if(from === "sq") {fromt = "Albanian"}
    if(to === "sq") {tot = "Albanian"}
    if(from === "am") {fromt = "Amharic"}
    if(to === "am") {tot = "Amharic"}
    if(from === "hy") {fromt = "Armenian"}
    if(to === "hy") {tot = "Armenian"}
    if(from === "az") {fromt = "Azerbaijani"}
    if(to === "az") {tot = "Azerbaijani"}
    if(from === "eu") {fromt = "Basque"}
    if(to === "eu") {tot = "Basque"}
    if(from === "be") {fromt = "Belarussian"}
    if(to === "be") {tot = "Belarussian"}
    if(from === "bn") {fromt = "Bengali"}
    if(to === "bn") {tot = "Bengali"}
    if(from === "bs") {fromt = "Bosnian"}
    if(to === "bs") {tot = "Bosnian"}
    if(from === "bg") {fromt = "Bulgarian"}
    if(to === "bg") {tot = "Bulgarian"}
    if(from === "cl") {fromt = "Catalan"}
    if(to === "cl") {tot = "Catalan"}
    if(from === "ceb") {fromt = "Cebuano"}
    if(to === "ceb") {tot = "Cebuano"}
    if(from === "ny") {fromt = "Chichewa"}
    if(to === "ny") {tot = "Chichewa"}
    if(from === "zh") {fromt = "Chinese"}
    if(to === "zh") {tot = "Chinese"}
    if(from === "co") {fromt = "Corsican"}
    if(to === "co") {tot = "Corsican"}
    if(from === "sl") {fromt = "Croatin"}
    if(to === "sl") {tot = "Croatin"}
    if(from === "cs") {fromt = "Czech"}
    if(to === "cs") {tot = "Czech"}
    if(from === "da") {fromt = "Danish"}
    if(to === "da") {tot = "Danish"}
    if(from === "nl") {fromt = "Dutch"}
    if(to === "nl") {tot = "Dutch"}
    if(from === "eo") {fromt = "Esperanto"}
    if(to === "eo") {tot = "Esperanto"}
    if(from === "et") {fromt = "Estonian"}
    if(to === "et") {tot = "Estonian"}
    if(from === "tl") {fromt = "Filipino"}
    if(to === "tl") {tot = "Filipino"}
    if(from === "fi") {fromt = "Finnish"}
    if(to === "fi") {tot = "Finnish"}
    if(from === "fr") {fromt = "French"}
    if(to === "fr") {tot = "French"}
    if(from === "fy") {fromt = "Frisian"}
    if(to === "fy") {tot = "Frisian"}

// Will add the rest at some point hehehehe


    
    if(fromt === undefined) {fromt = from}
    if(tot === undefined) {tot = to}
    presenceData.details=`Translating: ${typet}`
    presenceData.state=`From: ${fromt} - To: ${tot}`



    presence.setActivity(presenceData);

});
