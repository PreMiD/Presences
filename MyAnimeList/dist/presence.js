var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "468420510632509473",
    mediaKeys: false
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == ("/")) {
        let presenceData = {
            details: "Viewing the homepage",
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == ("/anime.php") || document.location.pathname.startsWith("/topanime") || document.location.pathname.startsWith("/watch")) {
        let presenceData = {
            details: "Looking for anime",
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == ("/manga.php") || document.location.pathname.startsWith("/topmanga") || document.location.pathname.startsWith("/store")) {
        let presenceData = {
            details: "Looking for manga",
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/forum")) {
        let presenceData = {
            details: "Viewing the forums",
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/users.php")) {
        let presenceData = {
            details: "Searching for users",
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/profile")) {
        let presenceData = {
            details: "Viewing a profile",
            state: document.location.pathname.split("/")[2],
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/animelist")) {
        let presenceData = {
            details: "Viewing an anime list",
            state: document.location.pathname.split("/")[2],
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/mangalist")) {
        let presenceData = {
            details: "Viewing a manga list",
            state: document.location.pathname.split("/")[2],
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.startsWith("/anime")) {
        if (document.getElementsByClassName("js-anime-edit-info-button")[0]) {
            let presenceData = {
                details: "Viewing an anime",
                state: document.getElementsByClassName("header-right")[0].parentNode.childNodes[1].textContent,
                largeImageKey: "lg-mal"
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: "Looking for anime",
                largeImageKey: "lg-mal"
            };
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname.startsWith("/manga")) {
        if (document.getElementsByClassName("js-manga-edit-info-button")[0]) {
            let presenceData = {
                details: "Viewing a manga",
                state: document.getElementsByClassName("header-right")[0].parentNode.childNodes[1].textContent,
                largeImageKey: "lg-mal"
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData = {
                details: "Looking for manga",
                largeImageKey: "lg-mal"
            };
            presence.setActivity(presenceData);
        }
    }
    else {
        let presenceData = {
            largeImageKey: "lg-mal"
        };
        presence.setActivity(presenceData);
    }
}));
