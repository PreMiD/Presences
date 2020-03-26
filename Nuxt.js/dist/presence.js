var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: "691080074006495303",
    mediaKeys: false
});
var user;
var title;
var replace;
var search;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {};
    var theme = getCookie("nuxt-theme");
    if (!theme) {
        presenceData.largeImageKey = "logo";
    }
    else {
        presenceData.largeImageKey = `${theme}`;
    }
    presenceData.smallImageKey = "reading";
    var route = document.location.pathname.split('/');
    var subdomain = document.location.hostname.split('.');
    switch (subdomain[0]) {
        case "fr":
            presenceData.smallImageText = "Language : Français";
            break;
        case "zh":
            presenceData.smallImageText = "Language : 简体中文";
            break;
        case "ja":
            presenceData.smallImageText = "Language : 日本語";
            break;
        case "ko":
            presenceData.smallImageText = "Language : 한국어";
            break;
        case "ru":
            presenceData.smallImageText = "Language : Русский";
            break;
        case "id":
            presenceData.smallImageText = "Language : Indonesian";
            break;
        default:
            presenceData.smallImageText = "Language : English";
    }
    if (document.location.pathname === "/") {
        presenceData.details = "Home";
    }
    else if (document.location.pathname.includes("/guide")) {
        presenceData.details = "Guide";
        if (!route[2]) {
            presenceData.state = document.querySelector("article h1").textContent;
        }
        else {
            presenceData.state = document.querySelector("article h1").textContent;
        }
    }
    else if (document.location.pathname.includes("/api")) {
        presenceData.details = "API";
        if (!route[2]) {
            presenceData.state = document.querySelector("article h1").textContent;
        }
        else {
            presenceData.state = document.querySelector("article h1").textContent;
        }
    }
    else if (document.location.pathname.includes("/examples")) {
        presenceData.details = "Examples";
        if (!route[2]) {
            presenceData.state = document.querySelector("article h1").textContent;
        }
        else {
            presenceData.state = document.querySelector("article h1").textContent;
        }
    }
    else if (document.location.pathname.includes("/faq")) {
        presenceData.details = "FAQ";
        if (!route[2]) {
            presenceData.state = document.querySelector("article h1").textContent;
        }
        else {
            presenceData.state = document.querySelector("article h1").textContent;
        }
    }
    else {
        presenceData.details = document.querySelector("title").textContent;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        if (presenceData.state == null)
            presenceData.state = "Navigate...";
        presence.setActivity(presenceData);
    }
}));
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts.pop().split(";").shift();
}
function parseQueryString(queryString) {
    if (!queryString) {
        queryString = window.location.search.substring(1);
    }
    const params = {};
    const queries = queryString.split("&");
    queries.forEach((indexQuery) => {
        const indexPair = indexQuery.split("=");
        const queryKey = decodeURIComponent(indexPair[0]);
        const queryValue = decodeURIComponent(indexPair.length > 1 ? indexPair[1] : "");
        params[queryKey] = queryValue;
    });
    return params;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsQ0FBQztBQUVILElBQUksSUFBVSxDQUFDO0FBQ2YsSUFBSSxLQUFXLENBQUM7QUFDaEIsSUFBSSxPQUFhLENBQUM7QUFDbEIsSUFBSSxNQUFZLENBQUM7QUFFakIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUM7QUFFaEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ2pDLElBQUksWUFBWSxHQUFpQixFQUFFLENBQUM7SUFDcEMsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRXBDLElBQUcsQ0FBQyxLQUFLLEVBQUU7UUFDUCxZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztLQUN2QztTQUFNO1FBQ0gsWUFBWSxDQUFDLGFBQWEsR0FBRyxHQUFHLEtBQUssRUFBRSxDQUFDO0tBQzNDO0lBQ0QsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7SUFFdkMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV0RCxRQUFRLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNsQixLQUFLLElBQUk7WUFDTCxZQUFZLENBQUMsY0FBYyxHQUFHLHFCQUFxQixDQUFDO1lBQ3BELE1B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