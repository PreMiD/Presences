var presence = new Presence({
    clientId: "739073720085118976"
}),

strings = presence.getStrings({});
var startAt = Date.now();
const supportedLogos = [
    "monde", "societe", "lincorrect",
    "economie", "culture", "histoire",
    "politique"
];

presence.on("UpdateData", async () => {

    var data = document.URL.split("/");
    var type = null;

    for (let index = 0; index < data.length; index++) {
        if (supportedLogos.indexOf(data[index]) >= 0) {
            type = data[index];
            break;
        }
    }

    var title = document.getElementsByTagName('title')[0].innerText.split('|')[0];

    if (title == "") title = "page d'accueil";

    var presenceData = { 
        largeImageKey: "logo",
        smallImageKey: "journal",
        smallImageText: "browsing",
        details: title,
        startTimestamp: startAt,
    };

    if (type != null) {
        presenceData.smallImageKey = type;
        presenceData.smallImageText = 
            (type == "societe") ? "société" : 
            (type == "lincorrect") ? "l'incorrect" : 
            (type == "economie") ? "économie" : type;
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});