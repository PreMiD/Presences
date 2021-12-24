const presence = new Presence({
  clientId: "691080074006495303"
});

var user: any;
var title: any;
var replace: any;
var search: any;

var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  let presenceData: PresenceData = {};
  var theme = getCookie("nuxt-theme");

  if (!theme) {
    presenceData.largeImageKey = "logo";
  } else {
    presenceData.largeImageKey = `${theme}`;
  }
  presenceData.smallImageKey = "reading";

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
  } else if (document.location.pathname.includes("/guide")) {
    presenceData.details = "Guide";
    presenceData.state = document.querySelector("article h1").textContent;
  } else if (document.location.pathname.includes("/api")) {
    presenceData.details = "API";
    presenceData.state = document.querySelector("article h1").textContent;
  } else if (document.location.pathname.includes("/examples")) {
    presenceData.details = "Examples";
    presenceData.state = document.querySelector("article h1").textContent;
  } else if (document.location.pathname.includes("/faq")) {
    presenceData.details = "FAQ";
    presenceData.state = document.querySelector("article h1").textContent;
  } else {
    presenceData.details = document.querySelector("title").textContent;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    if (presenceData.state == null) presenceData.state = "Navigate...";
    presence.setActivity(presenceData);
  }
});

function getCookie(name?: string): any {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function parseQueryString(queryString?: string): any {
  if (!queryString) {
    queryString = window.location.search.substring(1);
  }
  const params: {[key: string]: string} = {};
  const queries = queryString.split("&");
  queries.forEach((indexQuery: string) => {
    const indexPair = indexQuery.split("=");
    const queryKey = decodeURIComponent(indexPair[0]);
    const queryValue = decodeURIComponent(
      indexPair.length > 1 ? indexPair[1] : ""
    );
    params[queryKey] = queryValue;
  });
  return params;
}
