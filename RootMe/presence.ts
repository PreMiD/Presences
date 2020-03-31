const presence = new Presence({
  clientId: "673322920809988120"
});

var user: any;
var title: any;
var replace: any;
var search: any;

var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  let presenceData: presenceData = {
    largeImageKey: "logo"
  };

  var route = document.location.pathname.split("/");

  if (document.location.pathname == "/") {
    presenceData.details = "Home";
    presenceData.state = parseQueryString(document.location.hash).inc
      ? `Watching ${parseQueryString(document.location.hash).page} page (${
          parseQueryString(document.location.hash).inc
        })`
      : `Watching ${parseQueryString(document.location.hash).page} page`;
  } else if (document.location.pathname.includes("/Challenges/")) {
    presenceData.smallImageKey = "chall";
    presenceData.smallImageText = "Challenges";
    presenceData.details = route[3]
      ? `${route[2]} - ${route[3].replace(/-/g, " ")}`
      : `${route[2]}`;
    presenceData.state = !route[4]
      ? "Navigate..."
      : document.querySelector(".crayon").textContent;
  } else if (document.location.pathname.includes("/Capture-The-Flag/")) {
    presenceData.smallImageKey = "ctf";
    presenceData.smallImageText = "Capture The Flag";
    presenceData.details = route[3]
      ? `${route[2].replace(/-/g, " ")} - ${route[3].replace(/-/g, " ")}`
      : route[2].replace(/-/g, " ");
    presenceData.state = "Navigate...";
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
    presenceData.state = "Navigate...";
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
        ? "Navigate..."
        : route[4].replace(/-/g, " ");
    } else {
      presenceData.details = route[4]
        ? `${route[2]} - ${route[3]} > ${route[4]}`
        : `${route[2]} - ${route[3]}`;
      presenceData.state = !route[5]
        ? "Navigate..."
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
      ? "Navigate..."
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
    presenceData.state = !route[4] ? "Navigate..." : route[4];
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
    presence.setActivity(presenceData);
  }
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
