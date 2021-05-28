const presence = new Presence({
    clientId: "685611188306051093"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  searchItems = {
    arch: "architecture",
    edition: "offering",
    os: "operating_system",
    page: "page",
    query: "q",
    tab: "tab",
    type: "type"
  },
  capitalize = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

let match: string[];

presence.on("UpdateData", async () => {
  let url: URL,
    params: URLSearchParams,
    selector: Node,
    arch: string,
    owner: string,
    name: string,
    page: string,
    tab: string;

  const presenceData: PresenceData = {
    details: "Unknown page", // Left here as a clue to find missing possible states
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname.match(/^\/(repositories)?$/))
    presenceData.details = "Bowsing own repositories";
  else if (document.location.pathname.match(/^\/settings/))
    presenceData.details = "On settings page";
  else if (document.location.pathname.match(/^\/search/)) {
    url = new URL(document.location.href);
    params = url.searchParams;

    const query: string = params.get(searchItems.query);
    let type: string = params.get(searchItems.type);
    type = (type && decodeURIComponent(type)) || "image";

    let edition: string = params.get(searchItems.edition);
    edition = (edition && decodeURIComponent(edition)) || "";

    let os: string = params.get(searchItems.os);
    os = (os && decodeURIComponent(os)) || null;

    arch = params.get(searchItems.arch);
    arch = (arch && decodeURIComponent(arch)) || null;

    presenceData.details = `Searching for${
      query ? `: ${query}` : ` ${edition} ${type}s`
    }`;

    if (query && edition)
      presenceData.state = `${capitalize(edition)} ${type}s`;
    if (os || arch) {
      presenceData.state = `${os ? `${capitalize(os)} ` : ""}${
        arch ? arch.toUpperCase() : ""
      }`;
    }
  } else if (document.location.pathname.match(/^\/orgs$/))
    presenceData.details = "Browsing organizations";
  else if (
    (match = document.location.pathname.match(/^\/orgs\/([^/]+)(?:\/([^/]+))?/))
  ) {
    [, name] = match;
    [, , tab] = match;
    tab = tab || "members";
    presenceData.details = `On org ${tab}page`;
    presenceData.state = `${name}`;
  } else if ((match = document.location.pathname.match(/^\/_\/([^?]+)/))) {
    url = new URL(document.location.href);
    params = url.searchParams;

    [, name] = match;

    tab = params.get(searchItems.tab);

    presenceData.details = `On image ${tab ? `${tab} ` : ""}page`;
    presenceData.state = `${name}`;
  } else if (
    (match = document.location.pathname.match(
      /^\/r\/([^/]+)\/([^/]+)(?:\/([^?]+))?/
    ))
  ) {
    url = new URL(document.location.href);
    params = url.searchParams;

    [, owner] = match;
    [, , name] = match;
    [, , , tab] = match;

    page = params.get(searchItems.page);

    presenceData.details = `On image ${tab ? tab : ""} page${
      page ? ` ${page}` : ""
    }`;
    presenceData.state = `${owner}/${name}`;
  } else if (
    (match = document.location.pathname.match(
      /^\/layers\/([^/]+)\/([^/]+)\/([^/]+)/
    ))
  ) {
    url = new URL(document.location.href);
    params = url.searchParams;

    const context: string = params.get("context");
    if (context && context === "repo") {
      presenceData.details = "On personal repository";
      presenceData.state = "Image history";
    } else {
      [, owner] = match;
      [, , name] = match;
      const [, , , tag] = match;

      selector = document.querySelector(".Select-value") || null;
      arch = (selector && selector.textContent) || null;

      presenceData.details = "On image history";
      presenceData.state = `${owner}/${name}:${tag} ${arch ? arch : ""}`;
    }
  } else if (
    (match = document.location.pathname.match(/^\/u\/([^/]+)(?:\/([^/]+))?/))
  ) {
    const [, user] = match;
    tab = match[2] || "repositories";
    presenceData.details = `On profile ${tab} page`;
    presenceData.state = user;
  } else if (document.location.pathname.match(/^\/repository\/create/))
    presenceData.details = "Creating repository";
  else if (
    (match = document.location.pathname.match(/^\/repository(?:\/([^/?]+))+/))
  ) {
    url = new URL(document.location.href);
    params = url.searchParams;

    presenceData.details = "On personal repository";

    [, tab] = match;

    page = params.get(searchItems.page);
    selector = document.querySelector(
      "#contextNav > div > div.styles__breadcrumbs___18Yr8 > div:nth-child(2) > a"
    );
    const breadcrum: string = (selector && selector.textContent) || null;

    if (breadcrum && breadcrum.match(tab)) tab = "general";
    else if (document.location.pathname.match(/\/builds\//)) tab = "builds";

    presenceData.state = `${capitalize(tab)}${page ? ` ${page}` : ""}`;
  } else if (
    (match = document.location.pathname.match(
      /^\/support\/(?:(doc)?(contact)?)/
    ))
  ) {
    const doc: boolean = match[1] && true,
      contact: boolean = match[2] && true;
    presenceData.details = "Reading FAQ";
    if (doc) {
      selector =
        document.querySelector(
          "#gatsby-focus-wrapper > div > main > div > div.MuiCardHeader-root > div > span"
        ) || null;
      presenceData.state = (selector && selector.textContent) || null;
    } else if (contact) presenceData.details = "Contact page";
  } else if (document.location.pathname.match(/^\/billing/))
    presenceData.details = "Checking billing info";

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
