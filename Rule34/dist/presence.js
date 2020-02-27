var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "619967690056007699",
    mediaKeys: false
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var urlParams = new URLSearchParams(window.location.search);
    if (document.location.href.includes("rule34.xxx")) {
        if(document.location.pathname == "/") {
            var presenceData = {
                details: "Viewing the homepage...",
                largeImageKey: "lg-r34"
            };
            presence.setActivity(presenceData);
        } else if(urlParams.get("page") && urlParams.get("s") && urlParams.get("page") == "post") {
            if(urlParams.get("s") == "list") {
                if(urlParams.get("tags")) {
                    var presenceData = {
                        details: "Searching...",
                        state: urlParams.get("tags").replace(" ", ", "),
                        largeImageKey: "lg-r34"
                    };
                    presence.setActivity(presenceData);
                } else {
                    var presenceData = {
                        details: "Viewing Posts List...",
                        largeImageKey: "lg-r34"
                    };
                    presence.setActivity(presenceData);
                }
            } else if(urlParams.get("s") == "view" && urlParams.get("id")) {
                var presenceData = {
                    details: "Viewing a Post...",
                    state: "Post " + urlParams.get("id"),
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(presenceData);
            } else {
                var presenceData = {
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(presenceData);
            }
        } else {
            var presenceData = {
                largeImageKey: "lg-r34"
            };
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.href.includes("rule34.paheal.net")) {
        var path = document.location.pathname.split("/");
        if(document.location.pathname == "/") {
            var presenceData = {
                details: "Viewing the homepage...",
                largeImageKey: "lg-r34"
            };
            presence.setActivity(presenceData);
        } else if(path[1] == "post") {
            if(path[2] == "list" && path.length == 3) {
                var presenceData = {
                    details: "Viewing Posts List...",
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(presenceData);
            } else if(path[2] == "list" && path.length > 3) {
                var presenceData = {
                    details: "Searching...",
                    state: path[3].replace("%20", ", ").replace("%21", "!"),
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(presenceData);
            } else if(path[2] == "view") {
                var presenceData = {
                    details: "Viewing a post...",
                    state: "Post " + path[3],
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(presenceData);
            } else {
                var presenceData = {
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(presenceData);
            }
        } else {
            var presenceData = {
                largeImageKey: "lg-r34"
            };
            presence.setActivity(presenceData);
        }
    }
}));
