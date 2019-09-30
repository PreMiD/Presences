var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new(P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

let presence = new Presence({
        clientId: "628019683718856714"
    });

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let name = document.querySelectorAll("header")[1] ? document.querySelectorAll("header")[1].getElementsByTagName("span")[1].innerText : null,
        typing = document.getElementsByClassName("hnQHL")[1] ? document.getElementsByClassName("hnQHL")[1].firstElementChild.tagName : null,
        textPermission = document.getElementsByClassName("wjdTm")[0] ? true : false;

    if (!name || name === null || name == "") return;
    if (!isNaN(document.querySelectorAll("header")[1].getElementsByTagName("span")[1].innerText.replace("+", "").replace(/ /g, ""))) name = "a private person"; // This will protect you from showing people the unsaved contact's number.

    const data = {
        largeImageKey: "waweb-logo",
        details: `Texting with ${name}`,
        state: `${typing && typing == "BUTTON" ? "Typing..." : `${!typing && !textPermission ? "Can't really type..." : "Just waiting..."}`}`,
        startTimestamp: Math.floor(Date.now() / 1000)
    };

    presence.setActivity(data);
}));