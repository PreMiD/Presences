const presence = new Presence({
    clientId: "691080074006495303"
});
var user;
var title;
var replace;
var search;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {};
    var theme = getCookie("nuxt-theme");
    if (!theme) {
        presenceData.largeImageKey = "logo";
    }
    else {
        presenceData.largeImageKey = `${theme}`;
    }
    presenceData.smallImageKey = "reading";
    var route = document.location.pathname.split("/");
    var subdomain = document.location.hostname.split(".");
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
});
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2)
        return parts
            .pop()
            .split(";")
            .shift();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLENBQUM7QUFDZixJQUFJLE9BQVksQ0FBQztBQUNqQixJQUFJLE1BQVcsQ0FBQztBQUVoQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFlBQVksR0FBaUIsRUFBRSxDQUFDO0lBQ3BDLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVwQyxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7S0FDckM7U0FBTTtRQUNMLFlBQVksQ0FBQyxhQUFhLEdBQUcsR0FBRyxLQUFLLEVBQUUsQ0FBQztLQUN6QztJQUNELFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO0lBRXZDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsRCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFdEQsUUFBUSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDcEIsS0FBSyxJQUFJO1lBQ1AsWUFBWSxDQUFDLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQztZQUNwRCxNQUFNO1FBQ1IsS0FBSyxJQUFJO1lBQ1AsWUFB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