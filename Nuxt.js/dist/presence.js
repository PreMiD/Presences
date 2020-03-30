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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLENBQUM7QUFDZixJQUFJLE9BQVksQ0FBQztBQUNqQixJQUFJLE1BQVcsQ0FBQztBQUVoQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLFlBQVksR0FBaUIsRUFBRSxDQUFDO0lBQ3BDLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVwQyxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1gsWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7S0FDcEM7U0FBTTtRQUNOLFlBQVksQ0FBQyxhQUFhLEdBQUcsR0FBRyxLQUFLLEVBQUUsQ0FBQztLQUN4QztJQUNELFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO0lBRXZDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsRCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFdEQsUUFBUSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDckIsS0FBSyxJQUFJO1lBQ1IsWUFBWSxDQUFDLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQztZQUNwRCxNQUFNO1FBQ1AsS0FBSyxJQUFJO1lBQ1IsWUFB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