const presence = new Presence({
    clientId: "854718080433520661"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: ~~(Date.now() / 1000)
  },
  pages: { [key: string]: string } = {
    "/": "Homepage",
    "/waze-app/": "Mobile App",
    "/waze/": "Features",
    "/carpool/": "Waze Carpool",
    "/events/": "Events",
    "/partners/": "Partners",
    "/wazeforcities/": "Waze for Cities",
    "/product-partners/": "Product Partners",
    "/ads/": "Waze Ads",
    "/carpool/companies/": "Carpool Partners",
    "/editor/": "Map Editor",
    "/about/": "About Us",
    "/careers/": "Waze Careers",
    "/contact/": "Contact Us",
    "/communities": "Waze Communities",
    "/legal/tos/": "Terms of Use",
    "/legal/privacy/": "Privacy Policy",
    "/legal/copyright/": "Copyright Policy"
  };

let path: string, start: string, end: string;

function fnd() {
  path = window.location.pathname;
  if (!path.endsWith("/")) path = `${path}/`;
  path = path.replace(/(\/[a-z]{2}|\/[a-z]{2}-[A-Z]{2})\//, "/");

  if (path.includes("/live-map")) {
    start =
      (
        document.querySelector(
          "div.wz-search-container.is-origin > div > div > div.wm-search__selected > span.wm-search__primary"
        ) as HTMLSpanElement
      )?.innerText ?? "somewhere";
    end =
      (
        document.querySelector(
          "div.wz-search-container.is-destination > div > div > div.wm-search__selected > span.wm-search__primary"
        ) as HTMLSpanElement
      )?.innerText ?? "somewhere";

    presenceData.details = "Planning a route";
    presenceData.state = `From ${start} to ${end}`;
  } else {
    presenceData.details = "Browsing";
    presenceData.state = pages[path] ?? null;
  }
}
fnd();
setInterval(fnd, 5000);

presence.on("UpdateData", async () => {
  if (!presenceData.details) presence.setActivity();
  else presence.setActivity(presenceData);
});
