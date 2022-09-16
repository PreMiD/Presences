const presence = new Presence({
    clientId: "1018020550095945828"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
presence.on("UpdateData", async () => {
    let Linkk = window.location.pathname.substring(1), Splitted = Linkk.split("/"), SubComms = {
        ["half-life"]: "Half-Life",
        ["portal"]: "Portal",
        ["tf2"]: "Team Fortess 2",
        ["valve"]: "Valve",
        ["lambdageneration"]: "LambdaGeneration",
        ["black-mesa"]: "Black Mesa",
        ["sfm"]: "Source Film Maker",
        ["sven-co-op"]: "Sven Co-op",
        ["gmod"]: "Garry's Mod",
        ["csgo"]: "CS:GO",
        ["l4d"]: "Left 4 Dead"
    }, Pagee = ["Viewing", "trending"];
    switch (Splitted.length) {
        case 1: {
            Pagee[0] += ":";
            if (SubComms[Splitted[0]] != undefined) {
                Pagee[1] += " in " + SubComms[Splitted[0]];
            }
            else if (Splitted[0] != "") {
                Pagee[1] = Splitted[0];
            }
            break;
        }
        case 2:
        case 3: {
            if (Splitted[0] == "user") {
                Pagee[0] = "Viewing user:";
                Pagee[1] = document.getElementsByClassName("PROFILE_NAME Title")[0].innerHTML;
                break;
            }
            else if (Splitted[1] == "post") {
                Pagee[0] = "Viewing post by:";
                Pagee[1] = document.getElementsByClassName("TEXT_CLIP POST_DISPLAY_NAME AuthorName")[0].innerHTML;
                break;
            }
            else if (Splitted[0] == "search") {
                Pagee[0] = "Searching for";
                if (Splitted[2] == "users") {
                    Pagee[0] += " user";
                }
                Pagee[0] += ":";
                Pagee[1] = document.getElementsByClassName("Title")[0].innerHTML;
                break;
            }
            else if (Splitted[0].includes("image") || Splitted[0].includes("video") || Splitted[1].includes("img")) {
                Pagee[0] += " directly:";
                Pagee[1] = "media";
                break;
            }
            else if (SubComms[Splitted[0]] != undefined) {
                Pagee[0] += ":";
                if (Splitted[2] == undefined || Splitted[2] == "" || Splitted[2] == Splitted[1].substring(0, 3)) {
                    Pagee[1] = Splitted[1] + " in " + SubComms[Splitted[0]];
                }
                else {
                    Pagee[1] = Splitted[2] + " " + Splitted[1] + " in " + SubComms[Splitted[0]];
                }
                break;
            }
            Pagee[0] += ":";
            Pagee[1] = Splitted[0];
            break;
        }
    }
    const presenceData = {
        largeImageKey: "lambda",
        details: Pagee[0],
        state: Pagee[1]
    };
    if (presenceData.details)
        presence.setActivity(presenceData);
    else
        presence.setActivity();
});
