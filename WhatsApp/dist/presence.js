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
    let name = document.querySelector("#main > header > div._3V5x5 > div._1lpto > div > span"),
        typing = document.querySelector("#main > footer > div._2i7Ej.copyable-area > div:nth-child(3)") ? document.querySelector("#main > footer > div._2i7Ej.copyable-area > div:nth-child(3)").firstChild : null,
        textPermission = document.querySelector("#main > footer > div._2i7Ej.copyable-area > div._13mgZ") ? true : false,
        contactName = null;

    if (!name || name === null || name.innerText == "") return presence.clearActivity();
    if (isNaN(name.innerText.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, ""))) contactName = name.innerText; // This will protect you from showing people the unsaved contact's number.

    const data = {
        largeImageKey: "waweb-logo",
        details: `Texting with ${contactName ? contactName : 'someone'}`,
        state: `${typing && typing.tagName == "BUTTON" ? "Typing..." : `${!typing && !textPermission ? "Can't really type..." : "Just waiting..."}`}`,
        startTimestamp: Math.floor(Date.now() / 1000)
    };

    presence.setActivity(data);
}));