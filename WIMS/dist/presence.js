var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
if (document.getElementsByTagName("frame")[1]) {
    if (document.baseURI != document.getElementsByTagName("frame")[1].src) {
        window.location.replace(document.getElementsByTagName("frame")[1].src);
    }
}
var presence = new Presence({
    clientId: "556828545469513730",
    mediaKeys: false
});
if (document.baseURI.match(/module=adm/) && document.baseURI.match(/(type=|classes)/) || (document.getElementsByClassName("menuitem")[1]).innerText == "") {
    var loggedout = true;
}
if (!loggedout) {
    var Classname = "";
    Worksheet = "...";
    if (document.querySelector(".wims_subclasses")) {
        var Classname = document.querySelector(".wimscenter").innerText.split("\n")[1] + " ";
    }
    else if (document.querySelectorAll("td.small")[1]) {
        var Classname = (document.querySelectorAll("td.small")[1].innerText.split(" ")[0]) + " ";
    }
    else
        var Classname = document.querySelector(".wimscenter").innerText.split("\n")[0] + " ";
    if (document.baseURI.match(/sh=/)) {
        var WSNo = ((document.baseURI.match(/sh=(.?.?)/))[1]).replace(/&|#/g, "");
        var Worksheet = " - " + (document.getElementsByClassName("text_item ")[1].innerHTML) + "" + WSNo;
        var Exercise = "...";
    }
    else if (document.baseURI.match(/(worksheet=|reply)/)) {
        var WSNo = ((document.querySelector(".sheet").href.match(/sh=(.?.?)/))[1]).replace(/&|#/g, "");
        var Worksheet = " - " + document.querySelector(".sheet").innerText + " " + WSNo;
        var Classname = (document.querySelectorAll("td.small")[2].innerText.split(" ")[0]) + " ";
        if (document.querySelector(".main_body .titre")) {
            if (document.querySelector(".main_body .titre") && document.getElementsByTagName("kbd")[1] && !document.querySelector(".answer")) {
                var EXNo = document.getElementsByTagName("kbd")[1].innerText.match(/\d+/)[0];
                var Exercise = document.querySelector(".main_body .titre").innerText + " - " + EXNo;
            }
            else
                var Exercise = document.querySelector(".main_body .titre").innerText;
        }
        if (document.querySelector(".oeftitle")) {
            if (document.querySelector(".oeftitle") && document.getElementsByTagName("kbd")[1] && !document.querySelector(".oefanswer")) {
                var EXNo = document.getElementsByTagName("kbd")[1].innerText.match(/\d+/)[0];
                var Exercise = document.querySelector(".oeftitle").innerText + " - " + EXNo;
            }
            else
                var Exercise = document.querySelector(".oeftitle").innerText;
        }
        if (EXNo > "1") {
            var timestamp = parseInt(sessionStorage.getItem("TimeStampStorage"));
        }
        else if (document.querySelector(".answer") || document.querySelector(".oefanswer")) {
            var timestamp = 0;
        }
        else
            var timestamp = Date.now();
    }
}
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        details: Classname + Worksheet,
        state: Exercise,
        startTimestamp: timestamp,
        largeImageKey: "wims_lg"
    };
    if (loggedout) {
        presence.setActivity();
    }
    else
        presence.setActivity(presenceData);
    if (EXNo != undefined) {
        sessionStorage.setItem("TimeStampStorage", timestamp.toString());
    }
}));
