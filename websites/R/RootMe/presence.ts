const presence = new Presence({
  clientId: "673322920809988120"
});

function parseQueryString(queryString?: string): any {
  if (!queryString) {
    queryString = window.location.search.substring(1);
  }
  const params = {};
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

//var browsingStamp = Math.floor(Date.now()/1000);

console.log(
  "%c RootMe Presence ",
  "background: #7289da; color: white; padding: 2px; border-radius: 50px",
  "Presence detected !"
);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  var route = document.location.pathname.split("/");

  if (document.location.pathname == "/") {
    presenceData.details = "Home";
    if (!parseQueryString(document.location.hash).page) {
      presenceData.state = "Watching home page";
    } else if (parseQueryString(document.location.hash).page === "news") {
      presenceData.state = parseQueryString(document.location.hash).inc
        ? `Watching ${parseQueryString(document.location.hash).page} page (${
            document.querySelector("dl.tabs > dd.active").textContent
          } )`
        : `Watching ${parseQueryString(document.location.hash).page} page`;
    } else if (parseQueryString(document.location.hash).page === "structure") {
      if (
        parseQueryString(document.location.hash).inc === "inclusions/services"
      ) {
        presenceData.state = document.querySelector(".row > h1").textContent;
      } else {
        presenceData.state =
          document.querySelector(".ajaxbloc > h1").textContent;
      }
    } else if (parseQueryString(document.location.hash).page === "contact") {
      presenceData.state = document.querySelector(".t-body > h1").textContent;
    } else if (parseQueryString(document.location.hash).page === "plan") {
      presenceData.state = document.querySelector(".t-body > h1").textContent;
    } else if (parseQueryString(document.location.hash).page === "faq") {
      presenceData.state = document.querySelector("h1.crayon").textContent;
    }
    presenceData.smallImageKey = "reading";
    switch (
      document.querySelector("img.grayscale").getAttribute("alt") ||
      document.querySelector("img.grayscale").getAttribute("title")
    ) {
      case "fr":
        presenceData.smallImageText = "Language : français";
        break;
      case "es":
        presenceData.smallImageText = "Language : espanol";
        break;
      case "de":
        presenceData.smallImageText = "Language : deutsch";
        break;
      case "en":
        presenceData.smallImageText = "Language : english";
        break;
      default:
        break;
    }
  } else if (document.location.pathname.includes("/Challenges/")) {
    presenceData.smallImageKey = "chall";
    presenceData.smallImageText = "Challenges";
    presenceData.details = route[3]
      ? `${route[2]} - ${route[3].replace(/-/g, " ")}`
      : `${route[2]}`;
    presenceData.state = !route[4]
      ? "Navigating..."
      : document.querySelector(".crayon").textContent;
  } else if (document.location.pathname.includes("/Capture-The-Flag/")) {
    presenceData.smallImageKey = "ctf";
    presenceData.smallImageText = "Capture The Flag";
    presenceData.details = route[3]
      ? `${route[2].replace(/-/g, " ")} - ${route[3].replace(/-/g, " ")}`
      : route[2].replace(/-/g, " ");
    presenceData.state = "Navigating...";
  } else if (
    document.location.pathname.includes("/Communaute/") ||
    document.location.pathname.includes("/Comunidad/") ||
    document.location.pathname.includes("/Community/")
  ) {
    presenceData.smallImageKey = "commu";
    presenceData.smallImageText = "Communaute";
    presenceData.details = route[3]
      ? `${route[2]} - ${route[3].replace(/-/g, " ")}`
      : route[2];
    presenceData.state = "Navigating...";
  } else if (
    document.location.pathname.includes("/Documentation/") ||
    document.location.pathname.includes("/Materialien/") ||
    document.location.pathname.includes("/Documentacion/") ||
    document.location.pathname.includes("/Docs/")
  ) {
    presenceData.smallImageKey = "docu";
    presenceData.smallImageText = "Documentation";
    if (route[3] !== "Reseaux") {
      presenceData.details = route[3]
        ? `${route[2]} - ${route[3].replace(/-/g, " ")}`
        : `${route[2]}`;
      presenceData.state = !route[4]
        ? "Navigating..."
        : route[4].replace(/-/g, " ");
    } else {
      presenceData.details = route[4]
        ? `${route[2]} - ${route[3]} > ${route[4]}`
        : `${route[2]} - ${route[3]}`;
      presenceData.state = !route[5]
        ? "Navigating..."
        : route[5].replace(/-/g, " ");
    }
  } else if (
    document.location.pathname.includes("/Informations/") ||
    document.location.pathname.includes("/Information/") ||
    document.location.pathname.includes("/Info/")
  ) {
    presenceData.smallImageKey = "infos";
    presenceData.smallImageText = "Informations";
    presenceData.details = `${route[2]}`;
    presenceData.state = !route[3]
      ? "Navigating..."
      : document.querySelector(".crayon").textContent;
  } else if (
    document.location.pathname.includes("/Tools/") ||
    document.location.pathname.includes("/Herramientas/") ||
    document.location.pathname.includes("/Outils/")
  ) {
    presenceData.smallImageKey = "tools";
    presenceData.smallImageText = "Tools";
    presenceData.details = route[3]
      ? `${route[2]} - ${route[3].replace(/-/g, " ")}`
      : `${route[2]}`;
    presenceData.state = !route[4] ? "Navigating..." : route[4];
  } else {
    presenceData.details =
      `Watching member : ` + document.querySelector("span.forum").textContent;
    presenceData.state = parseQueryString(document.location.hash).inc
      ? `Page : ${parseQueryString(document.location.hash).inc}`
      : "Page : profil";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    if (presenceData.state == null) {
      presenceData.state = "Navigating...";
    }
    presence.setActivity(presenceData);
  }
});
