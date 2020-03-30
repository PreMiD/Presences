var presence = new Presence({
  clientId: "685611188306051093",
});

var browsingStamp = Math.floor(Date.now() / 1000);
var searchItems = {
  arch: "architecture",
  edition: "offering",
  os: "operating_system",
  page: "page",
  query: "q",
  tab: "tab",
  type: "type",
};

var language: string;
var match: Array<string>;

presence.on("UpdateData", async () => {
  let presenceData: presenceData = {
    details: "MISSING", // Left here as a clue to find missing possible states
    largeImageKey: "logo",
  };

  language = window.navigator.language;

  if (document.location.host == "hub.docker.com") {
    presenceData.startTimestamp = browsingStamp;

    if (document.location.pathname.match(/^\/(repositories)?$/)) {
      presenceData.details = "Bowsing own repositories";
    } else if (document.location.pathname.match(/^\/settings/)) {
      presenceData.details = `On settings page`;
    } else if (document.location.pathname.match(/^\/search/)) {
      var url: URL = new URL(document.location.href);
      var params: URLSearchParams = url.searchParams;

      var query: string = params.get(searchItems.query);

      var type: string = params.get(searchItems.type);
      type = (type && decodeURIComponent(type)) || `image`;

      var edition: string = params.get(searchItems.edition);
      edition = (edition && decodeURIComponent(edition)) || ``;

      var os: string = params.get(searchItems.os);
      os = (os && decodeURIComponent(os)) || null;

      var arch: string = params.get(searchItems.arch);
      arch = (arch && decodeURIComponent(arch)) || null;

      presenceData.details = `Searching for${
        query ? `: ${query}` : ` ${edition} ${type}s`
      }`;

      if (query && edition)
        presenceData.state = `${capitalize(edition)} ${type}s`;
      if (os || arch)
        presenceData.state = `${os ? `${capitalize(os)} ` : ``}${
          arch ? arch.toUpperCase() : ""
        }`;
    } else if (document.location.pathname.match(/^\/orgs$/)) {
      presenceData.details = `Browsing organizations`;
    } else if (
      (match = document.location.pathname.match(
        /^\/orgs\/([^\/]+)(?:\/([^\/]+))?/
      ))
    ) {
      var name: string = match[1];
      var tab: string = match[2];
      tab = tab || `members`;
      presenceData.details = `On org ${tab ? `${tab} ` : ``}page`;
      presenceData.state = `${name}`;
    } else if ((match = document.location.pathname.match(/^\/_\/([^?]+)/))) {
      var url: URL = new URL(document.location.href);
      var params: URLSearchParams = url.searchParams;

      var name: string = match[1];

      var tab: string = params.get(searchItems.tab);

      presenceData.details = `On image ${tab ? `${tab} ` : ``}page`;
      presenceData.state = `${name}`;
    } else if (
      (match = document.location.pathname.match(
        /^\/r\/([^\/]+)\/([^\/]+)(?:\/([^?]+))?/
      ))
    ) {
      var url: URL = new URL(document.location.href);
      var params: URLSearchParams = url.searchParams;

      var owner: string = match[1];
      var name: string = match[2];
      var tab: string = match[3];

      var page: string = params.get(searchItems.page);

      presenceData.details = `On image ${tab ? tab : ``} page${
        page ? ` ${page}` : ``
      }`;
      presenceData.state = `${owner}/${name}`;
    } else if (
      (match = document.location.pathname.match(
        /^\/layers\/([^\/]+)\/([^\/]+)\/([^\/]+)/
      ))
    ) {
      var url: URL = new URL(document.location.href);
      var params: URLSearchParams = url.searchParams;

      var context: string = params.get("context");
      if (context && context == "repo") {
        presenceData.details = `On personal repository`;
        presenceData.state = `Image history`;
      } else {
        var owner: string = match[1],
          name: string = match[2],
          tag: string = match[3];

        var selector: Node = document.querySelector(".Select-value") || null;
        var arch: string = (selector && selector.textContent) || null;

        presenceData.details = `On image history`;
        presenceData.state = `${owner}/${name}:${tag} ${arch ? arch : ``}`;
      }
    } else if (
      (match = document.location.pathname.match(
        /^\/u\/([^\/]+)(?:\/([^\/]+))?/
      ))
    ) {
      var user: string = match[1];
      var tab: string = match[2] || `repositories`;
      presenceData.details = `On profile ${tab} page`;
      presenceData.state = user;
    } else if (document.location.pathname.match(/^\/repository\/create/)) {
      presenceData.details = `Creating repository`;
    } else if (
      (match = document.location.pathname.match(
        /^\/repository(?:\/([^\/?]+))+/
      ))
    ) {
      var url: URL = new URL(document.location.href);
      var params: URLSearchParams = url.searchParams;

      presenceData.details = `On personal repository`;

      var tab: string = match[1];

      var page: string = params.get(searchItems.page);
      var selector: Node = document.querySelector(
        "#contextNav > div > div.styles__breadcrumbs___18Yr8 > div:nth-child(2) > a"
      );
      var breadcrum: string = (selector && selector.textContent) || null;

      if (breadcrum && breadcrum.match(tab)) {
        tab = `general`;
      } else if (document.location.pathname.match(/\/builds\//)) {
        tab = `builds`;
      }
      presenceData.state = `${capitalize(tab)}${page ? ` ${page}` : ``}`;
    } else if (
      (match = document.location.pathname.match(
        /^\/support\/(?:(doc)?(contact)?)/
      ))
    ) {
      var doc: boolean = match[1] && true;
      var contact: boolean = match[2] && true;
      presenceData.details = `Reading FAQ`;
      if (doc) {
        var selector: Node =
          document.querySelector(
            "#gatsby-focus-wrapper > div > main > div > div.MuiCardHeader-root > div > span"
          ) || null;
        presenceData.state = (selector && selector.textContent) || null;
      } else if (contact) {
        presenceData.details = `Contact page`;
      }
    } else if (document.location.pathname.match(/^\/billing/)) {
      presenceData.details = `Checking billing info`;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});

/**
 * Send PreMiD error message in console of browser
 * @param message the message that you want to be sent in console
 */
function PMD_error(message: String) {
  var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
  console.log(
    "%cPreMiD%cERROR%c " + message,
    genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;",
    genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;",
    "color: unset;"
  );
}

/**
 * Lambda function to ucFirst
 * @param s string to capitalize
 */
const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
