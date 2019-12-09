var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "612071822321647648",
    mediaKeys: false
}), presenceData = {
    largeImageKey: "logo"
};
let lang = new Map();
lang.set('de', 'German');
lang.set('es', 'Spanish');
lang.set('fr', 'French');
lang.set('ja', 'Japanese');
lang.set('it', 'Italian');
lang.set('ko', 'Korean');
lang.set('zs', 'Chinese');
lang.set('ru', 'Russian');
lang.set('pt', 'Portuguese');
lang.set('tr', 'Turkish');
lang.set('dn', 'Dutch');
lang.set('sv', 'Swedish');
lang.set('el', 'Greek');
lang.set('hi', 'Hindi');
lang.set('hv', 'high valyrian');
lang.set('ga', 'Irish');
lang.set('pl', 'Polish');
lang.set('he', 'Hebrew');
lang.set('nb', 'Norwegian');
lang.set('vi', 'Vietnamese');
lang.set('ar', 'Arabic');
lang.set('hw', 'Hawaiian');
lang.set('da', 'Danish');
lang.set('kl', 'Klingon');
lang.set('ro', 'Romanian');
lang.set('cs', 'Czech');
lang.set('sw', 'Swahili');
lang.set('cy', 'Walsh');
lang.set('id', 'Indonesian');
lang.set('hu', 'Hungarian');
lang.set('uk', 'Ukrainian');
lang.set('eo', 'Esperanto');
lang.set('nv', 'Navajo');
lang.set('en', 'English');
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    var path1 = document.location.pathname;
    if(path1.split("/")[2] == null || path1.includes("/profile") || path1.includes("/dictionary")) {
	if(document.location.pathname.startsWith("/learn")) {
        var pageData = {
            details: "Choosing level to learn..",
            largeImageKey: "logo"
        }
        presence.setActivity(pageData);
    } else if(document.location.pathname.startsWith("/shop")) {
        var pageData = {
            details: "Browsing shop..",
            largeImageKey: "logo"
        }
        presence.setActivity(pageData);
    } else if(document.location.pathname.includes("/dictionary")) {
	var path = document.location.pathname;
        var pageData = {
            details: "Using dictionary..",
            state: "Language: " + document.location.pathname.split("/")[2],
            largeImageKey: "logo"
        }
        presence.setActivity(pageData);
    } else if(document.location.pathname.includes("/profile")) {
	var path = document.location.pathname;
        var pageData = {
            details: "Browsing profile..",
            state: "Browsing: " + document.location.pathname.split("/")[2],
            largeImageKey: "logo"
        }
        presence.setActivity(pageData);
    } else if(document.location.pathname == "/" || !document.location.pathname) {
	var pageData = {
		details: "Browsing..",
		largeImageKey: "logo"
	}
	presence.setActivity(pageData);
    } else {
    if (path1.length > 1 && path1.split("/")[2] !== null && path1.split("/")[2].length == 2) {
        var language;
        for (let value of lang.keys()) {
            if (path1.split("/")[2] == value) {
                language = lang.get(value);
                break;
            }
        }
        presenceData.details = "Taking a " + language + " lesson";
        presenceData.state = "Language: " + path1.split("/")[2].replace("-", " ");
        presenceData.largeImageKey = "logo";
        presence.setActivity(presenceData);
    	    }
        }
    }
}));
