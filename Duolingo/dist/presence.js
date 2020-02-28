var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
    if (path1.split("/")[2] == null) {
        if (document.location.pathname.startsWith("/learn")) {
            var pageData = {
                details: "Choosing level to learn..",
                largeImageKey: "logo"
            };
            presence.setActivity(pageData);
        }
        else if (document.location.pathname.startsWith("/shop")) {
            var pageData = {
                details: "Browsing shop..",
                largeImageKey: "logo"
            };
            presence.setActivity(pageData);
        }
        else if (document.location.pathname.includes("/dictionary")) {
            var path = document.location.pathname;
            var pageData = {
                details: "Using dictionary..",
                state: "Language: " + document.location.pathname.split("/")[2],
                largeImageKey: "logo"
            };
            presence.setActivity(pageData);
        }
        else if (document.location.pathname.includes("/profile")) {
            var path = document.location.pathname;
            var pageData = {
                details: "Browsing profile..",
                state: "Browsing: " + document.location.pathname.split("/")[2],
                largeImageKey: "logo"
            };
            presence.setActivity(pageData);
        }
        else if (document.location.pathname.includes("/words")) {
            presenceData.details = "Checking words...";
            presenceData.largeImageKey = "logo";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/" || !document.location.pathname) {
            var pageData = {
                details: "Browsing..",
                largeImageKey: "logo"
            };
            presence.setActivity(pageData);
        }
    }
    else {
        if (path1.length > 1 && path1.split("/")[2] !== null && path1.split("/")[2].length == 2) {
            var language;
            for (let value of lang.keys()) {
                if (path1.split("/")[2] == value) {
                    language = lang.get(value);
                    break;
                }
            }
            presenceData.details = "Taking a lesson";
            presenceData.state = "Language: " + language;
            presenceData.largeImageKey = "logo";
            presence.setActivity(presenceData);
        }
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsRUFDRCxZQUFZLEdBQWlCO0lBQzVCLGFBQWEsRUFBRSxNQUFNO0NBQ3RCLENBQUM7QUFFRixJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxF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